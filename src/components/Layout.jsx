import { useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import Navigation from './navigation.jsx'
import Footer from './footer.jsx'
import './Layout.css'

// A client-side navigation keeps the old scroll position, so a link in the
// footer would open the next page scrolled down to its footer. Every link
// click (also one to the page you're already on) starts at the top. Back /
// forward (POP) is left to the browser, which puts you back where you were.
// A link with a #hash scrolls to that element instead.
function useScrollToTopOnNavigate() {
  const { key, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType === 'POP') return

    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView()
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key, hash, navigationType])
}

export default function Layout() {
  useScrollToTopOnNavigate()

  return (
    <div className="site">
      <Navigation />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
