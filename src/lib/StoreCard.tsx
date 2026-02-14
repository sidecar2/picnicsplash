import { CSSProperties, forwardRef } from 'react'

export interface StoreCardProps {
  /** URL of the store/food image */
  imageUrl: string
  /** Name of the store */
  storeName: string
  /** Store category/cuisine (e.g., "Sandwiches, Wraps") */
  category: string
  /** URL of the store logo */
  logoUrl?: string
  /** Whether to show the logo */
  showLogo?: boolean
  /** Optional promotional badge text (e.g., "Picnic Debut", "1 order left") */
  badgeText?: string
  /** Badge background color */
  badgeColor?: string
  /** Callback when the card is clicked */
  onClick?: () => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: 16,
    cursor: 'pointer',
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
    height: 158,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 8,
    transition: 'transform 0.3s ease',
  },
  logo: {
    position: 'absolute',
    left: 8,
    top: 108,
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
    gap: 4,
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
  dataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
  },
  storeName: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '18px',
    letterSpacing: -0.0288,
    color: '#141414',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    margin: 0,
  },
  category: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: -0.0126,
    color: '#6c6c6c',
    whiteSpace: 'nowrap',
  },
}

export const StoreCard = forwardRef<HTMLDivElement, StoreCardProps>(
  (
    {
      imageUrl,
      storeName,
      category,
      logoUrl,
      showLogo = true,
      badgeText,
      badgeColor = '#df5234',
      onClick,
      className,
      style,
    },
    ref
  ) => {

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...styles.card, ...style }}
        onClick={onClick}
        data-component="store-card"
      >
        <div style={styles.content}>
          {/* Photo Container */}
          <div
            style={styles.photoContainer}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img:first-child') as HTMLImageElement
              if (img) img.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img:first-child') as HTMLImageElement
              if (img) img.style.transform = 'scale(1)'
            }}
          >
            <img
              src={imageUrl}
              alt={storeName}
              style={styles.image}
            />

            {/* Logo */}
            {showLogo && logoUrl && (
              <div style={styles.logo}>
                <img
                  src={logoUrl}
                  alt={`${storeName} logo`}
                  style={styles.logoImage}
                />
              </div>
            )}

            {/* Badge */}
            {badgeText && (
              <div style={{ ...styles.badge, backgroundColor: badgeColor }}>
                <span style={styles.badgeText}>{badgeText}</span>
              </div>
            )}
          </div>

          {/* Data Section */}
          <div style={styles.dataContainer}>
            {/* Store Name */}
            <p style={styles.storeName}>{storeName}</p>

            {/* Category */}
            <span style={styles.category}>{category}</span>
          </div>
        </div>
      </div>
    )
  }
)

StoreCard.displayName = 'StoreCard'
