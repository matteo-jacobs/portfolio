import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function Project() {
  const { projectSlug } = useParams()
  const project = getProject(projectSlug)

  if (!project) return <NotFound />

  return (
    <section className="page project">
      <p className="breadcrumb">
        <Link to="/portfolio">Portfolio</Link> / {project.title}
      </p>

      <h1>{project.title}</h1>
      <p className="card-meta">{project.status}</p>
      <p>{project.description}</p>

      {/* Project write-ups, images, and links get added here as the work happens. */}
    </section>
  )
}
