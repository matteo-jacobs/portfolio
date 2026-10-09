// Single source of truth for every project.
//
// Each project gets its own page at /portfolio/<slug>, so adding a project
// only means adding an entry here — the routes in App.jsx stay the same.

export const projects = [
  {
    slug: 'podcast',
    title: 'Podcast',
    status: 'Not started',
    // TODO: import an image from src/assets and put it here.
    image: null,
    imageAlt: 'Podcast project',
    blurb: 'A short narrative audio piece.',
    description:
      'A short-form narrative podcast episode: scripting, recording, and editing a story that only works in audio.',
  },
  {
    slug: 'choice-based-game',
    title: 'Choice-Based Game',
    status: 'Not started',
    image: null,
    imageAlt: 'Choice-based game project',
    blurb: 'Interactive fiction with branching paths.',
    description:
      'A branching, choice-based interactive story where the reader’s decisions change how the narrative unfolds.',
  },
  {
    slug: 'board-game',
    title: 'Board Game',
    status: 'Not started',
    image: null,
    imageAlt: 'Board game project',
    blurb: 'A physical game that tells a story through play.',
    description:
      'A tabletop board game designed so that its rules and components carry the narrative — story told through mechanics.',
  },
]

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
