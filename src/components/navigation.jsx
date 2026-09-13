import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import hamburgerPlate from '../assets/hamburger-plate.svg'
import './navigation.css'

const LOGO_PATH =
    'M9.998 29.3275V31.9936H0V21.551L9.998 29.3275ZM31.9936 31.9936H21.9956V29.3275L31.9936 21.551V31.9936ZM9.998 21.9956V25.9948L0 18.2184V14.2192L9.998 21.9956ZM31.9936 18.2184L21.9956 25.9948V21.9956L31.9936 14.2192V18.2184ZM31.9936 10.8865L21.9956 18.6629L15.9968 23.3287L9.998 18.6629L0 10.8865V6.88729L15.9968 19.3295L31.9936 6.88729V10.8865ZM31.9936 3.55462L15.9968 15.9968L0 3.55462V0L15.9968 11.9976L31.9936 0V3.55462Z'

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
                <span className="logo-image logo-mark" role="img" aria-label="Home">
                    <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d={LOGO_PATH} fill="#F0F0F0" />
                    </svg>
                    <svg className="logo-mark-fill" viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d={LOGO_PATH} fill="#FF0000" />
                    </svg>
                </span>
                <span className="logo-text">Home</span>
            </NavLink>

            <button
                type="button"
                className="nav-toggle"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setIsOpen((open) => !open)}
            >
                <img src={hamburgerPlate} alt="" aria-hidden="true" className="nav-toggle-plate" />
                <svg
                    className="nav-toggle-icon"
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
