import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from 'picnic-eater-components'
import { Shuffle, Settings } from 'lucide-react'

interface WeekOption {
  id: string | number
  label: string
}

interface MealData {
  restaurantName: string
  restaurantLogo?: string
  dishName: string
  description?: string
  price: number
  imageUrl?: string
}

const weekOptions: WeekOption[] = [
  { id: 'week1', label: 'March 17-21' },
  { id: 'week2', label: 'March 24-28' },
]

const rotationMeals: { day: string; date: string; hasMeal: boolean; meal?: MealData; stipend?: number; fulfillment?: string }[] = [
  {
    day: 'Mon',
    date: '3/17',
    hasMeal: true,
    meal: {
      restaurantName: 'Shake Shack',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      dishName: 'ShackBurger',
      description: 'Angus beef • Lettuce • Tomato • ShackSauce',
      price: 12.49,
      imageUrl: '/images/items/Shake-Shack--ShackBurger.png',
    },
    stipend: 15.00,
    fulfillment: 'CSS Los Angeles · Lunch',
  },
  {
    day: 'Tue',
    date: '3/18',
    hasMeal: true,
    meal: {
      restaurantName: 'Cava',
      restaurantLogo: '/images/logos/Cava.png',
      dishName: 'Harissa Chicken Bowl',
      description: 'Harissa chicken • Greens • Hummus • Pita chips',
      price: 13.50,
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
    },
    stipend: 15.00,
    fulfillment: 'CSS Los Angeles · Lunch',
  },
  {
    day: 'Wed',
    date: '3/19',
    hasMeal: true,
    meal: {
      restaurantName: 'Mendocino Farms',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      dishName: 'Impossible Taco Salad',
      description: 'Impossible meat • Romaine • Black beans • Corn salsa',
      price: 14.99,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
    },
    stipend: 15.00,
    fulfillment: 'CSS Los Angeles · Lunch',
  },
  {
    day: 'Thu',
    date: '3/20',
    hasMeal: true,
    meal: {
      restaurantName: 'Sweetgreen',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      dishName: 'Harvest Bowl',
      description: 'Roasted chicken • Wild rice • Goat cheese • Apples',
      price: 11.99,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
    },
    stipend: 15.00,
    fulfillment: 'CSS Los Angeles · Lunch',
  },
  {
    day: 'Fri',
    date: '3/21',
    hasMeal: false,
  },
]

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F7F7F2',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as React.CSSProperties,
  container: {
    width: '100%',
    boxSizing: 'border-box' as const,
    padding: '40px 100px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  } as React.CSSProperties,
  header: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'flex-end',
    gap: 4,
    width: '100%',
  } as React.CSSProperties,
  headerLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
    flex: 1,
  } as React.CSSProperties,
  title: {
    fontSize: 28,
    fontWeight: 500,
    lineHeight: '30px',
    letterSpacing: '-0.006em',
    color: '#1F1812',
    margin: 0,
    fontFamily: "'P22 Mackinac Pro', Georgia, serif",
  } as React.CSSProperties,
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',
    color: '#433D36',
    margin: 0,
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 8,
  } as React.CSSProperties,
  button: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: '0 16px',
    height: 40,
    backgroundColor: 'transparent',
    border: '1px solid #CFC9C0',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 16,
    fontWeight: 500,
    color: '#141414',
  } as React.CSSProperties,
  weekSelector: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: 12,
  } as React.CSSProperties,
  pill: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 24px',
    borderRadius: 28,
    border: '1px solid #CFC9C0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    color: '#1F1812',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  pillActive: {
    backgroundColor: '#292929',
    border: '1px solid rgba(247, 76, 37, 0.2)',
    color: '#FAF7F0',
  } as React.CSSProperties,
  cardsRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: 2,
  } as React.CSSProperties,
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
    backgroundColor: '#FFFFFC',
    borderRadius: 8,
    border: '1px solid rgba(136, 103, 79, 0.12)',
    flex: 1,
    minWidth: 200,
    minHeight: 420,
    boxSizing: 'border-box' as const,
  } as React.CSSProperties,
  cardHeader: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  } as React.CSSProperties,
  dateContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 4,
  } as React.CSSProperties,
  dayText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#433D36',
    margin: 0,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as React.CSSProperties,
  editText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#3D3D3D',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  topContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
    flex: 1,
  } as React.CSSProperties,
  imageContainer: {
    width: '100%',
    height: 112,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  } as React.CSSProperties,
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  } as React.CSSProperties,
  dataContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4,
  } as React.CSSProperties,
  brandRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 4,
  } as React.CSSProperties,
  brandLogo: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    objectFit: 'cover' as const,
    backgroundColor: '#E0E0E0',
  } as React.CSSProperties,
  brandName: {
    fontSize: 12,
    color: '#606060',
    margin: 0,
  } as React.CSSProperties,
  dishName: {
    fontSize: 14,
    fontWeight: 500,
    color: '#3D3D3D',
    margin: 0,
  } as React.CSSProperties,
  description: {
    fontSize: 12,
    color: '#606060',
    margin: 0,
  } as React.CSSProperties,
  price: {
    fontSize: 14,
    color: '#433D36',
    margin: 0,
  } as React.CSSProperties,
  stipendBadge: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 12,
  } as React.CSSProperties,
  stipendText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#2A7E3D',
    margin: 0,
  } as React.CSSProperties,
  fulfillmentText: {
    fontSize: 12,
    fontWeight: 400,
    color: '#1F1812',
    margin: 0,
    textAlign: 'center' as const,
  } as React.CSSProperties,
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  } as React.CSSProperties,
  addMealButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 4,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  addMealText: {
    fontSize: 14,
    color: '#433D36',
    margin: 0,
  } as React.CSSProperties,
}

export function RotationPage() {
  const navigate = useNavigate()
  const [selectedWeek, setSelectedWeek] = useState<string | number>('week1')

  return (
    <div style={styles.page}>
      {/* Header */}
      <Header
        variant="simple"
        logoUrl="/images/general/Logo.svg"
        onLogoClick={() => navigate('/')}
        onBasketClick={() => {}}
      />
      
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>Weekly rotation</h1>
            <span style={styles.subtitle}>Change or skip an order by 10:30am</span>
          </div>
          <div style={styles.actions}>
            <button style={styles.button}>
              <Shuffle size={16} color="#141414" />
              Shuffle
            </button>
            <button style={styles.button}>
              <Settings size={16} color="#141414" />
              Settings
            </button>
          </div>
        </div>

        {/* Week Selector */}
        <div style={styles.weekSelector}>
          {weekOptions.map((week) => (
            <button
              key={week.id}
              style={{
                ...styles.pill,
                ...(selectedWeek === week.id ? styles.pillActive : {}),
              }}
              onClick={() => setSelectedWeek(week.id)}
            >
              {week.label}
            </button>
          ))}
        </div>

        {/* Day Cards */}
        <div style={styles.cardsRow}>
          {rotationMeals.map((item) => (
            <div key={item.date} style={styles.card}>
              {/* Header */}
              <div style={styles.cardHeader}>
                <div style={styles.dateContainer}>
                  <span style={styles.dayText}>{item.day},</span>
                  <span style={styles.dayText}>{item.date}</span>
                </div>
                {item.hasMeal && item.meal && (
                  <button style={styles.editText}>Edit</button>
                )}
              </div>

              {item.hasMeal && item.meal ? (
                <>
                  <div style={styles.topContent}>
                    {item.meal.imageUrl && (
                      <div style={styles.imageContainer}>
                        <img src={item.meal.imageUrl} alt={item.meal.dishName} style={styles.image} />
                      </div>
                    )}
                    <div style={styles.dataContainer}>
                      <div style={styles.brandRow}>
                        {item.meal.restaurantLogo && (
                          <img src={item.meal.restaurantLogo} alt="" style={styles.brandLogo} />
                        )}
                        <span style={styles.brandName}>{item.meal.restaurantName}</span>
                      </div>
                      <span style={styles.dishName}>{item.meal.dishName}</span>
                      {item.meal.description && (
                        <span style={styles.description}>{item.meal.description}</span>
                      )}
                      <span style={styles.price}>${item.meal.price.toFixed(2)}</span>
                    </div>
                  </div>
                  {(item.stipend || item.fulfillment) && (
                    <div style={styles.stipendBadge}>
                      {item.stipend && (
                        <span style={styles.stipendText}>${item.stipend.toFixed(2)} Stipend</span>
                      )}
                      {item.fulfillment && (
                        <span style={styles.fulfillmentText}>{item.fulfillment}</span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div style={styles.emptyState}>
                  <button style={styles.addMealButton}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#433D36" />
                    </svg>
                    <span style={styles.addMealText}>Add meal</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
