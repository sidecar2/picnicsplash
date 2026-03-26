import { CSSProperties, forwardRef } from 'react'

export interface MealData {
  /** Restaurant/brand name */
  restaurantName: string
  /** Restaurant logo URL */
  restaurantLogo?: string
  /** Dish name */
  dishName: string
  /** Optional description/ingredients */
  description?: string
  /** Price */
  price: number
  /** Food image URL */
  imageUrl?: string
}

export interface DayCardProps {
  /** Day abbreviation (e.g., "Mon", "Tue") */
  day: string
  /** Date string (e.g., "4/21") */
  date: string
  /** Whether this day has a meal scheduled */
  hasMeal?: boolean
  /** Meal data (required if hasMeal is true) */
  meal?: MealData
  /** Stipend amount (e.g., 15.00) - shows stipend banner if provided */
  stipendAmount?: number
  /** Whether this is the active/today card */
  isActive?: boolean
  /** Callback when Edit is clicked */
  onEdit?: () => void
  /** Callback when Add meal is clicked */
  onAddMeal?: () => void
  /** Callback when card is clicked */
  onClick?: () => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFC',
    borderRadius: 8,
    border: '1px solid rgba(136, 103, 79, 0.12)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    flex: 1,
    minWidth: 200,
    height: 280,
    boxSizing: 'border-box',
  },
  topContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 530,
    lineHeight: '20px',
    letterSpacing: '-0.05em',
    color: '#433D36',
    margin: 0,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '-0.05em',
    color: '#433D36',
    margin: 0,
  },
  editText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#3D3D3D',
    margin: 0,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'inherit',
  },
  imageContainer: {
    width: '100%',
    height: 112,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  brandRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandLogo: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    objectFit: 'cover',
    backgroundColor: '#E0E0E0',
  },
  brandName: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '0.01em',
    color: '#606060',
    margin: 0,
  },
  dishName: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#3D3D3D',
    margin: 0,
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '0.01em',
    color: '#606060',
    margin: 0,
  },
  price: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#433D36',
    margin: 0,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingTop: 12,
  },
  stipendBadge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 4,
  },
  stipendIcon: {
    width: 16,
    height: 16,
  },
  stipendText: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '14px',
    letterSpacing: '0.01em',
    color: '#2A7E3D',
    margin: 0,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  addMealButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  addIcon: {
    width: 24,
    height: 24,
  },
  addMealText: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#433D36',
    margin: 0,
  },
}

const TicketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 6.66667V4.66667C13.3333 4.3 13.0333 4 12.6667 4H3.33333C2.96667 4 2.66667 4.3 2.66667 4.66667V6.66667C3.4 6.66667 4 7.26667 4 8C4 8.73333 3.4 9.33333 2.66667 9.33333V11.3333C2.66667 11.7 2.96667 12 3.33333 12H12.6667C13.0333 12 13.3333 11.7 13.3333 11.3333V9.33333C12.6 9.33333 12 8.73333 12 8C12 7.26667 12.6 6.66667 13.3333 6.66667ZM12 5.33333V6.06667C11.2867 6.42 10.78 7.14667 10.78 8C10.78 8.85333 11.2867 9.58 12 9.93333V10.6667H4V9.93333C4.71333 9.58 5.22 8.85333 5.22 8C5.22 7.14 4.72 6.42 4 6.06V5.33333H12Z"
      fill="#2A7E3D"
    />
  </svg>
)

const AddIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
      fill="#433D36"
    />
  </svg>
)

export const DayCard = forwardRef<HTMLDivElement, DayCardProps>(
  (
    {
      day,
      date,
      hasMeal = false,
      meal,
      stipendAmount,
      isActive = false,
      onEdit,
      onAddMeal,
      onClick,
      className,
      style,
    },
    ref
  ) => {
    const formatPrice = (price: number) => {
      return `$${price.toFixed(2)}`
    }

    const formatStipend = (amount: number) => {
      return `$${amount.toFixed(2)} Stipend`
    }

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...styles.card,
          ...style,
        }}
        onClick={onClick}
        data-component="day-card"
      >
        {/* Header with day/date */}
        <div style={styles.header}>
          <div style={styles.dateContainer}>
            <span style={styles.dayText}>{day}</span>
            <span style={styles.dateText}>{date}</span>
          </div>
          {hasMeal && meal && (
            <button
              style={styles.editText}
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.()
              }}
            >
              Edit
            </button>
          )}
        </div>

        {hasMeal && meal ? (
          <>
            {/* Meal content */}
            <div style={styles.topContent}>
              {/* Food image */}
              {meal.imageUrl && (
                <div style={styles.imageContainer}>
                  <img src={meal.imageUrl} alt={meal.dishName} style={styles.image} />
                </div>
              )}

              {/* Meal data */}
              <div style={styles.dataContainer}>
                <div style={styles.brandRow}>
                  {meal.restaurantLogo && (
                    <img src={meal.restaurantLogo} alt="" style={styles.brandLogo} />
                  )}
                  <span style={styles.brandName}>{meal.restaurantName}</span>
                </div>
                <span style={styles.dishName}>{meal.dishName}</span>
                {meal.description && (
                  <span style={styles.description}>{meal.description}</span>
                )}
                <span style={styles.price}>{formatPrice(meal.price)}</span>
              </div>
            </div>

            {/* Stipend badge */}
            {stipendAmount && stipendAmount > 0 && (
              <div style={styles.messageContainer}>
                <div style={styles.stipendBadge}>
                  <TicketIcon />
                  <span style={styles.stipendText}>{formatStipend(stipendAmount)}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty state - Add meal */
          <div style={styles.emptyState}>
            <button
              style={styles.addMealButton}
              onClick={(e) => {
                e.stopPropagation()
                onAddMeal?.()
              }}
            >
              <AddIcon />
              <span style={styles.addMealText}>Add meal</span>
            </button>
          </div>
        )}
      </div>
    )
  }
)

DayCard.displayName = 'DayCard'
