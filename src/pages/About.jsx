import { useEffect, useRef, useState } from 'react'
import heroSkier from '../assets/hero-skier.png'
import heroSkierMobile from '../assets/hero-skier__mobile.png'
import TitleFrame from '../components/TitleFrame.jsx'
import './About.css'

// A transparent 1×1 GIF: what phones and tablets load for the desktop photo
const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

// True once the element has been (mostly) on screen. Used to lay "Fun fact"
// on when you scroll to it, instead of on page load where you'd miss it.
function useSeenOnScreen() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setSeen(true)
        observer.disconnect()
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, seen]
}

export default function About() {
  const [funTitleRef, funTitleSeen] = useSeenOnScreen()

  return (
    <section className="aboutPage">
      {/* Desktop: the big framed photo in the top-left. Smaller screens hide
          it, so they get an empty 1px image instead of downloading 1.5MB. */}
      <picture className="about__big-picture">
        <source media="(max-width: 1279.98px)" srcSet={EMPTY_IMAGE} />
        <img
          src={heroSkier}
          width="1220"
          height="1287"
          alt="Matteo skiing"
          className="about__big-photo"
        />
      </picture>

      <div className="about__content">
        <TitleFrame as="h1" color="var(--white)" className="about__title about__title--about title-frame--lay">
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

        <TitleFrame
          as="h2"
          ref={funTitleRef}
          color="var(--white)"
          className="about__title about__title--fun title-frame--lay"
          data-lay-wait={funTitleSeen ? undefined : ''}
        >
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
