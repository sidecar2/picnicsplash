import { CSSProperties, forwardRef } from 'react'

export interface ItemCardProps {
  /** URL of the food/dish image */
  imageUrl: string
  /** URL of the restaurant logo */
  restaurantLogo: string
  /** Name of the restaurant */
  restaurantName: string
  /** Name of the dish */
  dishName: string
  /** Price of the dish (discounted price if discount is true) */
  price: number
  /** Original price before discount (required when discount is true) */
  originalPrice?: number
  /** Whether to show discount styling (teal badge, strikethrough original price) */
  discount?: boolean
  /** Optional promotional badge text (e.g., "Today only", "1 order left", "$2 off") */
  badgeText?: string
  /** Badge background color (defaults to teal when discount is true) */
  badgeColor?: string
  /** Currency symbol to display */
  currency?: string
  /** Whether the item is favorited */
  isFavorited?: boolean
  /** Whether to show the favorite/add button */
  showFavoriteButton?: boolean
  /** Callback when favorite button is clicked */
  onFavorite?: () => void
  /** Callback when the card is clicked */
  onClick?: () => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  card: {
    width: 180,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
    position: 'relative',
  },
  photoContainer: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#df5234',
    padding: '4px 8px',
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badgeText: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: '16px',
    letterSpacing: -0.7,
    color: 'white',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 12,
    top: 96,
    width: 36,
    height: 36,
    backgroundColor: 'white',
    border: 'none',
    borderRadius: 8,
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  data: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
  },
  restaurant: {
    width: '100%',
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  restaurantLogo: {
    width: 16,
    height: 16,
    borderRadius: 12,
    border: '1px solid white',
    objectFit: 'cover',
  },
  restaurantName: {
    flex: 1,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '14px',
    letterSpacing: 0.024,
    color: '#6c6c6c',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: 0,
  },
  dishName: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: -0.0126,
    color: '#141414',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,
  },
  price: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: -0.7,
    color: '#6C6C6C',
    margin: 0,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  originalPrice: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: -0.7,
    color: '#6c6c6c',
    margin: 0,
    textDecoration: 'line-through',
  },
  separator: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    color: '#6c6c6c',
  },
  discountPrice: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: -0.7,
    color: '#00796b',
    margin: 0,
  },
}

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4V16M4 10H16"
      stroke="#141414"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DISCOUNT_COLOR = '#00796b'
const BLACK_BADGE_COLOR = '#141414'

// Export badge color constants for easy reference
export const ITEM_CARD_BADGE_COLORS = {
  default: '#df5234',
  discount: DISCOUNT_COLOR,
  black: BLACK_BADGE_COLOR,
} as const

export const ItemCard = forwardRef<HTMLDivElement, ItemCardProps>(
  (
    {
      imageUrl,
      restaurantLogo,
      restaurantName,
      dishName,
      price,
      originalPrice,
      discount = false,
      badgeText,
      badgeColor,
      currency = '$',
      isFavorited = false,
      showFavoriteButton = true,
      onFavorite,
      onClick,
      className,
      style,
    },
    ref
  ) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      onFavorite?.()
    }

    // Use teal color for discount badges, otherwise use provided color or default orange
    const effectiveBadgeColor = badgeColor ?? (discount ? DISCOUNT_COLOR : '#df5234')

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...styles.card, ...style }}
        data-component="item-card"
      >
        <div style={styles.content}>
          {/* Photo Container */}
          <div
            style={styles.photoContainer}
            onClick={onClick}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1)'
            }}
          >
            <img
              src={imageUrl}
              alt={dishName}
              style={styles.image}
            />

            {/* Badge */}
            {badgeText && (
              <div style={{ ...styles.badge, backgroundColor: effectiveBadgeColor }}>
                <span style={styles.badgeText}>{badgeText}</span>
              </div>
            )}

            {/* Add Button */}
            {showFavoriteButton && (
              <button
                style={styles.favoriteBtn}
                onClick={handleFavoriteClick}
                aria-label="Add to cart"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <PlusIcon />
              </button>
            )}
          </div>

          {/* Data Section */}
          <div style={styles.data}>
            {/* Restaurant Info */}
            <div style={styles.restaurant}>
              <img
                src={restaurantLogo}
                alt={restaurantName}
                style={styles.restaurantLogo}
              />
              <span style={styles.restaurantName}>{restaurantName}</span>
            </div>

            {/* Dish Name */}
            <p style={styles.dishName}>{dishName}</p>

            {/* Price */}
            {discount && originalPrice ? (
              <div style={styles.priceContainer}>
                <span style={styles.originalPrice}>
                  {currency}{originalPrice.toFixed(2)}
                </span>
                <span style={styles.separator}>·</span>
                <span style={styles.discountPrice}>
                  {currency}{price.toFixed(2)}
                </span>
              </div>
            ) : (
              <p style={styles.price}>
                {currency}
                {price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
)

ItemCard.displayName = 'ItemCard'
