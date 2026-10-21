import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import TitleFrame from './TitleFrame.jsx'
import './ProjectWall.css'

// A page of projects (used by Portfolio and AppState): a big statement in
// the background, pinned in the middle of the screen, with the projects in
// a grid on top of it as tilted photos with their title.
//
// Usage:
//   <ProjectWall pageName="Portfolio" projects={portfolioProjects()} />

const STATEMENT = ['Hidden details,', 'made by someone', 'who actually', 'cares.']

export default function ProjectWall({ pageName, projects }) {
  // No projects yet: only a message, no statement
  if (projects.length === 0) {
    return (
      <section className="project-wall project-wall--empty">
        <h1 className="visually-hidden">{pageName}</h1>
        <p className="project-wall__empty">
          Projects are coming soon.
          <span className="project-wall__empty-sub">Check back in the future.</span>
        </p>
      </section>
    )
  }

  return (
    <section className="project-wall">
      <h1 className="project-wall__statement">
        <span className="project-wall__statement-text">
          <span className="visually-hidden">{pageName}: </span>
          {/* One line each on desktop, like the design */}
          {STATEMENT.map((line) => (
            <Fragment key={line}>
              <span className="project-wall__statement-line">{line}</span>{' '}
            </Fragment>
          ))}
        </span>
      </h1>

      <ul className="project-wall__grid">
        {projects.map((project) => (
          <li key={project.slug} className="project-wall__card">
            <Link to={`/portfolio/${project.slug}`} className="project-wall__link">
              <div className="project-wall__photo">
                {project.cover && <img src={project.cover} alt="" loading="lazy" />}
              </div>

              {/* The title in framed lines, over the photo's bottom-right */}
              <h2 className="project-wall__title title-stack">
                {project.titleLines.map((line, i) => (
                  <TitleFrame key={i} as="span" color="var(--white)" className="project-wall__line">
                    {line}
                  </TitleFrame>
                ))}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
