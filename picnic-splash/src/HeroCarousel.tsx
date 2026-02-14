import { useState, useEffect, useCallback, useRef } from 'react'
import './HeroCarousel.css'

export interface HeroCarouselSlide {
  id: string
  /** Background image URL */
  backgroundImage: string
  /** Small tagline above the headline */
  tagline?: string
  /** Main headline (can include newlines) */
  headline: string
  /** Subtitle below the headline */
  subtitle?: string
  /** CTA button/label text */
  ctaText?: string
}

export interface HeroCarouselProps {
  slides: HeroCarouselSlide[]
  /** Auto-advance interval in ms (0 = no auto) */
  intervalMs?: number
  /** Growth banner text above the header */
  bannerText?: string
  /** Header logo label */
  logoLabel?: string
  /** Show Log in / Sign up in header */
  showAuthButtons?: boolean
  onCtaClick?: () => void
}

const DEFAULT_INTERVAL = 6000

export function HeroCarousel({
  slides,
  intervalMs = DEFAULT_INTERVAL,
  bannerText = 'Take $20 off your first order with code · tryme',
  logoLabel = 'Picnic',
  showAuthButtons = true,
  onCtaClick,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleLayer, setVisibleLayer] = useState(0)
  const [layerSlideIndex, setLayerSlideIndex] = useState([0, 0])
  const indexRef = useRef(0)
  const visibleLayerRef = useRef(0)
  const autoAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  indexRef.current = index
  visibleLayerRef.current = visibleLayer
  const slide = slides[index]

  const goTo = useCallback(
    (i: number) => {
      const n = slides.length
      const next = i < 0 ? n - 1 : i >= n ? 0 : i
      if (next === indexRef.current) return
      const inactive = visibleLayerRef.current === 0 ? 1 : 0
      setLayerSlideIndex((prev) => {
        const nextLayer = [...prev]
        nextLayer[inactive] = next
        return nextLayer
      })
      setVisibleLayer(inactive)
      setIndex(next)
      indexRef.current = next
      visibleLayerRef.current = inactive
    },
    [slides.length]
  )

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo])
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo])

  useEffect(() => {
    if (!intervalMs || isPaused || slides.length <= 1) return
    const scheduleNext = () => {
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        goTo(indexRef.current + 1)
        scheduleNext()
      }, intervalMs)
    }
    scheduleNext()
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current)
        autoAdvanceTimeoutRef.current = null
      }
    }
  }, [intervalMs, isPaused, slides.length, goTo])

  if (!slide) return null

  return (
    <section
      className="hero-carousel"
      // onMouseEnter={() => setIsPaused(true)}
      // onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel"
    >
      {/* Background: two layers for crossfade with ease-in */}
      <div className="hero-carousel__bg">
        <div
          className={`hero-carousel__bg-image ${visibleLayer === 0 ? 'hero-carousel__bg-image--visible' : 'hero-carousel__bg-image--hidden'}`}
          style={{ backgroundImage: `url(${slides[layerSlideIndex[0]]?.backgroundImage})` }}
          aria-hidden
        />
        <div
          className={`hero-carousel__bg-image ${visibleLayer === 1 ? 'hero-carousel__bg-image--visible' : 'hero-carousel__bg-image--hidden'}`}
          style={{ backgroundImage: `url(${slides[layerSlideIndex[1]]?.backgroundImage})` }}
          aria-hidden
        />
        <div className="hero-carousel__bg-overlay" aria-hidden />
      </div>

      {/* Top: growth banner + header */}
      <div className="hero-carousel__top">
        {bannerText && (
          <div className="hero-carousel__banner">
            <span className="hero-carousel__banner-text">{bannerText}</span>
          </div>
        )}
        <header className="hero-carousel__header">
          <img
            src="/images/general/logo.svg"
            alt={logoLabel}
            className="hero-carousel__logo"
          />
          {showAuthButtons && (
            <div className="hero-carousel__actions">
              <button type="button" className="hero-carousel__btn hero-carousel__btn--inverse">
                Log in
              </button>
              <button type="button" className="hero-carousel__btn hero-carousel__btn--primary">
                Sign up
              </button>
            </div>
          )}
        </header>
      </div>

      {/* Center content (one per slide, crossfade) */}
      <div className="hero-carousel__content">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-carousel__slide ${i === index ? 'hero-carousel__slide--active' : ''}`}
            aria-hidden={i !== index}
          >
            <img src="/images/general/Mark.svg" alt="" className="hero-carousel__mark" aria-hidden />
            {s.tagline && <p className="hero-carousel__tagline">{s.tagline}</p>}
            <h1 className="hero-carousel__headline">{s.headline}</h1>
            {s.subtitle && <p className="hero-carousel__subtitle">{s.subtitle}</p>}
            {s.ctaText && (
              <button
                type="button"
                className="hero-carousel__cta"
                onClick={onCtaClick}
              >
                <LocationIcon />
                <span>{s.ctaText}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="hero-carousel__dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`hero-carousel__dot ${i === index ? 'hero-carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {/* Prev/next (optional, for accessibility) */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="hero-carousel__arrow hero-carousel__arrow--prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            className="hero-carousel__arrow hero-carousel__arrow--next"
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronIcon direction="right" />
          </button>
        </>
      )}
    </section>
  )
}

function LocationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {direction === 'left' ? (
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}
