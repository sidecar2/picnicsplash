import { CSSProperties, forwardRef, useRef, useState, useEffect } from 'react'
import { ItemCard, ItemCardProps } from './ItemCard'

export interface ItemCarouselItem extends Omit<ItemCardProps, 'onClick' | 'onFavorite'> {
  /** Unique identifier for the item */
  id: string | number
}

export interface ItemCarouselProps {
  /** Title displayed above the carousel */
  title?: string
  /** Array of items to display in the carousel */
  items: ItemCarouselItem[]
  /** Number of items visible at once (default: 5) */
  visibleCount?: number
  /** Gap between items in pixels (default: 16) */
  gap?: number
  /** Callback when an item is clicked */
  onItemClick?: (item: ItemCarouselItem) => void
  /** Callback when an item's favorite button is clicked */
  onItemFavorite?: (item: ItemCarouselItem) => void
  /** Set of favorited item IDs */
  favoritedIds?: Set<string | number>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontFamily: "'P22 Mackinac Pro', serif",
    fontSize: 24,
    fontWeight: 500,
    color: '#141414',
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
  itemWrapper: {
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

export const ItemCarousel = forwardRef<HTMLDivElement, ItemCarouselProps>(
  (
    {
      title,
      items,
      visibleCount = 5,
      gap = 16,
      onItemClick,
      onItemFavorite,
      favoritedIds = new Set(),
      showArrows = true,
      className,
      style,
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemWidth, setItemWidth] = useState(180)
    const containerRef = useRef<HTMLDivElement>(null)

    // Calculate item width based on container width and visible count
    useEffect(() => {
      const updateItemWidth = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth
          const totalGap = gap * (visibleCount - 1)
          const calculatedWidth = (containerWidth - totalGap) / visibleCount
          setItemWidth(Math.floor(calculatedWidth))
        }
      }

      updateItemWidth()
      window.addEventListener('resize', updateItemWidth)
      return () => window.removeEventListener('resize', updateItemWidth)
    }, [gap, visibleCount])

    const maxIndex = Math.max(0, items.length - visibleCount)
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

    const translateX = -(currentIndex * (itemWidth + gap))

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...styles.container, ...style }}
        data-component="item-carousel"
      >
        {/* Header with Title and Navigation */}
        {(title || (showArrows && items.length > visibleCount)) && (
          <div style={styles.header}>
            {title && <h2 style={styles.title}>{title}</h2>}
            {!title && <div />}
            {showArrows && items.length > visibleCount && (
              <div style={styles.navButtons}>
                <button
                  style={{
                    ...styles.arrowButton,
                    ...(canGoBack ? {} : styles.arrowDisabled),
                  }}
                  onClick={goBack}
                  disabled={!canGoBack}
                  aria-label="Previous items"
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
                  aria-label="Next items"
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
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.itemWrapper,
                  width: itemWidth,
                }}
              >
                <ItemCard
                  imageUrl={item.imageUrl}
                  restaurantLogo={item.restaurantLogo}
                  restaurantName={item.restaurantName}
                  dishName={item.dishName}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  discount={item.discount}
                  badgeText={item.badgeText}
                  badgeColor={item.badgeColor}
                  currency={item.currency}
                  isFavorited={favoritedIds.has(item.id)}
                  onFavorite={() => onItemFavorite?.(item)}
                  onClick={() => onItemClick?.(item)}
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

ItemCarousel.displayName = 'ItemCarousel'
