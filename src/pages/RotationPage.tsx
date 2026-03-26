import { useState } from 'react'
import { DayCard, WeekSelector, RotationHeader } from '../lib'
import type { WeekOption, MealData } from '../lib'

const weekOptions: WeekOption[] = [
  { id: 'week1', label: 'April 21-25' },
  { id: 'week2', label: 'April 28-May 2' },
]

const rotationMeals: { day: string; date: string; hasMeal: boolean; meal?: MealData; stipend?: number }[] = [
  {
    day: 'Mon',
    date: '4/21',
    hasMeal: true,
    meal: {
      restaurantName: 'Sweetfin',
      restaurantLogo: '/images/logos/Sweetfin.png',
      dishName: 'Classic Tuna Poke Bowl',
      description: 'Yellowfin Tuna • Miso Sesame • Bamboo Rice',
      price: 13.25,
      imageUrl: '/images/items/Sweetfin--Classic-Tuna-Poke-Bowl.png',
    },
    stipend: 15.00,
  },
  {
    day: 'Tue',
    date: '4/22',
    hasMeal: false,
  },
  {
    day: 'Wed',
    date: '4/23',
    hasMeal: true,
    meal: {
      restaurantName: 'Vesti Sandwiches',
      restaurantLogo: '/images/logos/Vesti.png',
      dishName: 'Turkey Ciabatta',
      price: 16.00,
      imageUrl: '/images/items/Vesti--Turkey-Ciabatta.png',
    },
    stipend: 15.00,
  },
  {
    day: 'Thu',
    date: '4/24',
    hasMeal: true,
    meal: {
      restaurantName: 'Sweetgreen',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      dishName: 'Kale Caesar',
      description: 'Romaine • Add bread',
      price: 13.95,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
    },
  },
  {
    day: 'Fri',
    date: '4/25',
    hasMeal: false,
  },
]

export function RotationPage() {
  const [selectedWeek, setSelectedWeek] = useState<string | number>('week1')

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F7F7F2',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Main content */}
      <div style={{
        maxWidth: 1216,
        margin: '0 auto',
        padding: '40px 112px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <RotationHeader
          title="Weekly rotation"
          subtitle="Change or skip an order by 10:30am"
          onShuffle={() => console.log('Shuffle clicked')}
          onMeals={() => console.log('Meals clicked')}
          onDays={() => console.log('Days clicked')}
          onPause={() => console.log('Pause clicked')}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <WeekSelector
            weeks={weekOptions}
            selectedWeekId={selectedWeek}
            onSelectWeek={(week) => setSelectedWeek(week.id)}
          />
          
          <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {rotationMeals.map((item) => (
              <DayCard
                key={item.date}
                day={item.day}
                date={item.date}
                hasMeal={item.hasMeal}
                meal={item.meal}
                stipendAmount={item.stipend}
                onEdit={() => console.log(`Edit ${item.day} clicked`)}
                onAddMeal={() => console.log(`Add meal for ${item.day} clicked`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
