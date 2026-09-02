import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page not-found">
      <p className="error-code">404</p>
      <h1>Page not found</h1>
      <p>That page doesn&apos;t exist — or hasn&apos;t been built yet.</p>
      <Link to="/" className="button">
        Back home
      </Link>
    </section>
  )
}
