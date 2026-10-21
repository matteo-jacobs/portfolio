import { Link } from 'react-router-dom'
import TitleFrame from '../components/TitleFrame.jsx'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title title-stack" aria-label="404: Page not found">
        <TitleFrame as="span" color="var(--white)" className="not-found__line title-frame--lay">
          404
        </TitleFrame>
        <TitleFrame
          as="span"
          color="var(--white)"
          className="not-found__line title-frame--lay"
          style={{ '--lay-delay': '120ms' }}
        >
          Page not found
        </TitleFrame>
      </h1>
      <p className="not-found__text">
        That page doesn&apos;t exist — or hasn&apos;t been built yet.
      </p>
      <TitleFrame as={Link} to="/" color="var(--white)" className="not-found__home title-frame--press">
        Back home <span aria-hidden="true">→</span>
      </TitleFrame>
    </section>
  )
}
