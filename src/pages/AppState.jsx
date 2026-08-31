import { Link } from 'react-router-dom'
import { courses } from '../data/courses.js'

export default function AppState() {
  return (
    <section className="page appstate">
      <h1>AppState</h1>
      <p className="lede">
        Coursework from my time at Appalachian State. Each course has its own page, and each project
        within a course has its own subpage.
      </p>

      <ul className="card-list">
        {courses.map((course) => (
          <li key={course.slug} className="card">
            <h2>
              <Link to={`/appstate/${course.slug}`}>{course.title}</Link>
            </h2>
            <p className="card-meta">
              {course.code} &middot; {course.term}
            </p>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
