import { CSSProperties, forwardRef } from 'react'

export interface FilterChipProps {
  /** Label text for the chip */
  label: string
  /** Icon URL or emoji to display */
  icon?: string
  /** Whether the chip is currently active/selected */
  isActive?: boolean
  /** Callback when chip is clicked */
  onClick?: () => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 9999,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    color: '#141414',
    whiteSpace: 'nowrap',
    transition: 'none',
    userSelect: 'none',
    outline: 'none',
    boxShadow: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  chipInactive: {
    backgroundColor: 'transparent',
    borderColor: '#e0e0e0',
    color: '#141414',
  },
  chipActive: {
    backgroundColor: '#141414',
    borderColor: '#141414',
    color: 'white',
  },
  icon: {
    width: 20,
    height: 20,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconImage: {
    width: 20,
    height: 20,
    objectFit: 'cover',
    borderRadius: 4,
  },
}

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      label,
      icon,
      isActive = false,
      onClick,
      className,
      style,
    },
    ref
  ) => {
    const isEmoji = icon && !icon.startsWith('http') && !icon.startsWith('/')
    
    return (
      <button
        ref={ref}
        className={className}
        style={{
          ...styles.chip,
          ...(isActive ? styles.chipActive : styles.chipInactive),
          ...style,
        }}
        onClick={onClick}
        data-component="filter-chip"
        data-active={isActive}
      >
        {icon && (
          <span style={styles.icon}>
            {isEmoji ? (
              icon
            ) : (
              <img src={icon} alt="" style={styles.iconImage} />
            )}
          </span>
        )}
        {label}
      </button>
    )
  }
)

FilterChip.displayName = 'FilterChip'
