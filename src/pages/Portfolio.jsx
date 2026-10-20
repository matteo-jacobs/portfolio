import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'

export default function Portfolio() {
  return (
    <div className="portfolioPage">
      <div className="hero">
        <p>Hidden details, made by someone who actually cares!</p>
        <ul className="card-list">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="card"
              style={{ borderColor: project.mainColor }}
            >
              <Link to={`/portfolio/${project.slug}`}>
                {project.cover && (
                  <img className="card-cover" src={project.cover} alt="" />
                )}
                <h2>{project.title}</h2>
              </Link>
              {project.industry && <p className="card-meta">{project.industry}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
