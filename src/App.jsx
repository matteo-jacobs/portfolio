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
      {/* Home is the full-bleed Figma hero and carries its own nav, so it
          sits outside the shared Layout chrome. */}
      <Route path="/" element={<Home />} />

      {/* Everything else shares the header / footer Layout.
          AppState hub -> a course -> the course's project subpages, with the
          course and project segments dynamic so new content only needs a data
          entry in src/data/courses.js, not a new route. */}
      <Route element={<Layout />}>
        <Route path="about" element={<About />} />

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
