import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import skier from '../assets/skier.jpg'
import navPlate from '../assets/nav-plate.svg'
import navActive from '../assets/nav-active.svg'
import titleBanner from '../assets/title-banner.svg'
import namePlate from '../assets/name-plate.svg'
import ctaPlate from '../assets/cta-plate.svg'
import arrowDown from '../assets/arrow-down.svg'

const STAGE_W = 1280
const STAGE_H = 782

// Figma frame positions (px). `to` wires each label to a real route so the
// hero nav actually navigates instead of pointing at "#".
const NAV_ITEMS = [
  { label: 'Home', to: '/', left: 809, active: true },
  { label: 'About me', to: '/about', left: 887 },
  { label: 'APPState', to: '/appstate', left: 1000 },
  { label: 'Portfolio', to: '/portfolio', left: 1107 },
]

export default function Home() {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const fit = () => {
      const scale = Math.min(window.innerWidth / STAGE_W, 1)
      stageRef.current.style.setProperty('--scale', scale)
      wrapRef.current.style.height = `${STAGE_H * scale}px`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="hero" ref={wrapRef}>
      <div className="hero-stage" ref={stageRef}>
        <img className="hero-skier" src={skier} alt="Matteo skiing" />

        <img className="hero-nameplate" src={namePlate} alt="" aria-hidden="true" />
        <p className="hero-name">Matteo J.</p>

        <img className="hero-navplate" src={navPlate} alt="" aria-hidden="true" />
        <img className="hero-navactive" src={navActive} alt="" aria-hidden="true" />
        <nav className="hero-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={item.active ? 'is-active' : undefined}
              aria-current={item.active ? 'page' : undefined}
              style={{ left: `${item.left}px` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <img className="hero-banner" src={titleBanner} alt="" aria-hidden="true" />
        <h1 className="hero-title hero-title--name">Matteo&rsquo;s</h1>
        <p className="hero-title hero-title--portfolio">Portfolio</p>

        <p className="hero-role hero-role--dev">Developer</p>
        <p className="hero-role hero-role--designer">designer</p>
        <p className="hero-role hero-role--solver">problem-solver</p>

        <img className="hero-ctaplate" src={ctaPlate} alt="" aria-hidden="true" />
        <Link className="hero-cta" to="/portfolio">
          Check it out now
        </Link>
        <img className="hero-cta-arrow" src={arrowDown} alt="" aria-hidden="true" />
      </div>
    </div>
  )
}
