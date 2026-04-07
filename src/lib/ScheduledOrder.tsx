import { CSSProperties, forwardRef, useState, useEffect } from 'react'

export interface ScheduledOrderProps {
  /** Whether this is an active/in-progress order */
  isActive?: boolean
  /** Date label (e.g., "Weds, 3/17") - shown for default state */
  dateLabel?: string
  /** Meal name */
  mealName: string
  /** Restaurant name */
  restaurant: string
  /** Order status (e.g., "Order en route") - shown for active state */
  status?: string
  /** Item count - shown for active state */
  itemCount?: number
  /** ETA time (e.g., "12:00pm") - shown for active state */
  eta?: string
  /** Avatar image URL */
  avatarUrl?: string
  /** Progress percentage (0-100) - shown for active state */
  progress?: number
  /** Whether to hide the progress bar (useful when parent handles it) */
  hideProgress?: boolean
  /** Whether to show bottom border */
  showBorder?: boolean
  /** Whether to highlight this item (for newly added orders) */
  isHighlighted?: boolean
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 12,
    position: 'relative',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  containerWithBorder: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.24)',
  },
  labelRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: '#F97051',
    flexShrink: 0,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: 'rgba(250, 247, 240, 0.63)',
    margin: 0,
  },
  activeLabel: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#FAF7F0',
    margin: 0,
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: 'rgba(250, 247, 240, 0.9)',
    margin: 0,
  },
  activeMealName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#FAF7F0',
    margin: 0,
  },
  restaurant: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: 'rgba(250, 247, 240, 0.63)',
    margin: 0,
  },
  activeDetails: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: 'rgba(250, 247, 240, 0.63)',
    margin: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flexShrink: 0,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#F74C25',
    transition: 'width 0.3s ease',
  },
  highlighted: {
    background: 'radial-gradient(circle at 47% 50%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
    transition: 'background 0.3s ease-out',
  },
  highlightFading: {
    background: 'radial-gradient(circle at 47% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)',
    transition: 'background 0.3s ease-out',
  },
}

export const ScheduledOrder = forwardRef<HTMLDivElement, ScheduledOrderProps>(
  (
    {
      isActive = false,
      dateLabel,
      mealName,
      restaurant,
      status,
      itemCount,
      eta,
      avatarUrl,
      progress = 0,
      hideProgress = false,
      showBorder = false,
      isHighlighted = false,
      className,
      style,
    },
    ref
  ) => {
    const [showHighlight, setShowHighlight] = useState(false)
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {
      if (isHighlighted) {
        setShowHighlight(true)
        setIsFading(false)
        
        const fadeTimer = setTimeout(() => {
          setIsFading(true)
        }, 400)

        const removeTimer = setTimeout(() => {
          setShowHighlight(false)
          setIsFading(false)
        }, 700)

        return () => {
          clearTimeout(fadeTimer)
          clearTimeout(removeTimer)
        }
      }
    }, [isHighlighted])

    const detailsText = isActive && itemCount && eta
      ? `${restaurant} · ${itemCount} item${itemCount !== 1 ? 's' : ''} · ETA ${eta}`
      : restaurant

    const highlightStyle = showHighlight 
      ? (isFading ? styles.highlightFading : styles.highlighted)
      : {}

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...styles.container,
          ...(showBorder && !isActive ? styles.containerWithBorder : {}),
          ...highlightStyle,
          ...style,
        }}
        data-component="scheduled-order"
      >
        {/* Label Row */}
        <div style={styles.labelRow}>
          {isActive && <div style={styles.activeDot} />}
          <span style={isActive ? styles.activeLabel : styles.dateLabel}>
            {isActive ? 'Today' : dateLabel}
          </span>
        </div>

        {/* Content Row */}
        <div style={styles.contentRow}>
          <div style={styles.textContent}>
            <span style={isActive ? styles.activeMealName : styles.mealName}>
              {isActive && status ? status : mealName}
            </span>
            <span style={isActive ? styles.activeDetails : styles.restaurant}>
              {detailsText}
            </span>
          </div>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" style={styles.avatar} />
          ) : (
            <div style={styles.avatarPlaceholder} />
          )}
        </div>

        {/* Progress Bar (Active state only, unless hidden) */}
        {isActive && !hideProgress && (
          <div style={styles.progressContainer}>
            <div style={{ ...styles.progressBar, width: `${Math.min(100, Math.max(0, progress))}%` }} />
          </div>
        )}
      </div>
    )
  }
)

ScheduledOrder.displayName = 'ScheduledOrder'
