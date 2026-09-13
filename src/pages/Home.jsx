import skier from '../assets/skier.jpg'
import Navigation from '../components/navigation.jsx'

export default function Home() {

  return (
    <div className="hero">
      <Navigation />
      <img src={skier} alt="Skier" className="hero-image" />
    </div>
  )
}
