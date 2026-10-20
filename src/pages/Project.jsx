import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import NotFound from './NotFound.jsx'
import './Project.css'

export default function Project() {
  const { projectSlug } = useParams()
  const project = getProject(projectSlug)

  if (!project) return <NotFound />

  const links = [
    ['Figma file', project.figmaFile],
    ['Figma prototype', project.figmaPrototype],
    ['Notion', project.notion],
  ].filter(([, href]) => href)

  return (
    <section className="page project">
      <p className="breadcrumb">
        <Link to="/portfolio">Portfolio</Link> / {project.title}
      </p>

      <h1 className="project-title">{project.title}</h1>

      {project.media?.type === 'video' && (
        <video
          className="project-media"
          src={project.media.src}
          poster={project.cover ?? undefined}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {project.media?.type === 'image' && (
        <img className="project-media" src={project.media.src} alt={project.title} />
      )}

      <dl className="project-facts">
        {project.industry && (
          <div>
            <dt>Industry</dt>
            <dd>{project.industry}</dd>
          </div>
        )}
        {project.scopeOfWork.length > 0 && (
          <div>
            <dt>Scope of work</dt>
            <dd>{project.scopeOfWork.join(', ')}</dd>
          </div>
        )}
        {project.toolsUsed.length > 0 && (
          <div>
            <dt>Tools used</dt>
            <dd>{project.toolsUsed.join(', ')}</dd>
          </div>
        )}
      </dl>

      {project.details && (
        <div className="project-details">
          {project.details.split(/\n\s*\n/).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <ul className="project-links">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {project.images.length > 0 && (
        <div className="project-gallery">
          {project.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} — image ${i + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </section>
  )
}
