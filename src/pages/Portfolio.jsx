import { Link } from 'react-router-dom'
import { courses } from '../data/courses.js'
import Navigation from '../components/navigation.jsx'
// import Footer from '../components/footer.jsx'

// For now the portfolio is a flat view of every project across every course.
// If this site later becomes a design portfolio, this is where projects would
// get grouped by medium instead of by course.
const allProjects = courses.flatMap((course) =>
  course.projects.map((project) => ({ ...project, course })),
)

export default function Portfolio() {
  return (
    <div ClassName="portfolioPage">
              <Navigation />
              <div className="hero">
                <p>Hidden details, made by someone who actually cares!</p>
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
              </div>
              {/* <Footer /> */}
        </div>
  )
}
