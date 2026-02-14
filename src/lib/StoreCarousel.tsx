import { CSSProperties, forwardRef, useRef, useState, useEffect } from 'react'
import { StoreCard, StoreCardProps } from './StoreCard'

export interface StoreCarouselItem extends Omit<StoreCardProps, 'onClick'> {
  /** Unique identifier for the store */
  id: string | number
}

export interface StoreCarouselProps {
  /** Title displayed above the carousel */
  title?: string
  /** Subtitle displayed below the title */
  subtitle?: string
  /** Array of stores to display in the carousel */
  stores: StoreCarouselItem[]
  /** Number of stores visible at once (default: 4) */
  visibleCount?: number
  /** Gap between stores in pixels (default: 16) */
  gap?: number
  /** Callback when a store is clicked */
  onStoreClick?: (store: StoreCarouselItem) => void
  /** Whether to show navigation arrows (default: true) */
  showArrows?: boolean
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  title: {
    fontFamily: "'P22 Mackinac Pro', serif",
    fontSize: 24,
    fontWeight: 500,
    color: '#141414',
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    color: '#6c6c6c',
    margin: 0,
  },
  navButtons: {
    display: 'flex',
    gap: 8,
  },
  viewport: {
    overflow: 'hidden',
    width: '100%',
  },
  track: {
    display: 'flex',
    transition: 'transform 0.3s ease-out',
  },
  storeWrapper: {
    flexShrink: 0,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease',
  },
  arrowDisabled: {
    opacity: 0.4,
    cursor: 'default',
  },
}

const ChevronLeftIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 15L7.5 10L12.5 5"
      stroke="#141414"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 15L12.5 10L7.5 5"
      stroke="#141414"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const StoreCarousel = forwardRef<HTMLDivElement, StoreCarouselProps>(
  (
    {
      title,
      subtitle,
      stores,
      visibleCount = 4,
      gap = 16,
      onStoreClick,
      showArrows = true,
      className,
      style,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [storeWidth, setStoreWidth] = useState(280)
    const containerRef = useRef<HTMLDivElement>(null)

    // Calculate store width based on container width and visible count
    useEffect(() => {
      const updateStoreWidth = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth
          const totalGap = gap * (visibleCount - 1)
          const calculatedWidth = (containerWidth - totalGap) / visibleCount
          setStoreWidth(Math.floor(calculatedWidth))
        }
      }

      updateStoreWidth()
      window.addEventListener('resize', updateStoreWidth)
      return () => window.removeEventListener('resize', updateStoreWidth)
    }, [gap, visibleCount])

    const maxIndex = Math.max(0, stores.length - visibleCount)
    const canGoBack = currentIndex > 0
    const canGoForward = currentIndex < maxIndex

    const goBack = () => {
      if (canGoBack) {
        setCurrentIndex((prev) => Math.max(0, prev - visibleCount))
      }
    }

    const goForward = () => {
      if (canGoForward) {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + visibleCount))
      }
    }

    const translateX = -(currentIndex * (storeWidth + gap))

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...styles.container, ...style }}
        data-component="store-carousel"
      >
        {/* Header with Title, Subtitle and Navigation */}
        {(title || subtitle || (showArrows && stores.length > visibleCount)) && (
          <div style={styles.header}>
            <div style={styles.titleContainer}>
              {title && <h2 style={styles.title}>{title}</h2>}
              {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
            </div>
            {showArrows && stores.length > visibleCount && (
              <div style={styles.navButtons}>
                <button
                  style={{
                    ...styles.arrowButton,
                    ...(canGoBack ? {} : styles.arrowDisabled),
                  }}
                  onClick={goBack}
                  disabled={!canGoBack}
                  aria-label="Previous stores"
                  onMouseEnter={(e) => {
                    if (canGoBack) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  style={{
                    ...styles.arrowButton,
                    ...(canGoForward ? {} : styles.arrowDisabled),
                  }}
                  onClick={goForward}
                  disabled={!canGoForward}
                  aria-label="Next stores"
                  onMouseEnter={(e) => {
                    if (canGoForward) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Carousel Viewport */}
        <div ref={containerRef} style={styles.viewport}>
          <div
            style={{
              ...styles.track,
              gap,
              transform: `translateX(${translateX}px)`,
            }}
          >
            {stores.map((store) => (
              <div
                key={store.id}
                style={{
                  ...styles.storeWrapper,
                  width: storeWidth,
                }}
              >
                <StoreCard
                  imageUrl={store.imageUrl}
                  storeName={store.storeName}
                  category={store.category}
                  logoUrl={store.logoUrl}
                  showLogo={store.showLogo}
                  badgeText={store.badgeText}
                  badgeColor={store.badgeColor}
                  onClick={() => onStoreClick?.(store)}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

StoreCarousel.displayName = 'StoreCarousel'
