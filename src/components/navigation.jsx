import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as LogoMark } from '../assets/logo-mark.svg'
import { ReactComponent as HamburgerPlate } from '../assets/hamburger-plate.svg'

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true, homeOnly: true },
  { label: 'About me', to: '/about' },
  { label: 'AppState', to: '/appstate' },
  { label: 'Portfolio', to: '/portfolio' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={`nav ${isOpen ? 'menu-open' : ''}`}>
      <Link to="/" className="nav-logo" aria-label="Home" onClick={() => setIsOpen(false)}>
        <LogoMark aria-hidden="true" />
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <HamburgerPlate className="nav-toggle-plate" aria-hidden="true" />
        <span className="nav-toggle-icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav id="nav-menu" className="nav-menu">
        {NAV_ITEMS.map(({ label, to, end, homeOnly }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              ['nav-link', homeOnly ? 'nav-link--home-only' : '', isActive ? 'is-active' : '']
                .filter(Boolean)
                .join(' ')
            }
            onClick={() => setIsOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}