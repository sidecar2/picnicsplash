import { CSSProperties, forwardRef } from 'react'
import { ScheduledOrder } from './ScheduledOrder'
import type { ScheduledOrderProps } from './ScheduledOrder'

export interface ScheduledOrderItem {
  /** Unique identifier */
  id: string | number
  /** Date label (e.g., "Weds, 3/17") */
  dateLabel: string
  /** Meal name */
  mealName: string
  /** Restaurant name */
  restaurant: string
  /** Avatar image URL */
  avatarUrl?: string
}

export interface ActiveOrderData {
  /** Order status text (e.g., "Order en route") */
  status: string
  /** Restaurant name */
  restaurant: string
  /** Number of items */
  itemCount: number
  /** Estimated time of arrival */
  eta: string
  /** Avatar image URL */
  avatarUrl?: string
  /** Progress percentage (0-100) */
  progress?: number
}

export interface FloatingPanelProps {
  /** Number of upcoming orders */
  upcomingCount: number
  /** Active order details (when provided, shows active order state) */
  activeOrder?: ActiveOrderData
  /** List of scheduled orders to display when expanded */
  scheduledOrders?: ScheduledOrderItem[]
  /** Whether the panel is expanded */
  isExpanded?: boolean
  /** Callback when expand/collapse is toggled */
  onToggle?: () => void
  /** Callback when the panel is clicked */
  onClick?: () => void
  /** Callback when "View rotation" is clicked */
  onViewRotation?: () => void
  /** ID of an order to highlight (for newly added items) */
  highlightedOrderId?: string | number | null
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 368,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: '24px 24px 0 0',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.11)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: 'hidden',
    position: 'relative',
  },
  panelExpanded: {
    boxShadow: '0px 4px 28px 0px rgba(0, 0, 0, 0.22)',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: '16px 20px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.05em',
    color: '#EFEBE5',
    margin: 0,
    fontVariantNumeric: 'lining-nums tabular-nums',
  },
  toggleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  collapsedActiveSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch',
    alignItems: 'center',
    gap: 8,
    padding: '8px 20px 0',
    boxShadow: '0px 4px 28px 0px rgba(0, 0, 0, 0.22)',
    borderRadius: '20px 20px 0 0',
  },
  listSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '8px 20px',
    boxShadow: '0px 4px 28px 0px rgba(0, 0, 0, 0.22)',
    borderRadius: '20px 20px 0 0',
  },
  listSectionWithActive: {
    padding: '8px 20px 16px',
    boxShadow: 'none',
    borderRadius: 0,
  },
  viewRotationLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: '12px 0',
  },
  viewRotationText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '-0.0018em',
    color: '#FAF7F0',
    margin: 0,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#F74C25',
    transition: 'width 0.3s ease',
  },
}

const AutoModeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_automode)">
      <path
        d="M11.2917 11.2915L10.375 13.3332C10.3056 13.4998 10.1806 13.5832 10 13.5832C9.81944 13.5832 9.69444 13.4998 9.625 13.3332L8.6875 11.2915L6.66667 10.3748C6.5 10.3054 6.41667 10.1804 6.41667 9.99984C6.41667 9.81928 6.5 9.69428 6.66667 9.62484L8.6875 8.68734L9.625 6.6665C9.69444 6.49984 9.81944 6.4165 10 6.4165C10.1806 6.4165 10.3056 6.49984 10.375 6.6665L11.2917 8.68734L13.3333 9.62484C13.5 9.69428 13.5833 9.81928 13.5833 9.99984C13.5833 10.1804 13.5 10.3054 13.3333 10.3748L11.2917 11.2915ZM15.25 17.4998L16.6667 17.4998C16.9028 17.4998 17.1007 17.5797 17.2604 17.7394C17.4201 17.8991 17.5 18.0971 17.5 18.3332C17.5 18.5693 17.4201 18.7672 17.2604 18.9269C17.1007 19.0866 16.9028 19.1665 16.6667 19.1665L13.3333 19.1665C13.0972 19.1665 12.8993 19.0866 12.7396 18.9269C12.5799 18.7672 12.5 18.5693 12.5 18.3332L12.5 14.9998C12.5 14.7637 12.5799 14.5658 12.7396 14.4061C12.8993 14.2464 13.0972 14.1665 13.3333 14.1665C13.5694 14.1665 13.7674 14.2464 13.9271 14.4061C14.0868 14.5658 14.1667 14.7637 14.1667 14.9998L14.1667 16.2082C15.2083 15.4998 16.0243 14.6005 16.6146 13.5103C17.2049 12.42 17.5 11.2498 17.5 9.99984C17.5 8.55539 17.125 7.23595 16.375 6.0415C15.625 4.84706 14.6181 3.93039 13.3542 3.2915C13.1181 3.1665 12.9306 3.00331 12.7917 2.80192C12.6528 2.60053 12.6111 2.36789 12.6667 2.10401C12.7222 1.85401 12.8646 1.69081 13.0937 1.61442C13.3229 1.53803 13.5694 1.56234 13.8333 1.68734C15.4444 2.43734 16.7361 3.55539 17.7083 5.0415C18.6806 6.52761 19.1667 8.18039 19.1667 9.99984C19.1667 11.4998 18.8229 12.9061 18.1354 14.2186C17.4479 15.5311 16.4861 16.6248 15.25 17.4998ZM9.16667 18.2707C9.16667 18.5068 9.07986 18.6978 8.90625 18.8436C8.73264 18.9894 8.52778 19.0415 8.29167 18.9998C7.63889 18.8609 7.0382 18.6804 6.48958 18.4582C5.94097 18.2359 5.38889 17.9373 4.83333 17.5623C4.625 17.4234 4.50694 17.2429 4.47917 17.0207C4.45139 16.7984 4.52778 16.5971 4.70833 16.4165C4.90278 16.2221 5.11458 16.1248 5.34375 16.1248C5.57292 16.1248 5.80556 16.2012 6.04167 16.354C6.40278 16.5901 6.76389 16.7776 7.125 16.9165C7.48611 17.0554 7.88195 17.1804 8.3125 17.2915C8.5625 17.3471 8.76736 17.4616 8.92708 17.6353C9.08681 17.8089 9.16667 18.0207 9.16667 18.2707ZM1.70833 10.8332C1.97222 10.8332 2.1875 10.913 2.35417 11.0728C2.52083 11.2325 2.63194 11.4443 2.6875 11.7082C2.78472 12.1248 2.90972 12.5103 3.0625 12.8644C3.21528 13.2186 3.40972 13.5762 3.64583 13.9373C3.79861 14.1596 3.86806 14.3853 3.85417 14.6144C3.84028 14.8436 3.73611 15.0554 3.54167 15.2498C3.375 15.4165 3.18403 15.4894 2.96875 15.4686C2.75347 15.4478 2.56944 15.3401 2.41667 15.1457C2.05556 14.604 1.76042 14.0658 1.53125 13.5311C1.30208 12.9964 1.125 12.4026 1 11.7498C0.958334 11.4998 1.00694 11.2846 1.14583 11.104C1.28472 10.9234 1.47222 10.8332 1.70833 10.8332ZM3.54167 4.70817C3.73611 4.90262 3.83681 5.11789 3.84375 5.354C3.85069 5.59012 3.77778 5.81928 3.625 6.0415C3.38889 6.40262 3.20139 6.76373 3.0625 7.12484C2.92361 7.48595 2.79861 7.88178 2.6875 8.31234C2.63194 8.56234 2.51736 8.7672 2.34375 8.92692C2.17014 9.08664 1.95833 9.1665 1.70833 9.1665C1.47222 9.1665 1.28472 9.0797 1.14583 8.90609C1.00694 8.73248 0.958334 8.52762 1 8.2915C1.125 7.62484 1.29861 7.02067 1.52083 6.479C1.74306 5.93734 2.04167 5.38873 2.41667 4.83317C2.55556 4.63873 2.73611 4.52762 2.95833 4.49984C3.18056 4.47206 3.375 4.5415 3.54167 4.70817ZM9.16667 1.70817C9.16667 1.97206 9.08681 2.18734 8.92708 2.35401C8.76736 2.52067 8.55556 2.63178 8.29167 2.68734C7.86111 2.79845 7.46875 2.92692 7.11458 3.07276C6.76042 3.21859 6.39583 3.40956 6.02083 3.64567C5.79861 3.79845 5.57292 3.86789 5.34375 3.854C5.11458 3.84012 4.90278 3.73595 4.70833 3.5415C4.54167 3.37484 4.47222 3.18387 4.5 2.96859C4.52778 2.75331 4.63889 2.56928 4.83333 2.41651C5.38889 2.04151 5.9375 1.74289 6.47917 1.52067C7.02083 1.29845 7.625 1.12484 8.29167 0.999838C8.52778 0.958172 8.73264 1.00678 8.90625 1.14567C9.07986 1.28456 9.16667 1.47206 9.16667 1.70817Z"
        fill="#EFEBE5"
      />
    </g>
    <defs>
      <clipPath id="clip0_automode">
        <rect width="20" height="20" fill="white" transform="translate(0 20) rotate(-90)" />
      </clipPath>
    </defs>
  </svg>
)

const ChevronIcon = ({ isUp }: { isUp: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: isUp ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s ease' }}
  >
    <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" fill="#EFEBE5" />
  </svg>
)

export const FloatingPanel = forwardRef<HTMLDivElement, FloatingPanelProps>(
  (
    {
      upcomingCount,
      activeOrder,
      scheduledOrders = [],
      isExpanded = false,
      onToggle,
      onClick,
      onViewRotation,
      highlightedOrderId,
      className,
      style,
    },
    ref
  ) => {
    const hasActiveOrder = !!activeOrder
    const showCollapsedActive = !isExpanded && hasActiveOrder
    const showExpandedList = isExpanded

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...styles.panel,
          ...(isExpanded || hasActiveOrder ? styles.panelExpanded : {}),
          paddingBottom: isExpanded ? 12 : (hasActiveOrder ? 8 : 4),
          ...style,
        }}
        onClick={onClick}
        data-component="floating-panel"
      >
        {/* Header */}
        <div
          style={{ ...styles.header, cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            onToggle?.()
          }}
        >
          <div style={styles.headerLeft}>
            <AutoModeIcon />
            <span style={styles.headerText}>
              {upcomingCount} upcoming order{upcomingCount !== 1 ? 's' : ''}{' '}
            </span>
          </div>
          <button
            style={styles.toggleButton}
            onClick={(e) => {
              e.stopPropagation()
              onToggle?.()
            }}
            aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
          >
            <ChevronIcon isUp={isExpanded} />
          </button>
        </div>

        {/* Collapsed with Active Order */}
        {showCollapsedActive && activeOrder && (
          <>
            <div style={styles.collapsedActiveSection}>
              <ScheduledOrder
                isActive
                mealName={activeOrder.status}
                restaurant={activeOrder.restaurant}
                status={activeOrder.status}
                itemCount={activeOrder.itemCount}
                eta={activeOrder.eta}
                avatarUrl={activeOrder.avatarUrl}
                hideProgress
                style={{ flex: 1 }}
              />
            </div>
            {/* Progress bar fixed to bottom of panel (4px tall for collapsed state) */}
            <div style={styles.progressContainer}>
              <div style={{ ...styles.progressBar, width: `${Math.min(100, Math.max(0, activeOrder.progress || 0))}%` }} />
            </div>
          </>
        )}

        {/* Expanded List */}
        {showExpandedList && (
          <div style={{
            ...styles.listSection,
            ...(hasActiveOrder ? styles.listSectionWithActive : {}),
          }}>
            {/* Active order at top if present */}
            {activeOrder && (
              <ScheduledOrder
                isActive
                mealName={activeOrder.status}
                restaurant={activeOrder.restaurant}
                status={activeOrder.status}
                itemCount={activeOrder.itemCount}
                eta={activeOrder.eta}
                avatarUrl={activeOrder.avatarUrl}
                progress={activeOrder.progress}
              />
            )}
            
            {/* Scheduled orders */}
            {scheduledOrders.map((order, index) => (
              <ScheduledOrder
                key={order.id}
                dateLabel={order.dateLabel}
                mealName={order.mealName}
                restaurant={order.restaurant}
                avatarUrl={order.avatarUrl}
                showBorder={index < scheduledOrders.length - 1}
                isHighlighted={highlightedOrderId === order.id}
              />
            ))}
          </div>
        )}

        {/* View Rotation Link (expanded only) */}
        {showExpandedList && (
          <div style={styles.viewRotationLink}>
            <button
              style={styles.viewRotationText}
              onClick={(e) => {
                e.stopPropagation()
                onViewRotation?.()
              }}
            >
              View rotation →{' '}
            </button>
          </div>
        )}
      </div>
    )
  }
)

FloatingPanel.displayName = 'FloatingPanel'
