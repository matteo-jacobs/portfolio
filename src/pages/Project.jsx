import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import TitleFrame from '../components/TitleFrame.jsx'
import NotFound from './NotFound.jsx'
import './Project.css'

// While a project page is open, the whole site takes on the project's
// colors: everything drawn in --red (buttons, frames, the navigation, the
// footer's form) uses the project's main color, and the pattern behind the
// hero and the footer is the project's own background.jpg. Without a
// background.jpg the site's red pattern stays. Undone when you leave.
function useProjectTheme(project) {
  useLayoutEffect(() => {
    if (!project) return
    const root = document.documentElement
    const { body } = document

    root.style.setProperty('--red', project.mainColor)
    root.dataset.projectTheme = '' // see navigation.css: Portfolio stays colored
    if (project.background) {
      body.style.background = `${project.mainColor} url("${project.background}")`
    }

    return () => {
      root.style.removeProperty('--red')
      delete root.dataset.projectTheme
      body.style.background = ''
    }
  }, [project])
}

// The project's video takes the cover's place in the hero and loops on its
// own, like a showreel, unless the visitor asked for less motion. Either way
// there's a pause / play button (WCAG 2.2.2: anything that moves for more than
// 5 seconds needs one). It starts muted, because browsers block autoplay with
// sound; the sound button turns it on.
function ProjectVideo({ src, poster, title }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!video || reduceMotion) return
    // play() fails when the browser blocks autoplay: then it simply stays paused
    video.play().catch(() => {})
  }, [src])

  const toggle = () => {
    const video = videoRef.current
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  // Turning the sound on also starts a paused video, or nothing would be heard
  const toggleSound = () => {
    const video = videoRef.current
    video.muted = !video.muted
    if (!video.muted && video.paused) video.play().catch(() => {})
  }

  return (
    <>
      <div className="project__cover-frame">
        <video
          ref={videoRef}
          className="project__cover-image"
          src={src}
          poster={poster ?? undefined}
          muted
          loop
          playsInline
          aria-label={`Video of ${title}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(event) => setMuted(event.target.muted)}
        />
      </div>
      <div className="project__video-controls">
        <TitleFrame
          as="button"
          type="button"
          color="var(--white)"
          className="project__video-toggle title-frame--press"
          onClick={toggle}
        >
          {playing ? 'Pause video' : 'Play video'}
        </TitleFrame>
        <TitleFrame
          as="button"
          type="button"
          color="var(--white)"
          className="project__video-toggle title-frame--press"
          onClick={toggleSound}
        >
          {muted ? 'Sound on' : 'Sound off'}
        </TitleFrame>
      </div>
    </>
  )
}

// **Like this** in a section's text turns bold
function withBold(text) {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

export default function Project() {
  const { projectSlug } = useParams()
  const project = getProject(projectSlug)
  useProjectTheme(project)

  if (!project) return <NotFound />

  // "See more projects": back to the page this project is listed on
  const moreProjects = project.appState ? '/appstate' : '/portfolio'

  const links = [
    ['Play the game', project.game],
    ['Visit Figma file', project.figmaFile],
    ['Visit Figma prototype', project.figmaPrototype],
    ['Visit website', project.website],
    ['Visit Notion', project.notion],
  ].filter(([, href]) => href)

  const facts = [
    ['Industry', project.industry ? [project.industry] : []],
    ['Course', project.course ? [project.course] : []],
    ['Team', project.team],
    ['Scope of work', project.scopeOfWork],
    ['Tools used', project.toolsUsed],
  ].filter(([, values]) => values.length > 0)

  return (
    <article
      className="project"
      style={{
        '--project-main': project.mainColor,
        '--project-secondary': project.secondaryColor,
      }}
    >
      {/* --- Hero: the video, or else the cover, in a slanted white frame,
          the title tagged over its top-left corner in framed lines ----- */}
      <header className="project__head">
        <div className="project__cover">
          {/* aria-label: screen readers would otherwise read the lines
              run together ("MixboxBranding") */}
          <h1 className="project__title title-stack" aria-label={project.title}>
            {project.titleLines.map((line, i) => (
              <TitleFrame
                key={i}
                as="span"
                color="var(--white)"
                className="project__title-line title-frame--lay"
                style={{ '--lay-delay': `${i * 120}ms` }}
              >
                {line}
              </TitleFrame>
            ))}
          </h1>

          {project.media?.type === 'video' ? (
            <ProjectVideo src={project.media.src} poster={project.cover} title={project.title} />
          ) : (
            project.cover && (
              <div className="project__cover-frame">
                <img className="project__cover-image" src={project.cover} alt="" />
              </div>
            )
          )}
        </div>
      </header>

      {/* --- The white sheet ------------------------------------------- */}
      <div className="project__sheet">
        {project.subtitle && <h2 className="project__subtitle">{project.subtitle}</h2>}

        <div className="project__info">
          {facts.length > 0 && (
            <dl className="project__facts">
              {facts.map(([label, values]) => (
                <div key={label}>
                  <dt className="project__label">{label}</dt>
                  <dd>
                    <ul className="project__values">
                      {values.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {(project.details || links.length > 0) && (
            <div className="project__about">
              {project.details && (
                <>
                  <h3 className="project__label">Project details</h3>
                  {project.details.split(/\n\s*\n/).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </>
              )}

              {links.length > 0 && (
                <ul className="project__links">
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <TitleFrame
                        as="a"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="project__link title-frame--press"
                      >
                        {label} <span aria-hidden="true">→</span>
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </TitleFrame>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Optional extra sections: a picture, text and / or a list */}
        {project.sections.map((section) => (
          <section key={section.title} className="project__section">
            <h3 className="project__section-title">{section.title}</h3>
            {section.image && (
              <figure className="project__section-figure">
                <img className="project__image" src={section.image} alt="" loading="lazy" />
                {section.caption && <figcaption>{section.caption}</figcaption>}
              </figure>
            )}
            {(section.text || section.items) && (
              <div className="project__about">
                {section.text?.split(/\n\s*\n/).map((paragraph, i) => (
                  <p key={i}>{withBold(paragraph)}</p>
                ))}
                {section.items && (
                  <ul className="project__section-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        ))}

        {/* Image and the gallery: full width, no frames */}
        {(project.media?.type === 'image' || project.images.length > 0) && (
          <div className="project__images">
            {project.media?.type === 'image' && (
              <img className="project__image" src={project.media.src} alt={project.title} />
            )}
            {project.images.map((src, i) => (
              <img
                key={src}
                className="project__image"
                src={src}
                alt={`${project.title}, image ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        )}

        <TitleFrame as={Link} to={moreProjects} className="project__more title-frame--press">
          See more projects <span aria-hidden="true">→</span>
        </TitleFrame>
      </div>
    </article>
  )
}
