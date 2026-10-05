import skier from '../assets/skier.jpg'
import aboutme from '../assets/aboutme.jpg'
import Navigation from '../components/navigation.jsx'
import Footer from '../components/footer.jsx'

export default function About() {
  return (
    <div ClassName="aboutPage">
          <Navigation />
          <div className="hero">
            <img src={skier} alt="Skier" className="hero-image" />
            <div className="hero-title">
              <img src={aboutme}></img>
              <h1>About Me</h1>
            </div>
            <p>Hi, I'm Matteo, a passionate designer and developer with a love for creating beautiful and functional digital experiences. With a background in both design and development, I bring a unique perspective to every project I work on.</p>
            <div className="hero-title">
              <img src={aboutme}></img>
              <h1>Fun Fact</h1>
            </div>
            <p>When I'm not designing, you'll probably find me on a mountain. I'm a ski instructor, and between my own runs and teaching kids to ski, the mountains have become my favorite place in the world.</p>
          </div>
          <Footer />
    </div>
  )
}
