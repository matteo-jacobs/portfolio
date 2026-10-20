import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { latestProjects } from '../data/projects.js'
import heroSkier from '../assets/hero-skier.png'
import heroSkierMobile from '../assets/hero-skier__mobile.png'
import TitleFrame from '../components/TitleFrame.jsx'
import ProjectCarousel from '../components/ProjectCarousel.jsx'
import BorderFrame from '../components/BorderFrame.jsx'
import './Home.css'

const roles = ['Developer', 'Designer', 'Problem solver', 'Goofball']

// Only show the scrolling bar when the whole bar fits on the first screen
// (above the fold). Returns a ref for the image, a ref for the bar, and
// whether the bar fits.
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

export default function Home() {
  const { imageRef, barRef, fits: barFits } = useBarFitsOnScreen()
  const latest = latestProjects(3)

  return (
    <div className="homePage">
      
      <div className="hero">
        <div className="hero-title title-stack">
          
          <TitleFrame 
          as="h1"
          color="var(--white)"
          className="hero-title__1">
          Matteo's
          </TitleFrame>

          <TitleFrame 
          as="h1"
          color="var(--white)"
          className="hero-title__2">
          Portfolio
          </TitleFrame>



        </div>

        {/* Phones (< 744px) get the screen-sized crop, bigger screens the
            full image. width/height = each PNG's real size, so the browser
            reserves the right space before it loads (the bar check needs it). */}
        <picture className="hero-picture">
          <source
            media="(max-width: 743.98px)"
            srcSet={heroSkierMobile}
            width="402"
            height="575"
          />
          <img
            ref={imageRef}
            src={heroSkier}
            width="1220"
            height="1287"
            alt="Matteo skiing"
            className="hero-image"
          />
        </picture>

        <TitleFrame
          as="a"
          href="#scroll-down"
          color="var(--red)"
          className="CTA">
          View projects
          <svg className="CTA__arrow" width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
            <path d="M7 0V17M1 11L7 17L13 11" stroke="currentColor" strokeWidth="3" />
          </svg>
        </TitleFrame>

        {/* The words are listed twice so the loop has no gap: the animation
            slides exactly one copy to the left, then starts over. */}
        <div ref={barRef} className="scrolling-bar" hidden={!barFits}>
          <div className="scrolling-bar__track">
            {[false, true].map((isCopy) => (
              <ul key={String(isCopy)} className="scrolling-bar__list" aria-hidden={isCopy}>
                {roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>



      <div className="homePage__content" id="scroll-down">
        <h2>Passed work</h2>
        <ProjectCarousel label="Passed work">
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
                <h3 className="project-card__title title-stack">
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
