import { useState, useRef, useEffect } from 'react'
import { SplashStoreCarousel } from './SplashStoreCarousel'
import type { SplashStoreCarouselItem } from './SplashStoreCarousel'
import { HeroCarousel } from './HeroCarousel'
import type { HeroCarouselSlide } from './HeroCarousel'
// @ts-ignore - BounceCards is .jsx
import BounceCards from './components/BounceCards'
import './SplashPage.css'

/** New query string on every full page load so hard refresh (Cmd+Shift+R) fetches latest images. */
const assetBust = Date.now().toString(36)
function assetUrl(path: string): string {
  return `${path}${path.includes('?') ? '&' : '?'}t=${assetBust}`
}

/** Images for the Bouncing cards section – add files under public/images/BouncingCards/ */
const BOUNCE_CARD_IMAGES = [
  assetUrl('/images/BouncingCards/1.png'),
  assetUrl('/images/BouncingCards/2.png'),
  assetUrl('/images/BouncingCards/3.png'),
  assetUrl('/images/BouncingCards/4.png'),
  assetUrl('/images/BouncingCards/5.png'),
  assetUrl('/images/BouncingCards/6.png'),
  assetUrl('/images/BouncingCards/7.png'),
  assetUrl('/images/BouncingCards/8.png'),
]

const HERO_CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    id: 'better-lunches',
    backgroundImage: assetUrl('/images/hero/hero-1.png'),
    tagline: 'Team ordering made simple',
    headline: 'Better team lunches start here',
    subtitle: 'A digital food court with no fees, or tips. 50+ restaurants.',
    ctaText: 'Enter your delivery address',
  },
  {
    id: 'no-fee-deliveries',
    backgroundImage: assetUrl('/images/hero/hero-2.png'),
    tagline: 'Big smiles, Zero fees',
    headline: 'No fee delivery, endless selection',
    subtitle: 'Feed teams from 5 to 500 with no delivery or service fees or tips.',
    ctaText: 'Enter your delivery address',
  },
  {
    id: 'everyone-favorite',
    backgroundImage: assetUrl('/images/hero/hero-3.png'),
    tagline: 'One order, no compromises.',
    headline: 'Everyone gets their favorite.',
    subtitle: 'With a single link, any team member can choose any restaurant or meal they desire',
    ctaText: 'Enter your delivery address',
  },
  {
    id: 'try-today',
    backgroundImage: assetUrl('/images/hero/hero-4.png'),
    tagline: 'Experience the difference, no strings attached',
    headline: 'Try it today in Los Angeles',
    subtitle: 'Try Picnic for yourself with no contracts, commitments or setup',
    ctaText: 'Enter your delivery address',
  },
]

const HERO_BULLETS = [
  {
    id: 'fees',
    title: 'No delivery fees or tips',
    description:
      'Orders over $100 are provided with no delivery fee or courier tip, you pay what you would at the restaurant.',
  },
  {
    id: 'orders',
    title: 'Everybody orders for themselves',
    description:
      'Each person orders from the same link and gets their own meal—no group decisions required.',
  },
  {
    id: 'restaurants',
    title: '50+ restaurants to choose from',
    description: 'Choose from 50+ restaurants delivered to your office in Downtown LA.',
  },
] as const

const TICKER_ITEMS = [
  '50+ Restaurants delivered to Downtown LA',
  "Try Picnic today with no setup or contract",
  'Now Available in Los Angeles',
] as const

const TICKER_SEPARATOR = '/images/general/Ticker-Dot.svg'

/** Builds ticker segments: text and dot separator alternating (text, dot, text, dot, …). */
function tickerSegments(): Array<{ type: 'text'; value: string } | { type: 'image'; src: string }> {
  const out: Array<{ type: 'text'; value: string } | { type: 'image'; src: string }> = []
  TICKER_ITEMS.forEach((value) => {
    out.push({ type: 'text', value })
    out.push({ type: 'image', src: TICKER_SEPARATOR })
  })
  return out
}

const WHEN_TO_PICNIC = [
  'Team meetings',
  'All hands',
  'Holiday parties',
  'Happy hour',
  'Onboarding',
  'Birthdays',
  'Events',
] as const

const SPLASH_STORES: SplashStoreCarouselItem[] = [
  {
    id: 'pita-dust',
    imageUrl: assetUrl('/images/stores/Pita-Dust.png'),
    storeName: 'Pita Dust',
    category: 'Modern Mediterranean-inspired bowls',
  },
  {
    id: 'goop',
    imageUrl: assetUrl('/images/stores/Goop-Kitchen.png'),
    storeName: 'Goop Kitchen',
    category:
      'Hearty bowls, vibrant salads, delicious handhelds, and more, all gluten-free and certified clean.',
  },
  {
    id: 'sweetfin',
    imageUrl: assetUrl('/images/stores/Sweetfin.png'),
    storeName: 'Sweetfin',
    category:
      'Chef-driven, California inspired premium poke™ bowl concept that uses local produce, sustainable fish, and innovative ingredients',
  },
  {
    id: 'starbucks',
    imageUrl: assetUrl('/images/stores/Starbucks.png'),
    storeName: 'Starbucks',
    category:
      'World-famous coffee drinks, handcrafted espresso beverages, fresh pastries, and café favorites',
  },
  {
    id: 'loqui',
    imageUrl: assetUrl('/images/stores/Loqui.png'),
    storeName: 'Loqui Tacos',
    category: 'Honest ingredients and bold Mexican flavors for everyone under the sun',
  },
  {
    id: 'hugos-tacos',
    imageUrl: assetUrl('/images/stores/Hugos-Tacos.png'),
    storeName: "Hugo's Tacos",
    category:
      'An east-LA essential... Tacos, burritos, and bowls made fast and fresh',
  },
  {
    id: 'for-the-win',
    imageUrl: assetUrl('/images/stores/For-The-Win.png'),
    storeName: 'For the Win',
    category: "An LA smash-burger staple, recognized as one of the best burgers in the city",
  },
  {
    id: 'boos-philly-cheesesteak',
    imageUrl: assetUrl('/images/stores/Boos-Philly-Cheesesteak.png'),
    storeName: "Boo's Philly Cheesesteaks",
    category: "The Realest Philly Cheesesteak in Socal",
  },
  {
    id: 'mendocino-farms',
    imageUrl: assetUrl('/images/stores/Mendocino-Farms.png'),
    storeName: 'Mendocino Farms',
    category: 'Where fresh sandwiches, salads and more take you on an unexpected culinary adventure',
  },
  {
    id: 'hoyka-thai',
    imageUrl: assetUrl('/images/stores/Hoyka-Thai.png'),
    storeName: 'Hoyka Thai',
    category: 'Classic Thai restaurant specializing in classic noodle, rice & curry dishes',
  },
]

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BounceCardsSection({ images }: { images: string[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="splash-bounce-cards"
      aria-labelledby="splash-bounce-cards-title"
    >
      <div className="splash-bounce-cards-content">
        <img
          src={assetUrl('/images/general/BoostTeam.svg')}
          alt=""
          className="splash-bounce-cards-icon"
          aria-hidden
        />
        <h2 id="splash-bounce-cards-title" className="splash-bounce-cards-title">
          Finally, everyone gets their favorite.
        </h2>
        <p className="splash-bounce-cards-subtitle">
          One delivery. Zero compromises
        </p>
      </div>
      <div className="splash-bounce-cards-inner">
        {inView && (
          <div className="splash-bounce-cards-stack">
          <BounceCards
            images={images}
            containerWidth={620}
            containerHeight={400}
            enableHover={true}
            transformStyles={[
              'rotate(10deg) translate(-170px)',
              'rotate(5deg) translate(-85px)',
              'rotate(-3deg)',
              'rotate(-10deg) translate(85px)',
              'rotate(2deg) translate(170px)',
              'rotate(-6deg) translate(255px)',
              'rotate(4deg) translate(340px)',
              'rotate(-2deg) translate(425px)',
            ]}
          />
          </div>
        )}
      </div>
    </section>
  )
}

export function SplashPage() {
  const [expandedBulletId, setExpandedBulletId] = useState<string | null>(null)

  const toggleBullet = (id: string) => {
    setExpandedBulletId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="splash">
      {/* Hero carousel (rotating copy + background images) */}
      <HeroCarousel
        slides={HERO_CAROUSEL_SLIDES}
        intervalMs={6000}
        bannerText="$50 off your first order with code: tryme"
        bannerIconUrl={assetUrl('/images/general/discount.svg')}
        logoLabel="Picnic"
        showAuthButtons={false}
      />

      {/* Full-width ticker – Figma 691-1969 (no horizontal padding) */}
      <section className="splash-hero-ticker-section" aria-label="Highlights">
        <div className="splash-hero-ticker-wrap">
          <div className="splash-hero-ticker">
            <div className="splash-hero-ticker-track">
              {[...tickerSegments(), ...tickerSegments(), ...tickerSegments(), ...tickerSegments()].map((seg, i) =>
                seg.type === 'text' ? (
                  <span key={i} className="splash-hero-ticker-item">
                    {seg.value}
                  </span>
                ) : (
                  <img
                    key={i}
                    src={seg.src}
                    alt=""
                    className="splash-hero-ticker-icon"
                    aria-hidden
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Hero – Figma 691-1968 */}
      <section className="splash-hero">
        <div className="splash-hero-content">
          <img src="/images/general/Mark_orange.svg" alt="" className="splash-hero-graphic" aria-hidden />
          <h1 className="splash-hero-title">Built for keeping teams happy together</h1>
          <p className="splash-hero-body">
            Now in Los Angeles, try Picnic at your office with no contract or setup
          </p>
        </div>
        <div className="splash-hero-bullets" role="list">
          {HERO_BULLETS.map((bullet) => {
            const isExpanded = expandedBulletId === bullet.id
            return (
              <div
                key={bullet.id}
                className={`splash-hero-bullet ${isExpanded ? 'splash-hero-bullet--expanded' : ''}`}
                role="listitem"
              >
                <button
                  type="button"
                  className="splash-hero-bullet-trigger"
                  onClick={() => toggleBullet(bullet.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`splash-hero-bullet-content-${bullet.id}`}
                  id={`splash-hero-bullet-trigger-${bullet.id}`}
                >
                  <span className="splash-hero-bullet-trigger-inner">
                    <span className="splash-hero-bullet-text">{bullet.title}</span>
                    <span className="splash-hero-bullet-icon" aria-hidden>
                      {isExpanded ? <MinusIcon /> : <PlusIcon />}
                    </span>
                  </span>
                </button>
                <div
                  id={`splash-hero-bullet-content-${bullet.id}`}
                  className="splash-hero-bullet-content"
                  role="region"
                  aria-labelledby={`splash-hero-bullet-trigger-${bullet.id}`}
                  aria-hidden={!isExpanded}
                >
                  <div className="splash-hero-bullet-content-inner">
                    <p className="splash-hero-bullet-description">{bullet.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Store ticker – full-width, auto-scroll, loop */}
      <section className="splash-stores" aria-label="Restaurants">
        <div className="splash-stores-inner">
          <SplashStoreCarousel stores={SPLASH_STORES} gap={24} />
        </div>
      </section>

      {/* Third – Figma 695-1386 */}
      <section className="splash-third" aria-labelledby="splash-third-title">
        <div className="splash-third-inner">
          <div className="splash-third-content">
            <h2 id="splash-third-title" className="splash-third-title">
              When to Picnic?
            </h2>
          </div>
          <div className="splash-third-container">
            <p className="splash-third-label">Perfect for</p>
            <div className="splash-third-list-wrap">
              {WHEN_TO_PICNIC.map((item) => (
                <span key={item} className="splash-third-list-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="splash-third-visual">
            <img
              src={assetUrl('/images/general/Why-Picnic-Asset.png')}
              alt=""
              className="splash-third-asset"
              aria-hidden
            />
            <div className="splash-third-pill">Feed 5 or 500</div>
          </div>
        </div>
      </section>

      {/* Bouncing cards – animate when section enters viewport */}
      <BounceCardsSection images={BOUNCE_CARD_IMAGES} />

      {/* Footer – Figma 731-7013 */}
      <footer className="splash-footer" aria-label="Footer">
        <div className="splash-footer-content">
          <div className="splash-footer-top">
            <div className="splash-footer-brand">
              <img
                src={assetUrl('/images/general/logo.svg')}
                alt="Picnic"
                className="splash-footer-logo"
              />
              <div className="splash-footer-social">
                <p className="splash-footer-social-label">Follow us on social media</p>
                <div className="splash-footer-social-links">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="splash-footer-social-link" aria-label="Instagram">Instagram</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="splash-footer-social-link" aria-label="LinkedIn">LinkedIn</a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="splash-footer-social-link" aria-label="YouTube">YouTube</a>
                </div>
              </div>
            </div>
            <p className="splash-footer-description">
              Discover our zero tips office lunch delivery service, catering for large events, group ordering, and subsidized lunch programs with trypicnic.com. Elevate your company's food experience with tailored solutions for businesses
            </p>
          </div>
          <div className="splash-footer-bottom">
            <div className="splash-footer-legal-row">
              <p className="splash-footer-copyright">© 2024 Picnic inc. All rights reserved.</p>
              <nav className="splash-footer-links" aria-label="Footer navigation">
                <div className="splash-footer-link-col">
                  <span className="splash-footer-link-header">Get started</span>
                  <a href="#" className="splash-footer-link">Request Picnic for your office</a>
                  <a href="#" className="splash-footer-link">Become a restaurant partner</a>
                </div>
                <div className="splash-footer-link-col">
                  <span className="splash-footer-link-header">Our services</span>
                  <a href="#" className="splash-footer-link">Office meals</a>
                  <a href="#" className="splash-footer-link">Group ordering</a>
                  <a href="#" className="splash-footer-link">Catering</a>
                  <a href="#" className="splash-footer-link">Subsidized meals</a>
                  <a href="#" className="splash-footer-link">Office building delivery</a>
                </div>
                <div className="splash-footer-link-col">
                  <span className="splash-footer-link-header">Resources</span>
                  <a href="#" className="splash-footer-link">Picnic blog</a>
                  <a href="#" className="splash-footer-link">Privacy</a>
                  <a href="#" className="splash-footer-link">Terms</a>
                  <a href="#" className="splash-footer-link">Press</a>
                </div>
                <div className="splash-footer-link-col">
                  <span className="splash-footer-link-header">Company</span>
                  <a href="#" className="splash-footer-link">About</a>
                </div>
                <div className="splash-footer-link-col">
                  <span className="splash-footer-link-header">Get Help</span>
                  <a href="#" className="splash-footer-link">Restaurant support</a>
                </div>
                <div className="splash-footer-link-col">
                  <span className="splash-footer-link-header">Legal</span>
                  <a href="#" className="splash-footer-link">Terms of service</a>
                  <a href="#" className="splash-footer-link">Privacy policy</a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
