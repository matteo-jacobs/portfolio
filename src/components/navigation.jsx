import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import TitleFrame from '../components/TitleFrame.jsx'
import logoMark from '../assets/navigation/logo-mark.svg'
import logoMarkRed from '../assets/navigation/logo-mark-red.svg'
import './navigation.css'

// Keep in sync with the tablet media query in navigation.css
const TABLET_BREAKPOINT = 744

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef(null)
    const toggleRef = useRef(null)

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`)
        const syncOpen = (event) => setIsOpen(event.matches)

        syncOpen(mql)
        mql.addEventListener('change', syncOpen)
        return () => mql.removeEventListener('change', syncOpen)
    }, [])

    // Phone menu is open: stop the page behind it from scrolling, let Escape
    // close it, and keep keyboard / screen reader users inside it: the page
    // behind becomes inert and focus moves to the first link. Escape puts
    // focus back on the menu button. (On tablet+ isOpen is always true, so
    // skip those.)
    useEffect(() => {
        const isPhone = !window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`).matches
        if (!isOpen || !isPhone) return

        const onKeyDown = (event) => {
            if (event.key !== 'Escape') return
            setIsOpen(false)
            toggleRef.current?.focus()
        }

        // Everything in the site except the navigation (main + footer)
        const nav = navRef.current
        const pageBehind = [...nav.parentElement.children].filter((el) => el !== nav)

        document.body.style.overflow = 'hidden'
        pageBehind.forEach((el) => { el.inert = true })
        nav.querySelector('.nav-open a')?.focus()
        window.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = ''
            pageBehind.forEach((el) => { el.inert = false })
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
        <nav ref={navRef} className={isOpen ? 'open' : 'closed'}>
            <div className="nav-closed">
                <NavLink to="/" className="logo" onClick={closeMenu}>
                    <img src={logoMark} alt="Home" className="logo-plate" />
                </NavLink>

                <TitleFrame
                    as="button"
                    type="button"
                    color="var(--white)"
                    ref={toggleRef}
                    className="nav-toggle title-frame--press"
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
            <TitleFrame as={Link} to="/" className="logo-computer title-frame--press" color="var(--white)">
                <img src={logoMarkRed} alt="Home" className="logo-mark-red" />
            </TitleFrame>
            <TitleFrame as="ul" color="var(--white)" className="nav-open">
                
                
                <li className="home-computer"><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/about" onClick={closeMenu}>About me</NavLink></li>
                <li><NavLink to="/appstate" onClick={closeMenu}>AppState</NavLink></li>
                <li>
                    <TitleFrame as={NavLink} to="/portfolio" className="important title-frame--press" onClick={closeMenu}>
                        Portfolio
                    </TitleFrame>
                </li>
            </TitleFrame>
            </div>
        
    </nav>)
}
