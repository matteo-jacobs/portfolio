import skier from '../assets/skier.jpg'
import heroTitle__background from '../assets/heroTitle__background.jpg'

export default function Home() {

  return (
    <div className="homePage">
      <div className="navigationWrapper">
      </div>
      <div className="hero">
        <img src={skier} alt="Skier" className="hero-image" />
        <div className="hero-title">
          <img src={heroTitle__background} className="hero-title__background" />
          <h1>Matteo's</h1>
          <h1>Portfolio</h1>
        </div>
        <a href="#scroll-down" className="CTA">View Projects</a>
        <div className="scrolling-bar">
          <span> - </span>
          <span>Designer</span>
          <span> - </span>
          <span>Developper</span>
          <span> - </span>
          <span>Goofball</span>
          <span> - </span>
          <span>Problem solver</span>
        </div>
      </div>
      <div className="homePage__content">
        <h2>Passed work</h2>
        <div>
          <div>
            <img src={skier} alt="Skier" className="homePage__content__image" />
            <h3>Project Title</h3>
          </div>
          <a href="#">View Project</a>
        </div>
        <div>
          <div>
            <img src={skier} alt="Skier" className="homePage__content__image" />
            <h3>Project Title</h3>
          </div>
          <a href="#">View Project</a>
        </div>
        <div>
          <div>
            <img src={skier} alt="Skier" className="homePage__content__image" />
            <h3>Project Title</h3>
          </div>
          <a href="#">View Project</a>
        </div>     
      </div>
    </div>
  )
}
