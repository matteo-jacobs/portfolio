import { Link, useParams } from 'react-router-dom'
import { getCourse, getProject } from '../data/courses.js'
import NotFound from './NotFound.jsx'

export default function Project() {
  const { courseSlug, projectSlug } = useParams()
  const course = getCourse(courseSlug)
  const project = getProject(courseSlug, projectSlug)

  if (!course || !project) return <NotFound />

  return (
    <section className="page project">
      <p className="breadcrumb">
        <Link to="/appstate">AppState</Link> /{' '}
        <Link to={`/appstate/${course.slug}`}>{course.title}</Link> / {project.title}
      </p>

      <h1>{project.title}</h1>
      <p className="card-meta">{project.status}</p>
      <p>{project.description}</p>

      {/* Project write-ups, images, and links get added here as the work happens. */}
    </section>
  )
}
