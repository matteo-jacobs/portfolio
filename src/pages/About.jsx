import heroSkier from '../assets/hero-skier.png'
import heroSkierMobile from '../assets/hero-skier__mobile.png'
import TitleFrame from '../components/TitleFrame.jsx'
import './About.css'

export default function About() {
  return (
    <section className="aboutPage">
      {/* Desktop: the big framed photo in the top-left */}
      <img
        src={heroSkier}
        width="1220"
        height="1287"
        alt="Matteo skiing"
        className="about__big-photo"
      />

      <div className="about__content">
        <TitleFrame as="h1" color="var(--white)" className="about__title about__title--about">
          About me
        </TitleFrame>

        <p className="about__text about__text--about">
          I'm Matteo Jacobs, a Digital Design and Development student at Howest
          Kortrijk. For the past four years, I've been immersed in the world of
          design, learning, failing, and growing with every project along the
          way. While web design is where I feel most at home, branding is what
          truly excites me, there's something powerful about shaping the
          identity that sets the tone for everything a brand becomes. I believe
          design isn't just about how something looks, but about the story it
          tells and the feeling it leaves behind.
        </p>

        {/* Phone and tablet: a small tilted photo next to "Fun fact" */}
        <div className="about__photo">
          <img src={heroSkierMobile} alt="" />
        </div>

        <TitleFrame as="h2" color="var(--white)" className="about__title about__title--fun">
          Fun fact
        </TitleFrame>

        <p className="about__text about__text--fun">
          When I'm not designing, you'll probably find me on a mountain. I'm a
          ski instructor, and between my own runs and teaching kids to ski, the
          mountains have become my favorite place in the world.
        </p>
      </div>
    </section>
  )
}
