import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'
import hamburgerMenu from '../assets/hamburger-menu.svg'
import './navigation.css'

const TABLET_BREAKPOINT = 744

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`)
        const syncOpen = (event) => setIsOpen(event.matches)

        syncOpen(mql)
        mql.addEventListener('change', syncOpen)
        return () => mql.removeEventListener('change', syncOpen)
    }, [])

    return (
        <nav className={isOpen ? 'open' : 'closed'}>
            <NavLink to="/" className="logo">
                <img src={logoMark} alt="Logo" />
            </NavLink>

            <button
                type="button"
                className="nav-toggle"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsOpen((open) => !open)}
            >
                <img src={hamburgerMenu} alt="" aria-hidden="true" />
            </button>

            <div className="nav-links">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/appstate">AppState</NavLink>
                <NavLink to="/portfolio" className="important">Portfolio</NavLink>
            </div>
        </nav>
    )
}
