import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Me' },
  { to: '/appstate', label: 'AppState' },
  { to: '/portfolio', label: 'Portfolio' },
]

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <NavLink to="/" className="brand" end>
          Matteo Jacobs
        </NavLink>
        <nav className="site-nav">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Matteo Jacobs</p>
      </footer>
    </div>
  )
}
