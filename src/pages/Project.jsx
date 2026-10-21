import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import TitleFrame from '../components/TitleFrame.jsx'
import BorderFrame from '../components/BorderFrame.jsx'
import NotFound from './NotFound.jsx'
import './Project.css'

// The project's video loops on its own, like a showreel, unless the visitor
// asked for less motion. Either way there's a pause / play button (WCAG
// 2.2.2: anything that moves for more than 5 seconds needs one).
function ProjectVideo({ src, poster, title }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

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

  return (
    <>
      <video
        ref={videoRef}
        className="project__media-item"
        src={src}
        poster={poster ?? undefined}
        muted
        loop
        playsInline
        aria-label={`Video of ${title}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <TitleFrame
        as="button"
        type="button"
        color="var(--white)"
        className="project__video-toggle title-frame--press"
        onClick={toggle}
      >
        {playing ? 'Pause video' : 'Play video'}
      </TitleFrame>
    </>
  )
}

export default function Project() {
  const { projectSlug } = useParams()
  const project = getProject(projectSlug)

  if (!project) return <NotFound />

  // Back to the page the project is listed on
  const back = project.appState
    ? { to: '/appstate', label: 'AppState' }
    : { to: '/portfolio', label: 'Portfolio' }

  const links = [
    ['Figma file', project.figmaFile],
    ['Figma prototype', project.figmaPrototype],
    ['Notion', project.notion],
  ].filter(([, href]) => href)

  const facts = [
    ['Industry', project.industry],
    ['Scope of work', project.scopeOfWork.join(', ')],
    ['Tools used', project.toolsUsed.join(', ')],
  ].filter(([, value]) => value)

  return (
    <article
      className="project"
      style={{
        '--project-main': project.mainColor,
        '--project-secondary': project.secondaryColor,
      }}
    >
      {/* --- On the red: title and the main video / image -------------- */}
      <header className="project__head">
        {/* Framed lines, like the project wall: white frames, the lines in
            the project's own colors. aria-label: screen readers would
            otherwise read the lines run together. */}
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

        {project.media && (
          <BorderFrame color="var(--project-main)" className="project__media">
            {project.media.type === 'video' ? (
              <ProjectVideo src={project.media.src} poster={project.cover} title={project.title} />
            ) : (
              <img className="project__media-item" src={project.media.src} alt={project.title} />
            )}
          </BorderFrame>
        )}
      </header>

      {/* --- The white sheet: facts, write-up, links, images ------------ */}
      <div className="project__sheet">
        {facts.length > 0 && (
          <dl className="project__facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.details && (
          <div className="project__details">
            {project.details.split(/\n\s*\n/).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
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
                  color="var(--red)"
                  className="project__link title-frame--press"
                >
                  {label} <span aria-hidden="true">↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </TitleFrame>
              </li>
            ))}
          </ul>
        )}

        {project.images.length > 0 && (
          <ul className="project__gallery">
            {project.images.map((src, i) => (
              <li key={src}>
                <BorderFrame color="var(--project-main)">
                  <img
                    className="project__gallery-image"
                    src={src}
                    alt={`${project.title}, image ${i + 1}`}
                    loading="lazy"
                  />
                </BorderFrame>
              </li>
            ))}
          </ul>
        )}

        {/* Done with this one: back to the page it's listed on */}
        <TitleFrame
          as={Link}
          to={back.to}
          color="var(--red)"
          className="project__back title-frame--press"
        >
          <span aria-hidden="true">←</span> All {back.label} projects
        </TitleFrame>
      </div>
    </article>
  )
}
