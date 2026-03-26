import { CSSProperties, forwardRef } from 'react'

export interface WeekOption {
  /** Unique identifier */
  id: string | number
  /** Display label (e.g., "April 21-25") */
  label: string
}

export interface WeekSelectorProps {
  /** List of week options */
  weeks: WeekOption[]
  /** Currently selected week ID */
  selectedWeekId?: string | number
  /** Callback when a week is selected */
  onSelectWeek?: (week: WeekOption) => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  pill: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    padding: '12px 24px',
    borderRadius: 28,
    border: '1px solid #CFC9C0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  pillActive: {
    backgroundColor: '#292929',
    border: '1px solid rgba(247, 76, 37, 0.2)',
  },
  pillText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.05em',
    color: '#1F1812',
    margin: 0,
  },
  pillTextActive: {
    color: '#FAF7F0',
  },
}

export const WeekSelector = forwardRef<HTMLDivElement, WeekSelectorProps>(
  (
    {
      weeks,
      selectedWeekId,
      onSelectWeek,
      className,
      style,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...styles.container,
          ...style,
        }}
        data-component="week-selector"
      >
        {weeks.map((week) => {
          const isActive = week.id === selectedWeekId
          return (
            <button
              key={week.id}
              style={{
                ...styles.pill,
                ...(isActive ? styles.pillActive : {}),
              }}
              onClick={() => onSelectWeek?.(week)}
            >
              <span
                style={{
                  ...styles.pillText,
                  ...(isActive ? styles.pillTextActive : {}),
                }}
              >
                {week.label}
              </span>
            </button>
          )
        })}
      </div>
    )
  }
)

WeekSelector.displayName = 'WeekSelector'
