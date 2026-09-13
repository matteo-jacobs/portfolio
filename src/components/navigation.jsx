import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoMark from '../assets/logo-mark.svg'
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
                <svg
                    width="37"
                    height="27"
                    viewBox="0 0 37 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <rect className="nav-toggle-line nav-toggle-line--top" x="0" y="0" width="37" height="5" fill="#FF0000" />
                    <rect className="nav-toggle-line nav-toggle-line--middle" x="0" y="11" width="37" height="5" fill="#FF0000" />
                    <rect className="nav-toggle-line nav-toggle-line--bottom" x="0" y="22" width="37" height="5" fill="#FF0000" />
                </svg>
            </button>

            <div className="nav-links">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/appstate">AppState</NavLink>
                <NavLink to="/portfolio" className="important">Portfolio</NavLink>
            </div>
        </nav>
    )
}
