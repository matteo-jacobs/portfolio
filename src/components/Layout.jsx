import { Outlet } from 'react-router-dom'
import Navigation from './navigation.jsx'
import './Layout.css'

export default function Layout() {
  return (
    <div className="site">
      <Navigation />

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Matteo Jacobs</p>
      </footer>
    </div>
  )
}
