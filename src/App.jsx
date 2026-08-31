import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AppState from './pages/AppState.jsx'
import Course from './pages/Course.jsx'
import Project from './pages/Project.jsx'
import Portfolio from './pages/Portfolio.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* AppState hub -> a course -> the course's project subpages.
            Both the course and the project segments are dynamic, so new
            courses and projects only need a data entry, not a new route. */}
        <Route path="appstate">
          <Route index element={<AppState />} />
          <Route path=":courseSlug">
            <Route index element={<Course />} />
            <Route path=":projectSlug" element={<Project />} />
          </Route>
        </Route>

        <Route path="portfolio" element={<Portfolio />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
