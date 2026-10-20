import { Children, useRef, useState } from 'react'
import TitleFrame from './TitleFrame.jsx'
import './ProjectCarousel.css'

// Shows its children one at a time, side by side: swipe (phone), scroll
// sideways (trackpad), use the arrow keys, or the ← / → buttons and dots.
// The scrolling itself is plain CSS scroll-snap; JS only keeps track of
// which slide is showing and moves to a slide when a button is clicked.
//
// Usage:
//   <ProjectCarousel label="Passed work">
//     <article>…</article>
//     <article>…</article>
//   </ProjectCarousel>
export default function ProjectCarousel({ label, children }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const slides = Children.toArray(children)

  // Distance from one slide to the next (slide width + gap)
  const step = () => {
    const [first, second] = trackRef.current.children
    return second ? second.offsetLeft - first.offsetLeft : 1
  }

  const handleScroll = () => {
    setActive(Math.round(trackRef.current.scrollLeft / step()))
  }

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index))
    trackRef.current.scrollTo({ left: clamped * step() })
  }

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      {/* tabIndex: lets keyboard users focus it and scroll with the arrow keys */}
      <div ref={trackRef} className="carousel__track" tabIndex={0} onScroll={handleScroll}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="carousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="carousel__controls">
          <TitleFrame
            as="button"
            type="button"
            color="var(--red)"
            className="carousel__arrow"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            ←
          </TitleFrame>

          <div className="carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className="carousel__dot"
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>

          <TitleFrame
            as="button"
            type="button"
            color="var(--red)"
            className="carousel__arrow"
            onClick={() => goTo(active + 1)}
            disabled={active === slides.length - 1}
            aria-label="Next project"
          >
            →
          </TitleFrame>
        </div>
      )}
    </div>
  )
}
