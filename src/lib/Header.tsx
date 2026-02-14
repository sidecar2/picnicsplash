import { CSSProperties, forwardRef, useState, useEffect, useRef } from 'react'

export interface HeaderProps {
  /** Logo image URL or element */
  logoUrl?: string
  /** Location/office name */
  locationName?: string
  /** Order timing text (e.g., "Today, Lunch") */
  orderTiming?: string
  /** Countdown timer text (e.g., "3hr 13m") */
  countdownText?: string
  /** Number of items in basket */
  basketCount?: number
  /** Callback when logo is clicked */
  onLogoClick?: () => void
  /** Callback when location button is clicked */
  onLocationClick?: () => void
  /** Callback when Team order is clicked */
  onTeamOrderClick?: () => void
  /** Callback when Basket is clicked */
  onBasketClick?: () => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#F7F7F2',
    borderBottom: '1px solid rgba(136, 103, 79, 0.1)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 100px',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },
  secondaryRow: {
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 100px',
    width: '100%',
    boxSizing: 'border-box',
    borderTop: '1px solid rgba(136, 103, 79, 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    zIndex: 1,
  },
  logo: {
    height: 28,
    cursor: 'pointer',
  },
  centerSection: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    maxWidth: '50vw',
  },
  locationButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '0 0 0 8px',
    height: 40,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    minWidth: 0,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  locationText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.09%',
    color: '#141414',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 6px',
    backgroundColor: 'rgba(26, 26, 26, 0.08)',
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    color: '#3D3D3D',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    zIndex: 1,
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 8,
    transition: 'background-color 0.15s ease',
  },
  teamOrderButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background-color 0.15s ease',
  },
  basketButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    backgroundColor: 'rgba(143, 143, 143, 0.3)',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background-color 0.15s ease',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '-0.18%',
  },
  teamOrderLabel: {
    color: '#000000',
  },
  basketLabel: {
    color: '#6C6C6C',
  },
}

// Icons
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 1.33334C5.42 1.33334 3.33333 3.42001 3.33333 6.00001C3.33333 9.50001 8 14.6667 8 14.6667C8 14.6667 12.6667 9.50001 12.6667 6.00001C12.6667 3.42001 10.58 1.33334 8 1.33334ZM8 7.66668C7.08 7.66668 6.33333 6.92001 6.33333 6.00001C6.33333 5.08001 7.08 4.33334 8 4.33334C8.92 4.33334 9.66667 5.08001 9.66667 6.00001C9.66667 6.92001 8.92 7.66668 8 7.66668Z"
      fill="#141414"
    />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.99333 1.33334C4.31333 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.31333 14.6667 7.99333 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 7.99333 1.33334ZM8 13.3333C5.05333 13.3333 2.66667 10.9467 2.66667 8.00001C2.66667 5.05334 5.05333 2.66668 8 2.66668C10.9467 2.66668 13.3333 5.05334 13.3333 8.00001C13.3333 10.9467 10.9467 13.3333 8 13.3333ZM8.33333 4.66668H7.33333V8.66668L10.8333 10.7667L11.3333 9.94668L8.33333 8.16668V4.66668Z"
      fill="#3D3D3D"
    />
  </svg>
)

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 10C13.88 10 14.99 8.88 14.99 7.5C14.99 6.12 13.88 5 12.5 5C11.12 5 10 6.12 10 7.5C10 8.88 11.12 10 12.5 10ZM6.25 8.75V6.25H4.58333V8.75H2.08333V10.4167H4.58333V12.9167H6.25V10.4167H8.75V8.75H6.25ZM12.5 11.6667C10.725 11.6667 7.08333 12.5583 7.08333 14.3333V15.8333H17.9167V14.3333C17.9167 12.5583 14.275 11.6667 12.5 11.6667Z"
      fill="#000000"
    />
  </svg>
)

const BasketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8333 6.66667H14.1667C14.1667 4.36667 12.3 2.5 10 2.5C7.7 2.5 5.83333 4.36667 5.83333 6.66667H4.16667C3.25 6.66667 2.5 7.41667 2.5 8.33333V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V8.33333C17.5 7.41667 16.75 6.66667 15.8333 6.66667ZM10 4.16667C11.3833 4.16667 12.5 5.28333 12.5 6.66667H7.5C7.5 5.28333 8.61667 4.16667 10 4.16667ZM15.8333 15.8333H4.16667V8.33333H15.8333V15.8333ZM10 10C8.61667 10 7.5 11.1167 7.5 12.5C7.5 13.8833 8.61667 15 10 15C11.3833 15 12.5 13.8833 12.5 12.5C12.5 11.1167 11.3833 10 10 10Z"
      fill="#6C6C6C"
    />
  </svg>
)

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.1292 11.8792H12.4709L12.2375 11.6542C13.0542 10.7042 13.5459 9.47084 13.5459 8.12918C13.5459 5.13751 11.1209 2.71251 8.12919 2.71251C5.13752 2.71251 2.71252 5.13751 2.71252 8.12918C2.71252 11.1208 5.13752 13.5458 8.12919 13.5458C9.47085 13.5458 10.7042 13.0542 11.6542 12.2375L11.8792 12.4708V13.1292L16.0459 17.2875L17.2875 16.0458L13.1292 11.8792ZM8.12919 11.8792C6.05419 11.8792 4.37919 10.2042 4.37919 8.12918C4.37919 6.05418 6.05419 4.37918 8.12919 4.37918C10.2042 4.37918 11.8792 6.05418 11.8792 8.12918C11.8792 10.2042 10.2042 11.8792 8.12919 11.8792Z"
      fill="#141414"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.94 5.72668L8 8.78002L11.06 5.72668L12 6.66668L8 10.6667L4 6.66668L4.94 5.72668Z"
      fill="#141414"
    />
  </svg>
)

const DefaultLogo = () => (
  <svg width="87" height="28" viewBox="0 0 87 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="87" height="28" rx="4" fill="#F74C25" />
    <text x="43.5" y="18" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">
      LOGO
    </text>
  </svg>
)

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      logoUrl,
      locationName = 'Location',
      orderTiming = 'Today, Lunch',
      countdownText,
      basketCount,
      onLogoClick,
      onLocationClick,
      onTeamOrderClick,
      onBasketClick,
      className,
      style,
    },
    ref
  ) => {
    const [isStacked, setIsStacked] = useState(false)
    const centerRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const checkOverlap = () => {
        if (centerRef.current && rightRef.current) {
          const centerRect = centerRef.current.getBoundingClientRect()
          const rightRect = rightRef.current.getBoundingClientRect()
          // Check if center section's right edge overlaps with right section's left edge
          const hasOverlap = centerRect.right > rightRect.left - 16 // 16px buffer
          setIsStacked(hasOverlap)
        }
      }

      checkOverlap()
      window.addEventListener('resize', checkOverlap)
      return () => window.removeEventListener('resize', checkOverlap)
    }, [locationName, orderTiming, countdownText])

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...styles.headerWrapper, ...style }}
        data-component="header"
      >
        {/* Primary Row */}
        <header style={styles.header} data-header-row="primary">
          {/* Left Section - Logo */}
          <div style={styles.leftSection}>
            <div style={styles.logo} onClick={onLogoClick}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ height: '100%' }} />
              ) : (
                <DefaultLogo />
              )}
            </div>
          </div>

          {/* Center Section - Location & Timer (hidden when stacked) */}
          <div 
            ref={centerRef}
            style={{ 
              ...styles.centerSection,
              visibility: isStacked ? 'hidden' : 'visible',
            }} 
            data-header-center>
            <button
              style={styles.locationButton}
              onClick={onLocationClick}
            >
              <LocationIcon />
              <span style={styles.locationText}>
                {locationName} · {orderTiming}
              </span>
              <ChevronDownIcon />
            </button>
            
            {countdownText && (
              <div style={styles.statusBadge}>
                <ClockIcon />
                <span style={styles.statusText}>{countdownText}</span>
              </div>
            )}
          </div>

          {/* Right Section - Actions */}
          <div ref={rightRef} style={styles.rightSection}>
            <button
              style={styles.iconButton}
              aria-label="Search"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <SearchIcon />
            </button>
            
            <button
              style={styles.teamOrderButton}
              onClick={onTeamOrderClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <GroupIcon />
              <span style={{ ...styles.buttonLabel, ...styles.teamOrderLabel }}>
                Team order
              </span>
            </button>
            
            <button
              style={styles.basketButton}
              onClick={onBasketClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(143, 143, 143, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(143, 143, 143, 0.3)'
              }}
            >
              <BasketIcon />
              <span style={{ ...styles.buttonLabel, ...styles.basketLabel }}>
                {basketCount !== undefined ? `Basket (${basketCount})` : 'Basket'}
              </span>
            </button>
          </div>
        </header>

        {/* Secondary Row - Location info (visible when stacked) */}
        <div 
          style={{ 
            ...styles.secondaryRow,
            display: isStacked ? 'flex' : 'none',
          }} 
          data-header-row="secondary"
        >
          <button
            style={styles.locationButton}
            onClick={onLocationClick}
          >
            <LocationIcon />
            <span style={styles.locationText}>
              {locationName} · {orderTiming}
            </span>
            <ChevronDownIcon />
          </button>
          
          {countdownText && (
            <div style={styles.statusBadge}>
              <ClockIcon />
              <span style={styles.statusText}>{countdownText}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Header.displayName = 'Header'
