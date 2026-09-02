import { Link } from 'react-router-dom'
import { courses } from '../data/courses.js'

// For now the portfolio is a flat view of every project across every course.
// If this site later becomes a design portfolio, this is where projects would
// get grouped by medium instead of by course.
const allProjects = courses.flatMap((course) =>
  course.projects.map((project) => ({ ...project, course })),
)

export default function Portfolio() {
  return (
    <section className="page portfolio">
      <h1>Portfolio</h1>
      <p className="lede">Selected projects. More detail lives on each project&apos;s page.</p>

      <ul className="card-list">
        {allProjects.map((project) => (
          <li key={`${project.course.slug}/${project.slug}`} className="card">
            <h2>
              <Link to={`/appstate/${project.course.slug}/${project.slug}`}>{project.title}</Link>
            </h2>
            <p className="card-meta">{project.course.title}</p>
            <p>{project.blurb}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
