import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { latestProjects } from '../data/projects.js'
import heroSkierMobile from '../assets/hero-skier__mobile.png'
import TitleFrame from '../components/TitleFrame.jsx'
import ProjectCarousel from '../components/ProjectCarousel.jsx'
import BorderFrame from '../components/BorderFrame.jsx'
import './Home.css'

const roles = ['Developer', 'Designer', 'Problem solver', 'Goofball']

// How many times the words are repeated in the scrolling bar. One copy is
// ~550–750px wide; 8 keeps the bar full on screens up to ~4000px wide.
const BAR_COPIES = 8

// Only show the scrolling bar when the whole bar fits on the first screen
// (above the fold). On tablets and desktops it always shows. Returns a ref
// for the image, a ref for the bar, and whether the bar should show.
const TABLET_AND_UP = '(min-width: 744px)'

function useBarFitsOnScreen() {
  const imageRef = useRef(null)
  const barRef = useRef(null)
  const barHeight = useRef(0)
  const [fits, setFits] = useState(true)

  useLayoutEffect(() => {
    const check = () => {
      const image = imageRef.current
      const bar = barRef.current
      if (!image || !bar) return

      if (window.matchMedia(TABLET_AND_UP).matches) {
        setFits(true)
        return
      }

      // The bar's height never changes, so remember it while it's visible
      // (a hidden bar measures 0)
      if (bar.offsetHeight) barHeight.current = bar.offsetHeight

      // Where the bar's lowest VISIBLE point would be, from the top of the page.
      // Untilted, its middle sits at: image bottom + top margin + half height.
      // Tilted, the side that dips down is lower by half the screen width
      // × sin(angle), plus the slanted half-height.
      const style = getComputedStyle(bar)
      const angle = Math.abs(parseFloat(style.getPropertyValue('--bar-angle'))) * Math.PI / 180
      const imageBottom = image.getBoundingClientRect().bottom + window.scrollY
      const barMiddle = imageBottom + parseFloat(style.marginTop) + barHeight.current / 2
      const screenWidth = document.documentElement.clientWidth
      const barBottom =
        barMiddle + (screenWidth / 2) * Math.sin(angle) + (barHeight.current / 2) * Math.cos(angle)

      // clientHeight instead of innerHeight: on phones innerHeight grows when
      // the address bar slides away while scrolling, which would make the bar
      // pop in mid-scroll. clientHeight stays the same.
      setFits(barBottom <= document.documentElement.clientHeight)
    }

    check()
    // Titles change height once the font loads, which moves everything down
    document.fonts.ready.then(check)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return { imageRef, barRef, fits }
}

// Pause the scrolling bar's loop while it's off screen: nobody sees it
// there, so it shouldn't keep using the CPU.
function usePauseWhenOffScreen(ref) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute('data-paused', !entry.isIntersecting)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
}

// "Check it out now": glide down to the projects instead of jumping.
// Pushes off quickly and settles gently (ease-out quart), like carving
// down the slope rather than being dragged. Scrolling or touching during the
// glide hands control straight back to the visitor.
const SCROLL_DURATION = 900

function easeOutQuart(t) {
  return 1 - (1 - t) ** 4
}

function glideTo(target) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const start = window.scrollY
  const distance = target.getBoundingClientRect().top

  // Move keyboard / screen reader focus to the projects as well
  const focusTarget = () => target.focus({ preventScroll: true })

  if (reduceMotion || Math.abs(distance) < 2) {
    window.scrollTo(0, start + distance)
    focusTarget()
    return
  }

  let frame
  const stop = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('keydown', stop)
  }
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('keydown', stop)

  const startTime = performance.now()
  const step = (now) => {
    const t = Math.min((now - startTime) / SCROLL_DURATION, 1)
    window.scrollTo(0, start + distance * easeOutQuart(t))
    if (t < 1) {
      frame = requestAnimationFrame(step)
    } else {
      stop()
      focusTarget()
    }
  }
  frame = requestAnimationFrame(step)
}

function handleScrollDown(event) {
  const target = document.getElementById('scroll-down')
  if (!target) return
  event.preventDefault()
  glideTo(target)
}

export default function Home() {
  const { imageRef, barRef, fits: barFits } = useBarFitsOnScreen()
  usePauseWhenOffScreen(barRef)
  // The visitor can stop the moving words (WCAG 2.2.2): tap or click the
  // bar, or use the button that appears when you Tab to it
  const [barHeld, setBarHeld] = useState(false)
  const toggleBar = () => setBarHeld((held) => !held)
  const latest = latestProjects(3)

  return (
    <div className="homePage">
      
      <div className="hero">
        {/* One heading in two framed lines. aria-label: screen readers would
            otherwise read the two lines run together ("Matteo'sPortfolio"). */}
        <h1 className="hero-title title-stack" aria-label="Matteo's Portfolio">
          <TitleFrame as="span" color="var(--white)" className="hero-title__1 title-frame--lay">
            Matteo's
          </TitleFrame>
          <TitleFrame as="span" color="var(--white)" className="hero-title__2 title-frame--lay">
            Portfolio
          </TitleFrame>
        </h1>

        {/* Phones and tablets only: desktops hide this image (they show the
            two small photos instead), so it's the screen-sized crop, the same
            file as those photos, and the 1.5MB full image is never fetched.
            width/height = the PNG's real size, so the browser reserves the
            right space before it loads (the bar check needs it). */}
        <img
          ref={imageRef}
          src={heroSkierMobile}
          width="402"
          height="575"
          alt="Matteo skiing"
          className="hero-image"
        />

        {/* Desktop only: two small tilted photos around the titles */}
        <div className="hero-photos" aria-hidden="true">
          <div className="hero-photo hero-photo--1">
            <img src={heroSkierMobile} alt="" />
          </div>
          <div className="hero-photo hero-photo--2">
            <img src={heroSkierMobile} alt="" />
          </div>
        </div>

        <TitleFrame
          as="a"
          href="#scroll-down"
          color="var(--red)"
          className="CTA title-frame--lay title-frame--press"
          onClick={handleScrollDown}>
          {/* Different wording per screen size (see .CTA__label in Home.css) */}
          <span className="CTA__label CTA__label--phone">View projects</span>
          <span className="CTA__label CTA__label--tablet">Check it out now</span>
          <svg className="CTA__arrow" width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
            <path d="M7 0V17M1 11L7 17L13 11" stroke="currentColor" strokeWidth="3" />
          </svg>
        </TitleFrame>

        {/* The words are listed BAR_COPIES times so the bar is always full:
            the animation slides exactly one copy to the left, then starts
            over, and the copies after it fill the rest of the bar. */}
        <div
          ref={barRef}
          className="scrolling-bar"
          hidden={!barFits}
          data-held={barHeld || undefined}
          onClick={toggleBar}
        >
          <button
            type="button"
            className="scrolling-bar__toggle"
            aria-pressed={barHeld}
            onClick={(event) => {
              event.stopPropagation() // the bar's own click would undo it
              toggleBar()
            }}
          >
            {barHeld ? 'Play' : 'Pause'} scrolling text
          </button>
          <div className="scrolling-bar__track" style={{ '--copies': BAR_COPIES }}>
            {Array.from({ length: BAR_COPIES }, (_, copy) => (
              <ul key={copy} className="scrolling-bar__list" aria-hidden={copy > 0}>
                {roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>



      <div className="homePage__content" id="scroll-down" tabIndex={-1}>
        <h2>Latest work</h2>
        <ProjectCarousel label="Latest work">
          {latest.map((project) => (
            // The whole card is the link to the project
            <Link
              key={project.slug}
              to={`/portfolio/${project.slug}`}
              className="project-card"
              style={{
                '--project-main': project.mainColor,
                '--project-secondary': project.secondaryColor,
              }}
            >
              <BorderFrame color="var(--project-main)" className="project-card__media">
                {project.cover && (
                  <img src={project.cover} alt="" className="project-card__image" />
                )}

                {/* The title over the image, one framed line per titleLines entry */}
                <h3 className="project-card__title title-stack" aria-label={project.title}>
                  {project.titleLines.map((line, i) => (
                    <TitleFrame
                      key={i}
                      as="span"
                      color="var(--project-main)"
                      className="project-card__title-line"
                    >
                      {line}
                    </TitleFrame>
                  ))}
                </h3>

                {/* "Goes somewhere" arrow in the bottom-right red corner */}
                <svg
                  className="project-card__arrow"
                  viewBox="0 0 20 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M0 7H17M11 1L17 7L11 13" stroke="currentColor" strokeWidth="3" />
                </svg>
              </BorderFrame>
            </Link>
          ))}
        </ProjectCarousel>
      </div>
    </div>
  )
}
