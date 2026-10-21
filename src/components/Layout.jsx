import { Outlet } from 'react-router-dom'
import Navigation from './navigation.jsx'
import Footer from './footer.jsx'
import './Layout.css'

export default function Layout() {
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
