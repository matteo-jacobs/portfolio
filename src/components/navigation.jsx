import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import TitleFrame from '../components/TitleFrame.jsx'
import logoMark from '../assets/navigation/logo-mark.svg'
import logoMarkRed from '../assets/navigation/logo-mark-red.svg'
import './navigation.css'

// Keep in sync with the tablet media query in navigation.css
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

    // Phone menu is open: stop the page behind it from scrolling, and let
    // Escape close it. (On tablet+ isOpen is always true, so skip those.)
    useEffect(() => {
        const isPhone = !window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`).matches
        if (!isOpen || !isPhone) return

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsOpen(false)
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen])

    const closeMenu = () => {
        const isDesktopLayout = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`).matches
        if (!isDesktopLayout) {
            setIsOpen(false)
        }
    }

    return (
        <nav className={isOpen ? 'open' : 'closed'}>
            <div className="nav-closed">
                <NavLink to="/" className="logo" onClick={closeMenu}>
                    <img src={logoMark} alt="Home" className="logo-plate" />
                </NavLink>

                <TitleFrame
                    as="button"
                    type="button"
                    color="var(--white)"
                    className="nav-toggle"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsOpen((open) => !open)}
                >
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
                </TitleFrame>
            </div>


            <div className="nav-open-container">
            <TitleFrame as="a" href="/" className="logo-computer" color="var(--white)">
                <img src={logoMarkRed} alt="Home" className="logo-mark-red" />
            </TitleFrame>
            <TitleFrame as="ul" color="var(--white)" className="nav-open">
                
                
                <li className="home-computer"><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                <li><NavLink to="/appstate" onClick={closeMenu}>AppState</NavLink></li>
                <li>
                    <TitleFrame as={NavLink} to="/portfolio" className="important" onClick={closeMenu}>
                        Portfolio
                    </TitleFrame>
                </li>
            </TitleFrame>
            </div>
        
    </nav>)
}
