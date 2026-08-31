// Single source of truth for the AppState section.
//
// Every course and every project is looked up by `slug`, so renaming a
// project ("Podcast" -> "The Overnight Shift") or adding a new course only
// means editing this file — the routes in App.jsx stay the same.

export const courses = [
  {
    slug: 'narrative-new-media-and-gaming',
    title: 'Narrative, New Media & Gaming',
    code: 'ENG 2150',
    term: 'Fall 2026',
    // TODO: replace with an original photo (public/ or src/assets/).
    image: null,
    imageAlt: 'Narrative, New Media & Gaming course',
    // Lightly adapted from the AppState course catalog, plus my own context.
    catalogDescription:
      'An introduction to storytelling across emerging media — interactive fiction, audio, and games — with attention to how form shapes narrative.',
    description:
      'This course looks at how a story changes when you tell it through a podcast, a branching game, or a board game instead of on the page. Each project below is one of those experiments.',
    projects: [
      {
        slug: 'podcast',
        title: 'Podcast',
        status: 'Not started',
        blurb: 'A short narrative audio piece.',
        description:
          'A short-form narrative podcast episode: scripting, recording, and editing a story that only works in audio.',
      },
      {
        slug: 'choice-based-game',
        title: 'Choice-Based Game',
        status: 'Not started',
        blurb: 'Interactive fiction with branching paths.',
        description:
          'A branching, choice-based interactive story where the reader’s decisions change how the narrative unfolds.',
      },
      {
        slug: 'board-game',
        title: 'Board Game',
        status: 'Not started',
        blurb: 'A physical game that tells a story through play.',
        description:
          'A tabletop board game designed so that its rules and components carry the narrative — story told through mechanics.',
      },
    ],
  },
]

export function getCourse(courseSlug) {
  return courses.find((course) => course.slug === courseSlug)
}

export function getProject(courseSlug, projectSlug) {
  return getCourse(courseSlug)?.projects.find((project) => project.slug === projectSlug)
}
