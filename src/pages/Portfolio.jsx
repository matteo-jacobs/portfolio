import ProjectWall from '../components/ProjectWall.jsx'
import { portfolioProjects } from '../data/projects.js'

// Every project without "appstate": true in its Information.json
export default function Portfolio() {
  return <ProjectWall pageName="Portfolio" projects={portfolioProjects()} />
}
