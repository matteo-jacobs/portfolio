import heroImage from '../assets/hero.png'

export default function Home() {
  return (
    <section className="page home">
      <img className="home-image" src={heroImage} alt="Matteo Jacobs" />
      <h1>Matteo Jacobs</h1>
      <p className="lede">
        Student at Appalachian State exploring storytelling through new media, games, and code.
      </p>
    </section>
  )
}
