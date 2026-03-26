import { CSSProperties, forwardRef, ReactNode } from 'react'

export interface RotationHeaderProps {
  /** Main title */
  title: string
  /** Subtitle text */
  subtitle?: string
  /** Whether to show action buttons */
  showActions?: boolean
  /** Callback when Shuffle is clicked */
  onShuffle?: () => void
  /** Callback when Meals is clicked */
  onMeals?: () => void
  /** Callback when Days is clicked */
  onDays?: () => void
  /** Callback when Pause is clicked */
  onPause?: () => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    width: '100%',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    lineHeight: '30px',
    letterSpacing: '-0.006em',
    color: '#1F1812',
    margin: 0,
    fontFamily: "'P22 Mackinac Pro', Georgia, serif",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '-0.0009em',
    color: '#433D36',
    margin: 0,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: '0 16px',
    height: 40,
    backgroundColor: 'transparent',
    border: '1px solid #CFC9C0',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontFamily: 'inherit',
  },
  buttonIcon: {
    width: 16,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '-0.0018em',
    color: '#141414',
    margin: 0,
  },
}

const ShuffleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.83333 15.8333H3.33333V14.1667H5.83333C7.21667 14.1667 8.475 13.4583 9.16667 12.3333L9.975 13.1417C9.05833 14.5833 7.525 15.8333 5.83333 15.8333ZM14.1667 15.8333V14.1667H15.4917L13.825 12.5L15 11.325L16.6667 12.9917V11.6667H18.3333V15.8333H14.1667ZM3.33333 5.83333V4.16667H5.83333C7.525 4.16667 9.05833 5.41667 9.975 6.85833L13.825 10.7083L15.4917 9.04167H14.1667V5.83333H18.3333V10H16.6667V8.675L15 10.3417L12.0083 7.35C12.6917 6.225 13.95 5.83333 15.3333 5.83333H16.6583L15 4.16667L14.1667 5V4.16667H18.3333V5.83333H16.6667V5L15 6.66667H5.83333C4.44167 6.66667 3.33333 5.83333 3.33333 5.83333Z"
      fill="#141414"
    />
  </svg>
)

const MealsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8333 3.33333V8.33333C15.8333 9.25 15.0833 10 14.1667 10H12.5V16.6667H10.8333V10H9.16667C8.25 10 7.5 9.25 7.5 8.33333V3.33333H9.16667V7.5H10V3.33333H11.6667V7.5H12.5V3.33333H14.1667V7.5H15V3.33333H15.8333ZM5.83333 3.33333V10H7.5V16.6667H5.83333V10H4.16667V3.33333H5.83333Z"
      fill="#141414"
    />
  </svg>
)

const DaysIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8333 3.33333H15V2.5H13.3333V3.33333H6.66667V2.5H5V3.33333H4.16667C3.25 3.33333 2.5 4.08333 2.5 5V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V5C17.5 4.08333 16.75 3.33333 15.8333 3.33333ZM15.8333 15.8333H4.16667V8.33333H15.8333V15.8333ZM15.8333 6.66667H4.16667V5H15.8333V6.66667Z"
      fill="#141414"
    />
  </svg>
)

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.6 5.4 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667ZM10 16.6667C6.31667 16.6667 3.33333 13.6833 3.33333 10C3.33333 6.31667 6.31667 3.33333 10 3.33333C13.6833 3.33333 16.6667 6.31667 16.6667 10C16.6667 13.6833 13.6833 16.6667 10 16.6667ZM8.33333 6.66667H6.66667V13.3333H8.33333V6.66667ZM13.3333 6.66667H11.6667V13.3333H13.3333V6.66667Z"
      fill="#141414"
    />
  </svg>
)

interface ActionButtonProps {
  icon: ReactNode
  label: string
  onClick?: () => void
}

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => (
  <button style={styles.button} onClick={onClick}>
    <span style={styles.buttonIcon}>{icon}</span>
    <span style={styles.buttonLabel}>{label}</span>
  </button>
)

export const RotationHeader = forwardRef<HTMLDivElement, RotationHeaderProps>(
  (
    {
      title,
      subtitle,
      showActions = true,
      onShuffle,
      onMeals,
      onDays,
      onPause,
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
        data-component="rotation-header"
      >
        <div style={styles.left}>
          <h1 style={styles.title}>{title}</h1>
          {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
        </div>

        {showActions && (
          <div style={styles.actions}>
            <ActionButton icon={<ShuffleIcon />} label="Shuffle" onClick={onShuffle} />
            <ActionButton icon={<MealsIcon />} label="Meals" onClick={onMeals} />
            <ActionButton icon={<DaysIcon />} label="Days" onClick={onDays} />
            <ActionButton icon={<PauseIcon />} label="Pause" onClick={onPause} />
          </div>
        )}
      </div>
    )
  }
)

RotationHeader.displayName = 'RotationHeader'
