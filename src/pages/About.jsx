import heroImage from '../assets/hero.png'

export default function About() {
  return (
    <section className="page about">
      <h1>About Me</h1>

      {/* TODO: swap for an actual self-portrait photo or illustration. */}
      <img className="about-portrait" src={heroImage} alt="Matteo Jacobs" />

      <p>
        I&apos;m Matteo Jacobs, a student at Appalachian State University. Right now I&apos;m focused
        on how stories get told through interactive and emerging media — podcasts, branching games,
        and tabletop design — and how the tools we build shape the stories we can tell.
      </p>
      <p>
        My goal after graduating is to work somewhere at the intersection of design and software,
        building things people actually use. Outside of coursework I like [hobbies / personal
        interests — update this].
      </p>
      <p>
        I&apos;ll keep this bio current as things change: today I <em>am</em> a student; later this
        will say I <em>was</em> one.
      </p>

      <h2>Contact</h2>
      <ul className="contact-list">
        <li>
          Email: <a href="mailto:jacobsm2@appstate.edu">jacobsm2@appstate.edu</a>{' '}
        </li>
        <li> 
          Phone: <a href="tel:+32474024771">+32474024771</a>
          </li>
        
      </ul>
    </section>
  )
}
