// Single source of truth for every project.
//
// Every project is a folder in src/data/Projects/:
//
//   Projects/
//     My Project/
//       Information.json   <- the text, links and colors (see Project 1)
//                             optional "titleLines" splits the title on the
//                             home page: ["Let's run", "Oostende", "Beachrun"]
//       cover.jpg          <- file named by "cover" in the JSON
//       media.mp4          <- file named by "media" in the JSON (video or photo)
//       images/            <- every image in here is shown, sorted by name
//         01.jpg
//         02.jpg
//
// Adding a project = adding a folder. Folders without an Information.json are
// skipped. The page lives at /portfolio/<slug>; the slug is the "slug" field,
// or the folder name in lowercase with dashes ("My Project" -> "my-project").

const infoFiles = import.meta.glob('./Projects/*/Information.json', {
  eager: true,
  import: 'default',
})

// Every other file in a project folder, as a URL Vite can serve/bundle
const assetFiles = import.meta.glob(
  './Projects/*/**/*.{jpg,jpeg,png,webp,avif,gif,svg,mp4,webm,mov}',
  { eager: true, query: '?url', import: 'default' },
)

const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov']

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true })

function asset(folder, fileName) {
  if (!fileName) return null
  const url = assetFiles[`${folder}/${fileName}`]
  if (!url) console.warn(`[projects] "${fileName}" not found in ${folder}`)
  return url ?? null
}

function media(folder, fileName) {
  const src = asset(folder, fileName)
  if (!src) return null
  const extension = fileName.split('.').pop().toLowerCase()
  return { type: VIDEO_EXTENSIONS.includes(extension) ? 'video' : 'image', src }
}

function toProject([infoPath, info]) {
  const folder = infoPath.replace('/Information.json', '')
  const folderName = folder.split('/').pop()

  const images = Object.keys(assetFiles)
    // "images" or "Images" — the folder name's case doesn't matter
    .filter((path) => path.toLowerCase().startsWith(`${folder}/images/`.toLowerCase()))
    .sort(byName)
    .map((path) => assetFiles[path])

  return {
    slug: info.slug || slugify(folderName),
    folderName,
    order: info.order ?? Infinity,
    title: info.title || folderName,
    // How the title is split over lines on the home page cards, e.g.
    // ["Let's run", "Oostende", "Beachrun"]. Default: one word per line.
    titleLines: info.titleLines ?? (info.title || folderName).split(/\s+/),
    industry: info.industry ?? '',
    scopeOfWork: info.scopeOfWork ?? [],
    toolsUsed: info.toolsUsed ?? [],
    details: info.details ?? '',
    media: media(folder, info.media),
    cover: asset(folder, info.cover ?? 'cover.jpg'),
    images,
    figmaFile: info.figmaFile || null,
    figmaPrototype: info.figmaPrototype || null,
    notion: info.notion || null,
    mainColor: info.mainColor || 'var(--red)',
    secondaryColor: info.secondaryColor || 'var(--black)',
  }
}

export const projects = Object.entries(infoFiles)
  .map(toProject)
  .sort((a, b) => a.order - b.order || byName(a.title, b.title))

// The newest projects = the last folders by name ("Project 3" comes after
// "Project 2"; "Project 10" after "Project 9"). Returned newest first.
export function latestProjects(count = 3) {
  return [...projects]
    .sort((a, b) => byName(b.folderName, a.folderName))
    .slice(0, count)
}

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
