import { CSSProperties, useEffect, useMemo, useState } from 'react'
import { CalendarDays, MapPin, X } from 'lucide-react'
import type { ScheduledOrderItem } from 'picnic-eater-components'

interface MealOption {
  id: string
  restaurant: string
  dishName: string
  modifiers: string
  price: number
  imageUrl: string
}

interface ScheduledMealPreviewModalProps {
  isOpen: boolean
  order: ScheduledOrderItem | null
  onClose: () => void
  onSave?: (option: MealOption) => void
  onSkipMeal?: () => void
}

const styles: Record<string, CSSProperties> = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: 16,
  },
  modal: {
    width: 520,
    maxWidth: '100%',
    maxHeight: '86vh',
    overflowY: 'auto',
    backgroundColor: '#F7F7F2',
    borderRadius: 16,
    boxShadow: '0px 4px 94px 34px rgba(0, 0, 0, 0.07)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(136, 103, 79, 0.12)',
    position: 'sticky',
    top: 0,
    backgroundColor: '#F7F7F2',
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '24px',
    color: '#1F1812',
    margin: 0,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: '1px solid rgba(136, 103, 79, 0.16)',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  section: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(136, 103, 79, 0.12)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1F1812',
    margin: '0 0 12px',
  },
  detailCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#1F1812',
    margin: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid rgba(136, 103, 79, 0.12)',
    background: 'transparent',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  optionImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
  },
  optionTextWrap: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  brand: {
    fontSize: 12,
    fontWeight: 400,
    color: '#606060',
    margin: 0,
  },
  dish: {
    fontSize: 14,
    fontWeight: 500,
    color: '#1F1812',
    margin: 0,
  },
  modifiers: {
    fontSize: 12,
    fontWeight: 400,
    color: '#606060',
    margin: 0,
  },
  price: {
    fontSize: 14,
    fontWeight: 400,
    color: '#1F1812',
    margin: 0,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '2px solid #A6A19A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#1F1812',
  },
  footer: {
    position: 'sticky',
    bottom: 0,
    padding: '12px 20px 16px',
    backgroundColor: '#F7F7F2',
    borderTop: '1px solid rgba(136, 103, 79, 0.12)',
    display: 'flex',
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    border: '1px solid rgba(136, 103, 79, 0.25)',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 500,
    color: '#A53A1E',
    cursor: 'pointer',
  },
  primaryButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#1F1812',
    fontSize: 16,
    fontWeight: 500,
    color: '#FAF7F0',
    cursor: 'pointer',
  },
}

const buildMealOptions = (order: ScheduledOrderItem): MealOption[] => {
  const defaults: MealOption[] = [
    {
      id: 'sweetfin',
      restaurant: 'Sweetfin',
      dishName: 'Classic Tuna Poke Bowl',
      modifiers: 'Yellowfin Tuna • Miso Sesame • Bamboo Rice • No Pickled Ginger',
      price: 12.25,
      imageUrl: '/images/items/Sweetfin-Chicken-Bahn-Mi-Bowl.png',
    },
    {
      id: 'cava',
      restaurant: 'Cava',
      dishName: 'Harissa Chicken Bowl',
      modifiers: 'Harissa chicken • Greens • Hummus • Pita chips',
      price: 13.5,
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
    },
    {
      id: 'mendocino',
      restaurant: 'Mendocino Farms',
      dishName: 'Impossible Taco Salad',
      modifiers: 'Impossible meat • Romaine • Black beans • Corn salsa',
      price: 14.99,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
    },
    {
      id: 'sweetgreen',
      restaurant: 'Sweetgreen',
      dishName: 'Harvest Bowl',
      modifiers: 'Roasted chicken • Wild rice • Goat cheese • Apples',
      price: 11.99,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
    },
    {
      id: 'jersey',
      restaurant: 'Jersey Mikes',
      dishName: 'Roasted Chicken',
      modifiers: "Make it Mike's Way",
      price: 11.95,
      imageUrl: '/images/items/California-Chicken-Cafe--Chicken-Caesar-Wrap.png',
    },
  ]

  const fromOrder: MealOption = {
    id: `order-${String(order.id)}`,
    restaurant: order.restaurant,
    dishName: order.mealName,
    modifiers: 'Chef recommendation • Team favorite',
    price: order.mealName.toLowerCase().includes('harvest') ? 11.99 : 12.99,
    imageUrl: order.avatarUrl || '/images/items/Cava--Harissa-Chicken-Bowl.png',
  }

  return [fromOrder, ...defaults.filter((item) => item.dishName !== order.mealName)]
}

export function ScheduledMealPreviewModal({
  isOpen,
  order,
  onClose,
  onSave,
  onSkipMeal,
}: ScheduledMealPreviewModalProps) {
  const options = useMemo(() => (order ? buildMealOptions(order) : []), [order])
  const [selectedId, setSelectedId] = useState<string>('')

  useEffect(() => {
    if (options.length > 0) {
      setSelectedId(options[0].id)
    }
  }, [options])

  if (!isOpen || !order) return null

  const dayLabel = order.dateLabel?.split(',')[0] || 'Meal'
  const selectedOption = options.find((item) => item.id === selectedId) || options[0]

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{dayLabel} meal</h2>
          <button style={styles.closeButton} onClick={onClose} aria-label="Close preview">
            <X size={16} color="#1F1812" />
          </button>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Delivery details</h3>
          <div style={styles.detailCard}>
            <div style={styles.detailRow}>
              <MapPin size={16} color="#1F1812" />
              <p style={styles.detailText}>CSS - Los Angeles</p>
            </div>
            <div style={styles.detailRow}>
              <CalendarDays size={16} color="#1F1812" />
              <p style={styles.detailText}>{order.dateLabel} · Lunch (11:45 - 11:50am)</p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Pick your meal</h3>
          <div style={styles.list}>
            {options.map((option) => {
              const isSelected = option.id === selectedId
              return (
                <button
                  key={option.id}
                  style={styles.optionRow}
                  onClick={() => setSelectedId(option.id)}
                >
                  <img src={option.imageUrl} alt={option.dishName} style={styles.optionImage} />
                  <div style={styles.optionTextWrap}>
                    <p style={styles.brand}>{option.restaurant}</p>
                    <p style={styles.dish}>{option.dishName}</p>
                    <p style={styles.modifiers}>{option.modifiers}</p>
                    <p style={styles.price}>${option.price.toFixed(2)}</p>
                  </div>
                  <span style={styles.radio}>{isSelected && <span style={styles.radioInner} />}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div style={styles.footer}>
          <button style={styles.secondaryButton} onClick={onSkipMeal}>
            Skip meal
          </button>
          <button
            style={styles.primaryButton}
            onClick={() => {
              if (selectedOption) onSave?.(selectedOption)
              onClose()
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
