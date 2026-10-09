import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'

export default function AppState() {
  return (
    <div className="appStatePage">
      <div className="hero">
        <p>Hidden details, made by someone who actually cares!</p>
        <ul className="card-list">
          {projects.map((project) => (
            <li key={project.slug} className="card">
              <h2>
                <Link to={`/portfolio/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
