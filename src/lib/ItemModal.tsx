import { CSSProperties, forwardRef, useState, useEffect } from 'react'

export interface NutritionInfo {
  calories?: number
  fat?: string
  carbs?: string
  protein?: string
}

export interface Tag {
  id: string | number
  label: string
}

export interface CustomizationOption {
  id: string | number
  label: string
  price?: number
  selected?: boolean
}

export interface CustomizationGroup {
  id: string | number
  title: string
  requiredCount?: number
  options: CustomizationOption[]
}

export interface ItemModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Item image URL */
  imageUrl: string
  /** Item name */
  itemName: string
  /** Item description */
  description?: string
  /** Tags to display (e.g., "Gluten Free", "Contains Egg") */
  tags?: Tag[]
  /** Nutrition information */
  nutrition?: NutritionInfo
  /** Customization groups */
  customizations?: CustomizationGroup[]
  /** Base price of the item */
  basePrice: number
  /** Currency symbol (default: $) */
  currency?: string
  /** Callback when modal is closed */
  onClose?: () => void
  /** Callback when "Add to basket" is clicked */
  onAddToBasket?: (selectedOptions: Record<string | number, (string | number)[]>, totalPrice: number) => void
  /** Callback when a date is selected from the schedule popover */
  onScheduleMeal?: (date: Date) => void
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  modal: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FAF9F4',
    borderRadius: 16,
    border: '1px solid rgba(136, 103, 79, 0.1)',
    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.07)',
    maxWidth: 945,
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: '16px 20px',
    width: 358,
    flexShrink: 0,
    borderRight: '1px dashed rgba(136, 103, 79, 0.1)',
    overflowY: 'auto',
  },
  itemImage: {
    width: '100%',
    height: 269,
    borderRadius: 12,
    objectFit: 'cover',
    backgroundColor: '#EFEBE5',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  itemName: {
    fontFamily: "'P22 Mackinac Pro', Georgia, serif",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '1.1em',
    letterSpacing: '-0.01em',
    color: '#000000',
    margin: 0,
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '1.29em',
    letterSpacing: '-0.0009em',
    color: '#525252',
    margin: 0,
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    backgroundColor: '#EFEBE5',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '1.14em',
    letterSpacing: '-0.04em',
    color: '#1F1812',
  },
  nutritionSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  nutritionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottom: '1px solid rgba(136, 103, 79, 0.1)',
  },
  nutritionLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '1.14em',
    letterSpacing: '-0.0009em',
    color: '#433D36',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '1.14em',
    letterSpacing: '-0.05em',
    color: '#433D36',
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
  },
  customizationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 72,
  },
  customizationGroup: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px',
  },
  customizationGroupFirst: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px 0 20px',
  },
  groupHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  requiredBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    border: '1px solid rgba(136, 103, 79, 0.12)',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '1.17em',
    letterSpacing: '0.01em',
    color: '#433D36',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 8,
    border: '1px solid #D6D6D6',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  groupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  groupTitle: {
    fontFamily: "'P22 Mackinac Pro', Georgia, serif",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '1.1em',
    letterSpacing: '-0.01em',
    color: '#1F1812',
    margin: 0,
    padding: '8px 0 16px 0',
  },
  optionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 8px',
    gap: 8,
  },
  optionLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: '1.5px solid #433D36',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxSelected: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: '1.5px solid #141414',
    backgroundColor: '#141414',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '1.14em',
    letterSpacing: '-0.0009em',
    color: '#433D36',
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '1.14em',
    letterSpacing: '-0.0009em',
    color: '#525252',
  },
  optionDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    margin: '0 8px',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 24,
    padding: '16px 24px',
    backgroundColor: '#FAF9F4',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 40,
    padding: '0 16px',
    backgroundColor: 'transparent',
    border: '1px solid #D6D6D6',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '1.125em',
    letterSpacing: '-0.0018em',
    color: '#141414',
    transition: 'background-color 0.15s ease',
    flex: 1,
    width: '100%',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 40,
    padding: '0 16px',
    backgroundColor: '#F74C25',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '1.125em',
    letterSpacing: '-0.0018em',
    color: '#FFFFFF',
    transition: 'background-color 0.15s ease',
    flex: 1,
  },
  scheduleButtonWrapper: {
    position: 'relative',
    flex: 1,
    display: 'flex',
  },
  datePickerPopover: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    marginBottom: 8,
    width: 272,
    backgroundColor: '#FAF9F4',
    borderRadius: 16,
    border: '1px solid rgba(136, 103, 79, 0.1)',
    boxShadow: '0px 4px 94px 34px rgba(0, 0, 0, 0.07)',
    overflow: 'hidden',
    zIndex: 10,
  },
  datePickerList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 12px',
  },
  dateOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: '16px 8px',
    cursor: 'pointer',
    borderBottom: '1px solid rgba(136, 103, 79, 0.12)',
    transition: 'background-color 0.15s ease',
  },
  dateOptionLast: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: '16px 8px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  dateCircle: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: '1px solid #CFC9C0',
    backgroundColor: 'transparent',
    flexShrink: 0,
  },
  dateCircleSelected: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#F74C25',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '1.14em',
    letterSpacing: '-0.0009em',
    color: '#433D36',
  },
  confirmationPopover: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    marginBottom: 8,
    width: 354,
    backgroundColor: '#FAF9F4',
    borderRadius: 16,
    border: '1px solid rgba(136, 103, 79, 0.1)',
    boxShadow: '0px 4px 94px 34px rgba(0, 0, 0, 0.07)',
    padding: 24,
    zIndex: 15,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '1.11em',
    letterSpacing: '-0.0026em',
    color: '#1F1812',
    margin: 0,
    marginBottom: 16,
  },
  confirmationDescription: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.125em',
    letterSpacing: '-0.0018em',
    color: '#606060',
    margin: 0,
    marginBottom: 24,
    whiteSpace: 'pre-line',
  },
  confirmationButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  confirmCancelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    padding: '0 16px',
    backgroundColor: 'transparent',
    border: '1px solid #D6D6D6',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '1.125em',
    letterSpacing: '-0.0018em',
    color: '#141414',
    transition: 'background-color 0.15s ease',
  },
  confirmScheduleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    padding: '0 16px',
    backgroundColor: '#F74C25',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '1.125em',
    letterSpacing: '-0.0018em',
    color: '#FFFFFF',
    transition: 'background-color 0.15s ease',
  },
  confirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    zIndex: 5,
  },
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8L8 12L12 8" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CircleCheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 6L5 9L10 3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const getUpcomingWeekdays = (count: number = 5): Date[] => {
  const dates: Date[] = []
  const today = new Date()
  let currentDate = new Date(today)
  currentDate.setDate(currentDate.getDate() + 1)
  
  while (dates.length < count) {
    const dayOfWeek = currentDate.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(new Date(currentDate))
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return dates
}

const formatDateLabel = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}

const formatDayName = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

const formatShortDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[date.getMonth()]}. ${date.getDate()}`
}

export const ItemModal = forwardRef<HTMLDivElement, ItemModalProps>(
  (
    {
      isOpen,
      imageUrl,
      itemName,
      description,
      tags = [],
      nutrition,
      customizations = [],
      basePrice,
      currency = '$',
      onClose,
      onAddToBasket,
      onScheduleMeal,
      className,
      style,
    },
    ref
  ) => {
    const [selections, setSelections] = useState<Record<string | number, Set<string | number>>>({})
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const upcomingDates = getUpcomingWeekdays(5)

    useEffect(() => {
      if (isOpen) {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = originalOverflow
        }
      }
    }, [isOpen])

    useEffect(() => {
      if (!isOpen) {
        setIsDatePickerOpen(false)
        setSelectedDate(null)
        setShowConfirmation(false)
      }
    }, [isOpen])

    if (!isOpen) return null

    const toggleOption = (groupId: string | number, optionId: string | number) => {
      setSelections((prev) => {
        const groupSelections = new Set(prev[groupId] || [])
        if (groupSelections.has(optionId)) {
          groupSelections.delete(optionId)
        } else {
          groupSelections.add(optionId)
        }
        return { ...prev, [groupId]: groupSelections }
      })
    }

    const calculateTotalPrice = () => {
      let total = basePrice
      customizations.forEach((group) => {
        const groupSelections = selections[group.id] || new Set()
        group.options.forEach((option) => {
          if (groupSelections.has(option.id) && option.price) {
            total += option.price
          }
        })
      })
      return total
    }

    const handleAddToBasket = () => {
      const selectedOptions: Record<string | number, (string | number)[]> = {}
      Object.entries(selections).forEach(([groupId, optionSet]) => {
        selectedOptions[groupId] = Array.from(optionSet)
      })
      onAddToBasket?.(selectedOptions, calculateTotalPrice())
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose?.()
      }
    }

    const totalPrice = calculateTotalPrice()

    return (
      <div
        style={styles.overlay}
        onClick={handleOverlayClick}
        data-component="item-modal-overlay"
      >
        <div
          ref={ref}
          className={className}
          style={{ ...styles.modal, ...style }}
          data-component="item-modal"
        >
          {/* Confirmation Overlay */}
          {showConfirmation && (
            <div
              style={styles.confirmationOverlay}
              onClick={() => {
                setShowConfirmation(false)
                setSelectedDate(null)
              }}
            />
          )}

          {/* Left Panel - Item Details */}
          <div style={styles.leftPanel}>
            <div style={styles.itemDetails}>
              <img
                src={imageUrl}
                alt={itemName}
                style={styles.itemImage}
              />
              <div style={styles.itemInfo}>
                <h2 style={styles.itemName}>{itemName}</h2>
                {description && <p style={styles.description}>{description}</p>}
                {tags.length > 0 && (
                  <div style={styles.tagsContainer}>
                    {tags.map((tag) => (
                      <span key={tag.id} style={styles.tag}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nutrition Info */}
            {nutrition && (
              <div style={styles.nutritionSection}>
                {nutrition.calories !== undefined && (
                  <div style={styles.nutritionRow}>
                    <span style={styles.nutritionLabel}>Calories</span>
                    <span style={styles.nutritionValue}>{nutrition.calories}</span>
                  </div>
                )}
                {nutrition.fat && (
                  <div style={styles.nutritionRow}>
                    <span style={styles.nutritionLabel}>Fat</span>
                    <span style={styles.nutritionValue}>{nutrition.fat}</span>
                  </div>
                )}
                {nutrition.carbs && (
                  <div style={styles.nutritionRow}>
                    <span style={styles.nutritionLabel}>Carbs</span>
                    <span style={styles.nutritionValue}>{nutrition.carbs}</span>
                  </div>
                )}
                {nutrition.protein && (
                  <div style={styles.nutritionRow}>
                    <span style={styles.nutritionLabel}>Protein</span>
                    <span style={styles.nutritionValue}>{nutrition.protein}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Customizations */}
          <div style={styles.rightPanel}>
            <div style={styles.customizationsContainer}>
              {customizations.map((group, groupIndex) => (
                <div
                  key={group.id}
                  style={groupIndex === 0 ? styles.customizationGroupFirst : styles.customizationGroup}
                >
                  {/* Group Header with Required Badge and Close Button */}
                  {groupIndex === 0 && (
                    <div style={styles.groupHeader}>
                      {group.requiredCount && (
                        <span style={styles.requiredBadge}>
                          {group.requiredCount} required selection{group.requiredCount > 1 ? 's' : ''}
                        </span>
                      )}
                      <button
                        style={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close modal"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  )}

                  <div style={styles.groupContent}>
                    <h3 style={styles.groupTitle}>{group.title}</h3>
                    {group.options.map((option, optionIndex) => (
                      <div key={option.id}>
                        <div
                          style={styles.optionRow}
                          onClick={() => toggleOption(group.id, option.id)}
                        >
                          <div style={styles.optionLeft}>
                            <div
                              style={
                                selections[group.id]?.has(option.id)
                                  ? styles.checkboxSelected
                                  : styles.checkbox
                              }
                            >
                              {selections[group.id]?.has(option.id) && <CheckIcon />}
                            </div>
                            <span style={styles.optionLabel}>{option.label}</span>
                          </div>
                          {option.price !== undefined && option.price > 0 && (
                            <span style={styles.optionPrice}>
                              + {currency}{option.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {optionIndex < group.options.length - 1 && (
                          <div style={styles.optionDivider} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
              <div style={styles.scheduleButtonWrapper}>
                {/* Date Picker Popover */}
                {isDatePickerOpen && !showConfirmation && (
                  <div style={styles.datePickerPopover}>
                    <div style={styles.datePickerList}>
                      {upcomingDates.map((date, index) => {
                        const isSelected = selectedDate?.getTime() === date.getTime()
                        const isLast = index === upcomingDates.length - 1
                        return (
                          <div
                            key={date.toISOString()}
                            style={isLast ? styles.dateOptionLast : styles.dateOption}
                            onClick={() => {
                              setSelectedDate(date)
                              setIsDatePickerOpen(false)
                              setShowConfirmation(true)
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                          >
                            <div style={isSelected ? styles.dateCircleSelected : styles.dateCircle}>
                              {isSelected && <CircleCheckIcon />}
                            </div>
                            <span style={styles.dateLabel}>{formatDateLabel(date)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Confirmation Popover */}
                {showConfirmation && selectedDate && (
                  <div style={styles.confirmationPopover}>
                    <h3 style={styles.confirmationTitle}>
                      Scheduling for your {formatDayName(selectedDate)}
                    </h3>
                    <p style={styles.confirmationDescription}>
                      You'll be charged (or discounted from your meal program) {formatShortDate(selectedDate)}, at 9:10am
                      {'\n\n'}
                      Cancel or order something else before then
                    </p>
                    <div style={styles.confirmationButtons}>
                      <button
                        style={styles.confirmCancelButton}
                        onClick={() => {
                          setShowConfirmation(false)
                          setSelectedDate(null)
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        style={styles.confirmScheduleButton}
                        onClick={() => {
                          onScheduleMeal?.(selectedDate)
                          setShowConfirmation(false)
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e04420'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#F74C25'
                        }}
                      >
                        Schedule order
                      </button>
                    </div>
                  </div>
                )}

                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    if (showConfirmation) {
                      setShowConfirmation(false)
                    }
                    setIsDatePickerOpen(!isDatePickerOpen)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  Schedule meal
                  <ChevronDownIcon />
                </button>
              </div>
              <button
                style={styles.primaryButton}
                onClick={handleAddToBasket}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e04420'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F74C25'
                }}
              >
                Add to basket · {currency}{totalPrice.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ItemModal.displayName = 'ItemModal'
