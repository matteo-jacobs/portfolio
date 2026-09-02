import { Link, useParams } from 'react-router-dom'
import { getCourse } from '../data/courses.js'
import NotFound from './NotFound.jsx'

export default function Course() {
  const { courseSlug } = useParams()
  const course = getCourse(courseSlug)

  if (!course) return <NotFound />

  return (
    <section className="page course">
      <p className="breadcrumb">
        <Link to="/appstate">AppState</Link> / {course.title}
      </p>

      <h1>{course.title}</h1>
      <p className="card-meta">
        {course.code} &middot; {course.term}
      </p>

      {course.image ? (
        <img className="course-image" src={course.image} alt={course.imageAlt} />
      ) : (
        <div className="image-placeholder" role="img" aria-label={course.imageAlt}>
          add an original course image
        </div>
      )}

      <p>{course.description}</p>
      <p className="catalog-description">
        <strong>From the course catalog:</strong> {course.catalogDescription}
      </p>

      <h2>Projects</h2>
      <ul className="card-list">
        {course.projects.map((project) => (
          <li key={project.slug} className="card">
            <h3>
              <Link to={`/appstate/${course.slug}/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="card-meta">{project.status}</p>
            <p>{project.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
