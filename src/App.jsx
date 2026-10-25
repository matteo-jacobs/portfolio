import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AppState from './pages/AppState.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Project from './pages/Project.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Every page renders inside Layout, so they all share the navigation. */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="appstate" element={<AppState />} />

        {/* Portfolio overview -> one page per project. The project segment is
            dynamic, so a new project only needs an entry in data/projects.js. */}
        <Route path="portfolio">
          <Route index element={<Portfolio />} />
          <Route path=":projectSlug" element={<Project />} />
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
