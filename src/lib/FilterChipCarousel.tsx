import { CSSProperties, forwardRef, useRef, useState, useEffect } from 'react'
import { FilterChip } from './FilterChip'

export interface FilterChipItem {
  /** Unique identifier for the chip */
  id: string | number
  /** Label text for the chip */
  label: string
  /** Icon URL or emoji to display */
  icon?: string
}

export interface FilterChipCarouselProps {
  /** Array of filter chips to display */
  chips: FilterChipItem[]
  /** ID of the currently active chip */
  activeChipId?: string | number | null
  /** Callback when a chip is clicked */
  onChipClick?: (chip: FilterChipItem) => void
  /** Gap between chips in pixels (default: 8) */
  gap?: number
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
  viewport: {
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  track: {
    display: 'flex',
    transition: 'transform 0.3s ease-out',
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    pointerEvents: 'none',
    zIndex: 5,
    transition: 'opacity 0.2s ease',
  },
  fadeLeft: {
    left: 0,
    background: 'linear-gradient(270deg, rgba(247, 247, 242, 0.05) 28.86%, rgba(247, 247, 242, 0.40) 52.82%, rgba(247, 247, 242, 0.99) 88.75%)',
    backdropFilter: 'blur(1.5px)',
  },
  fadeRight: {
    right: 0,
    background: 'linear-gradient(90deg, rgba(247, 247, 242, 0.05) 28.86%, rgba(247, 247, 242, 0.40) 52.82%, rgba(247, 247, 242, 0.99) 88.75%)',
    backdropFilter: 'blur(1.5px)',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transition: 'background-color 0.15s ease, opacity 0.15s ease',
  },
  arrowLeft: {
    left: 0,
  },
  arrowRight: {
    right: 0,
  },
  arrowDisabled: {
    opacity: 0,
    pointerEvents: 'none',
  },
}

const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
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
    width="16"
    height="16"
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

export const FilterChipCarousel = forwardRef<HTMLDivElement, FilterChipCarouselProps>(
  (
    {
      chips,
      activeChipId,
      onChipClick,
      gap = 8,
      showArrows = true,
      className,
      style,
    },
    ref
  ) => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const updateMaxScroll = () => {
        if (trackRef.current && viewportRef.current) {
          const trackWidth = trackRef.current.scrollWidth
          const viewportWidth = viewportRef.current.offsetWidth
          setMaxScroll(Math.max(0, trackWidth - viewportWidth))
        }
      }

      updateMaxScroll()
      window.addEventListener('resize', updateMaxScroll)
      return () => window.removeEventListener('resize', updateMaxScroll)
    }, [chips])

    const canGoBack = scrollPosition > 0
    const canGoForward = scrollPosition < maxScroll

    const scrollBy = (amount: number) => {
      setScrollPosition((prev) => {
        const newPosition = prev + amount
        return Math.max(0, Math.min(maxScroll, newPosition))
      })
    }

    const goBack = () => scrollBy(-200)
    const goForward = () => scrollBy(200)

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...styles.container, ...style }}
        data-component="filter-chip-carousel"
      >
        {/* Left Arrow */}
        {showArrows && (
          <button
            style={{
              ...styles.arrowButton,
              ...styles.arrowLeft,
              ...(canGoBack ? {} : styles.arrowDisabled),
            }}
            onClick={goBack}
            disabled={!canGoBack}
            aria-label="Scroll left"
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
        )}

        {/* Viewport */}
        <div 
          ref={viewportRef} 
          style={{
            ...styles.viewport,
            paddingRight: showArrows ? 40 : 0,
          }}
        >
          {/* Left fade overlay */}
          <div
            style={{
              ...styles.fadeOverlay,
              ...styles.fadeLeft,
              opacity: canGoBack ? 1 : 0,
            }}
          />
          
          <div
            ref={trackRef}
            style={{
              ...styles.track,
              gap,
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {chips.map((chip) => (
              <FilterChip
                key={chip.id}
                label={chip.label}
                icon={chip.icon}
                isActive={chip.id === activeChipId}
                onClick={() => onChipClick?.(chip)}
              />
            ))}
          </div>
          
          {/* Right fade overlay */}
          <div
            style={{
              ...styles.fadeOverlay,
              ...styles.fadeRight,
              opacity: canGoForward ? 1 : 0,
            }}
          />
        </div>

        {/* Right Arrow */}
        {showArrows && (
          <button
            style={{
              ...styles.arrowButton,
              ...styles.arrowRight,
              ...(canGoForward ? {} : styles.arrowDisabled),
            }}
            onClick={goForward}
            disabled={!canGoForward}
            aria-label="Scroll right"
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
        )}
      </div>
    )
  }
)

FilterChipCarousel.displayName = 'FilterChipCarousel'
