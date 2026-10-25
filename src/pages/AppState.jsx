import ProjectWall from '../components/ProjectWall.jsx'
import { appStateProjects } from '../data/projects.js'

// Every project with "appstate": true in its Information.json
export default function AppState() {
  return <ProjectWall pageName="AppState" projects={appStateProjects()} />
}
