// Single source of truth for every project.
//
// Every project is a folder in src/data/Projects/:
//
//   Projects/
//     My Project/
//       Information.json   <- the text, links and colors (see Project 1)
//                             optional "titleLines" splits the title on the
//                             home page: ["Let's run", "Oostende", "Beachrun"]
//                             "appstate": true puts it on the AppState page
//                             instead of the Portfolio page
//                             optional "website" / "game" add a link button;
//                             "game" can be a page in public/, like
//                             "/games/who-killed-hedwig.html"
//                             optional "course" and "team" go with the facts
//                             optional "sections" go under the facts, each
//                             with a "title" and any of "image" + "alt" +
//                             "caption", "audio" (an mp3), "text" (**like
//                             this** is bold) and "items" (a list)
//       cover.jpg          <- file named by "cover" in the JSON
//       background.jpg     <- optional: the pattern behind the project page's
//                             hero and footer (in the project's colors)
//       media.mp4          <- file named by "media" in the JSON: a video replaces
//                             the cover in the hero, a photo goes above images/
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
  './Projects/*/**/*.{jpg,jpeg,png,webp,avif,gif,svg,mp4,webm,mov,mp3}',
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

// "/" or "" in the JSON means "none" (e.g. "notion": "/")
const isEmpty = (value) => !value || value.trim() === '/'

function asset(folder, fileName) {
  if (isEmpty(fileName)) return null
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

  // background.jpg / Background.png / ...: any case, any image type
  const backgroundPath = Object.keys(assetFiles).find((path) =>
    /^background\.(jpe?g|png|webp|avif)$/i.test(path.slice(folder.length + 1)),
  )

  return {
    slug: info.slug || slugify(folderName),
    folderName,
    order: info.order ?? Infinity,
    title: info.title || folderName,
    // Shown under the hero on the project page, e.g. "Mixbox Branding + app design"
    subtitle: info.subtitle || '',
    // How the title is split over lines on the home page cards, e.g.
    // ["Let's run", "Oostende", "Beachrun"]. Default: one word per line.
    titleLines: info.titleLines ?? (info.title || folderName).split(/\s+/),
    industry: info.industry ?? '',
    course: info.course ?? '',
    team: info.team ?? [],
    scopeOfWork: info.scopeOfWork ?? [],
    toolsUsed: info.toolsUsed ?? [],
    details: info.details ?? '',
    sections: (info.sections ?? []).map((section) => ({
      ...section,
      image: asset(folder, section.image),
      audio: asset(folder, section.audio),
    })),
    media: media(folder, info.media),
    cover: asset(folder, info.cover ?? 'cover.jpg'),
    background: backgroundPath ? assetFiles[backgroundPath] : null,
    images,
    figmaFile: isEmpty(info.figmaFile) ? null : info.figmaFile,
    figmaPrototype: isEmpty(info.figmaPrototype) ? null : info.figmaPrototype,
    website: isEmpty(info.website) ? null : info.website,
    game: isEmpty(info.game) ? null : info.game,
    notion: isEmpty(info.notion) ? null : info.notion,
    // AppState projects go on the AppState page, the rest on Portfolio
    appState: info.appstate === true,
    mainColor: info.mainColor || 'var(--red)',
    secondaryColor: info.secondaryColor || 'var(--black)',
  }
}

export const projects = Object.entries(infoFiles)
  .map(toProject)
  .sort((a, b) => a.order - b.order || byName(a.title, b.title))

// The newest projects = the last folders by name ("Project 3" comes after
// "Project 2"; "Project 10" after "Project 9"). Newest first.
const newestFirst = (list) => [...list].sort((a, b) => byName(b.folderName, a.folderName))

export function latestProjects(count = 3) {
  return newestFirst(projects).slice(0, count)
}

// The AppState page: projects with "appstate": true, newest first
export function appStateProjects() {
  return newestFirst(projects.filter((project) => project.appState))
}

// The Portfolio page: every other project, newest first
export function portfolioProjects() {
  return newestFirst(projects.filter((project) => !project.appState))
}

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
