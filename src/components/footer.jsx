import { useState } from 'react'
import { Link } from 'react-router-dom'
import TitleFrame from './TitleFrame.jsx'
import logoMarkRed from '../assets/navigation/logo-mark-red.svg'
import './footer.css'

const CONTACT = {
  name: 'Matteo Jacobs',
  phone: '+324 74 02 47 71',
  email: 'matteojacobs04@gmail.com',
}

// The form is sent with FormSubmit (formsubmit.co): it emails the message
// to CONTACT.email, no server or API key needed. The very first message
// triggers a one-time activation email from FormSubmit: confirm it once and
// every message after that arrives in the inbox.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`

const PAGES = [
  { to: '/about', label: 'About me' },
  { to: '/appstate', label: 'AppState' },
  { to: '/portfolio', label: 'Portfolio' },
]

// idle -> sending -> sent | error
const STATUS_TEXT = {
  sending: 'Sending…',
  sent: 'Thanks! Your message has been sent.',
  error: 'Something went wrong. Please try again or email me directly.',
}

export default function Footer() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `Portfolio: message from ${data.firstName} ${data.lastName}`,
          _replyto: data.email,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const result = await response.json()
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message)

      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="site-footer" id="contact">
      <h2 className="footer__title">Contact me</h2>

      <div className="footer__body">
        <TitleFrame
          as="form"
          color="var(--white)"
          className="footer__form"
          onSubmit={handleSubmit}
          topRight={[0, 0]}
          bottomRight={[24, 0]}
          bottomLeft={[0, 0]}
        >
          {/* Visually hidden labels: the placeholders show the field names */}
          <label className="footer__field">
            <span className="visually-hidden">First name</span>
            <input name="firstName" placeholder="First name" autoComplete="given-name" required />
          </label>

          <label className="footer__field">
            <span className="visually-hidden">Last name</span>
            <input name="lastName" placeholder="Last name" autoComplete="family-name" required />
          </label>

          <label className="footer__field footer__field--wide">
            <span className="visually-hidden">Email address</span>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
            />
          </label>

          <label className="footer__field footer__field--wide footer__field--message">
            <span className="visually-hidden">Message</span>
            <textarea name="message" placeholder="Message" rows={5} required />
          </label>

          {/* Honeypot: hidden from people, bots fill it in and get ignored */}
          <input type="text" name="_honey" className="visually-hidden" tabIndex={-1} autoComplete="off" />

          <div className="footer__actions">
            <p className="footer__status" aria-live="polite">
              {STATUS_TEXT[status]}
            </p>

            <TitleFrame
              as="button"
              type="submit"
              color="var(--red)"
              className="footer__send"
              disabled={status === 'sending'}
            >
              Send message <span aria-hidden="true">→</span>
            </TitleFrame>
          </div>
        </TitleFrame>

        <address className="footer__contact">
          <p>{CONTACT.name}</p>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </address>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {PAGES.map((page) => (
              <li key={page.to}>
                <Link to={page.to}>
                  {page.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <TitleFrame as={Link} to="/" color="var(--white)" className="footer__home">
          <img src={logoMarkRed} alt="Home" />
        </TitleFrame>
      </div>
    </footer>
  )
}
