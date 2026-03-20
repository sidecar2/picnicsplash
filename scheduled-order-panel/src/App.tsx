import { useState } from 'react'
import {
  Header,
  Banner,
  FilterChipCarousel,
  ItemCarousel,
  StoreCarousel,
  StoreCard,
  FloatingPanel,
  ItemModal,
} from 'picnic-eater-components'
import type { FilterChipItem, ItemCarouselItem, StoreCarouselItem, CustomizationGroup, ScheduledOrderItem } from 'picnic-eater-components'
import './App.css'

const formatDateLabel = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']
  return `${days[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}`
}

// Parse dateLabel back to timestamp for sorting (assumes current year)
const parseDateLabel = (dateLabel: string): number => {
  const match = dateLabel.match(/(\d+)\/(\d+)/)
  if (match) {
    const month = parseInt(match[1], 10) - 1
    const day = parseInt(match[2], 10)
    const year = new Date().getFullYear()
    return new Date(year, month, day).getTime()
  }
  return 0
}

interface OrderWithTimestamp extends ScheduledOrderItem {
  sortTimestamp: number
}

function App() {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemCarouselItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [highlightedOrderId, setHighlightedOrderId] = useState<number | null>(null)
  const [ordersWithTimestamp, setOrdersWithTimestamp] = useState<OrderWithTimestamp[]>([
    { id: 1, dateLabel: 'Weds, 3/19', mealName: 'Impossible Taco Salad', restaurant: 'Mendocino Farms', avatarUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png', sortTimestamp: parseDateLabel('Weds, 3/19') },
    { id: 2, dateLabel: 'Thurs, 3/20', mealName: 'Harvest Bowl', restaurant: 'Sweetgreen', avatarUrl: '/images/items/Sweetgreen--Harvest-Bowl.png', sortTimestamp: parseDateLabel('Thurs, 3/20') },
  ])

  // Sorted orders for display (strip sortTimestamp for component)
  const scheduledOrders: ScheduledOrderItem[] = [...ordersWithTimestamp]
    .sort((a, b) => a.sortTimestamp - b.sortTimestamp)
    .map(({ sortTimestamp, ...order }) => order)

  const handleItemClick = (item: ItemCarouselItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleScheduleOrder = (date: Date, item: ItemCarouselItem) => {
    const newOrderId = Date.now()
    const newOrder: OrderWithTimestamp = {
      id: newOrderId,
      dateLabel: formatDateLabel(date),
      mealName: item.dishName,
      restaurant: item.restaurantName,
      avatarUrl: item.imageUrl,
      sortTimestamp: date.getTime(),
    }
    setOrdersWithTimestamp((prev) => [...prev, newOrder])
    setHighlightedOrderId(newOrderId)
    
    // Clear highlight after animation completes
    setTimeout(() => {
      setHighlightedOrderId(null)
    }, 2000)
    setIsPanelExpanded(true)
    handleCloseModal()
  }

  const sampleCustomizations: CustomizationGroup[] = [
    {
      id: 'protein',
      title: 'Choose your protein',
      requiredCount: 1,
      options: [
        { id: 'chicken', label: 'Grilled Chicken', price: 0 },
        { id: 'steak', label: 'Steak', price: 2.99 },
        { id: 'salmon', label: 'Salmon', price: 3.99 },
        { id: 'tofu', label: 'Tofu', price: 0 },
      ],
    },
    {
      id: 'toppings',
      title: 'Add extra toppings',
      options: [
        { id: 'avocado', label: 'Avocado', price: 1.99 },
        { id: 'bacon', label: 'Crispy Bacon', price: 1.49 },
        { id: 'cheese', label: 'Extra Cheese', price: 0.99 },
        { id: 'egg', label: 'Fried Egg', price: 1.29 },
      ],
    },
    {
      id: 'sides',
      title: 'Choose a side',
      options: [
        { id: 'chips', label: 'Tortilla Chips', price: 2.49 },
        { id: 'salad', label: 'Side Salad', price: 3.49 },
        { id: 'soup', label: 'Soup of the Day', price: 3.99 },
      ],
    },
  ]

  const filterChips: FilterChipItem[] = [
    { id: 'price', label: '$15.00 & under', icon: '/images/filter-chips/$15 & Under.png' },
    { id: 'bowls', label: 'Bowls', icon: '/images/filter-chips/Bowls.png' },
    { id: 'limited', label: 'Limited time', icon: '/images/filter-chips/Limited time.png' },
    { id: 'top', label: 'Top rated', icon: '/images/filter-chips/Top rated.png' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '/images/filter-chips/Vegetarian.png' },
    { id: 'salads', label: 'Salads', icon: '/images/filter-chips/Salads.png' },
    { id: 'sushi', label: 'Sushi', icon: '/images/filter-chips/Sushi.png' },
    { id: 'mexican', label: 'Mexican', icon: '/images/filter-chips/Mexican.png' },
    { id: 'poke', label: 'Poke', icon: '/images/filter-chips/Poke.png' },
    { id: 'sides', label: 'Sides', icon: '/images/filter-chips/Sides.png' },
    { id: 'sandwiches', label: 'Sandwiches', icon: '/images/filter-chips/sandwiches.png' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '/images/filter-chips/Mediteranean.png' },
    { id: 'chinese', label: 'Chinese', icon: '/images/filter-chips/Chinese.png' },
  ]

  const featuredItems: ItemCarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/items/Shake-Shack--ShackBurger.png',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      restaurantName: 'Shake Shack',
      dishName: 'ShackBurger',
      price: 12.49,
      badgeText: 'Popular',
      badgeColor: '#141414',
    },
    {
      id: 2,
      imageUrl: '/images/items/Din-Tai-Fung--Shrimp-Fried-Noodles.png',
      restaurantLogo: '/images/logos/Din-Tai-Fung.png',
      restaurantName: 'Din Tai Fung',
      dishName: 'Shrimp Fried Noodles',
      price: 17.95,
      badgeText: 'Today only',
    },
    {
      id: 3,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Harvest Bowl',
      price: 9.99,
      originalPrice: 11.99,
      discount: true,
      badgeText: '$2 off',
    },
    {
      id: 4,
      imageUrl: '/images/items/Levain-Bakery--Double-Chocolate-Chip.png',
      restaurantLogo: '/images/logos/Levain-Bakery.png',
      restaurantName: 'Levain Bakery',
      dishName: 'Double Chocolate Chip',
      price: 5.99,
    },
    {
      id: 5,
      imageUrl: '/images/items/Pine-and-Crane--3-Cup-Chicken.png',
      restaurantLogo: '/images/logos/Pine-and-Crane.png',
      restaurantName: 'Pine & Crane',
      dishName: '3 Cup Chicken',
      price: 16.50,
      badgeText: 'New',
    },
    {
      id: 6,
      imageUrl: '/images/items/Erewhon--Kale-Coconut-Smoothie.png',
      restaurantLogo: '/images/logos/Erewhon-Market.png',
      restaurantName: 'Erewhon',
      dishName: 'Kale Coconut Smoothie',
      price: 12.00,
    },
  ]

  const budgetItems: ItemCarouselItem[] = [
    {
      id: 7,
      imageUrl: '/images/items/Ben\'s-Fast-Food--Chicken-Rice-Bowl.png',
      restaurantLogo: '/images/logos/Ben\'s-Fast-Food.png',
      restaurantName: "Ben's Fast Food",
      dishName: 'Chicken Rice Bowl',
      price: 10.99,
    },
    {
      id: 8,
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Harissa Chicken Bowl',
      price: 13.50,
    },
    {
      id: 9,
      imageUrl: '/images/items/Pita-Dust--Oasis-Bowl.png',
      restaurantLogo: '/images/logos/Pita-Dust.png',
      restaurantName: 'Pita Dust',
      dishName: 'Oasis Bowl',
      price: 14.25,
    },
    {
      id: 10,
      imageUrl: '/images/items/Teriyaki-Madness--Teriyaki-Chicken-Bowl.png',
      restaurantLogo: '/images/logos/Teriyaki-Madness.png',
      restaurantName: 'Teriyaki Madness',
      dishName: 'Teriyaki Chicken Bowl',
      price: 12.99,
    },
    {
      id: 11,
      imageUrl: '/images/items/Sweetfin-Chicken-Bahn-Mi-Bowl.png',
      restaurantLogo: '/images/logos/Sweetfin.png',
      restaurantName: 'Sweetfin',
      dishName: 'Chicken Bahn Mi Bowl',
      price: 14.50,
    },
    {
      id: 12,
      imageUrl: '/images/items/Hungry-Cowgirl-Southwest-Bowl.png',
      restaurantLogo: '/images/logos/Hungry-Cowgirl.png',
      restaurantName: 'Hungry Cowgirl',
      dishName: 'Southwest Bowl',
      price: 13.99,
      originalPrice: 15.99,
      discount: true,
      badgeText: '$2 off',
    },
  ]

  const newItems: ItemCarouselItem[] = [
    {
      id: 13,
      imageUrl: '/images/items/Brekki-Bagels--Brekki-Sando.png',
      restaurantLogo: '/images/logos/Brekki-Bagels.png',
      restaurantName: 'Brekki Bagels',
      dishName: 'Brekki Sando',
      price: 11.99,
      badgeText: 'New',
    },
    {
      id: 14,
      imageUrl: '/images/items/Starbucks--Cold-Brew-Reserve.png',
      restaurantLogo: '/images/logos/Starbucks.png',
      restaurantName: 'Starbucks',
      dishName: 'Cold Brew Reserve',
      price: 6.45,
    },
    {
      id: 15,
      imageUrl: '/images/items/Ggiata--The-Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/Ggiata.png',
      restaurantName: 'Ggiata',
      dishName: 'Chicken Caesar Wrap',
      price: 15.99,
      badgeText: '2 left',
      badgeColor: '#141414',
    },
    {
      id: 16,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      restaurantName: 'Mendocino Farms',
      dishName: 'Impossible Taco Salad',
      price: 14.99,
    },
    {
      id: 17,
      imageUrl: '/images/items/California-Chicken-Cafe--Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/California-Chicken-Cafe.png',
      restaurantName: 'California Chicken',
      dishName: 'Chicken Caesar Wrap',
      price: 12.49,
    },
    {
      id: 18,
      imageUrl: '/images/items/Talo-Organic--Chicken-Broccoli-Plate.png',
      restaurantLogo: '/images/logos/Talo-Organicpng.png',
      restaurantName: 'Talo Organic',
      dishName: 'Chicken Broccoli Plate',
      price: 15.50,
      badgeText: 'Healthy',
      badgeColor: '#00796B',
    },
  ]

  const orderAgainItems: ItemCarouselItem[] = [
    {
      id: 19,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Harvest Bowl',
      price: 11.99,
    },
    {
      id: 20,
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Harissa Chicken Bowl',
      price: 13.50,
    },
    {
      id: 21,
      imageUrl: '/images/items/Shake-Shack--ShackBurger.png',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      restaurantName: 'Shake Shack',
      dishName: 'ShackBurger',
      price: 12.49,
    },
    {
      id: 22,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      restaurantName: 'Mendocino Farms',
      dishName: 'Impossible Taco Salad',
      price: 14.99,
    },
    {
      id: 23,
      imageUrl: '/images/items/Din-Tai-Fung--Shrimp-Fried-Noodles.png',
      restaurantLogo: '/images/logos/Din-Tai-Fung.png',
      restaurantName: 'Din Tai Fung',
      dishName: 'Shrimp Fried Noodles',
      price: 17.95,
    },
  ]

  const popularStores: StoreCarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/stores/Sweetgreen.png',
      logoUrl: '/images/logos/Sweetgreen.png',
      storeName: 'Sweetgreen',
      category: 'Salads, Bowls',
      badgeText: 'Popular',
      badgeColor: '#141414',
    },
    {
      id: 2,
      imageUrl: '/images/stores/Cava.png',
      logoUrl: '/images/logos/Cava.png',
      storeName: 'Cava',
      category: 'Mediterranean, Bowls',
    },
    {
      id: 3,
      imageUrl: '/images/stores/Shake-Shack.png',
      logoUrl: '/images/logos/Shake-Shack.png',
      storeName: 'Shake Shack',
      category: 'Burgers, American',
    },
    {
      id: 4,
      imageUrl: '/images/stores/Din-Tai-Fung.png',
      logoUrl: '/images/logos/Din-Tai-Fung.png',
      storeName: 'Din Tai Fung',
      category: 'Dumplings, Taiwanese',
      badgeText: 'Today only',
    },
    {
      id: 5,
      imageUrl: '/images/stores/Ggiata.png',
      logoUrl: '/images/logos/Ggiata.png',
      storeName: 'Ggiata',
      category: 'Sandwiches, Italian',
      badgeText: 'Picnic Debut',
    },
    {
      id: 6,
      imageUrl: '/images/stores/Mendocino-Farms.png',
      logoUrl: '/images/logos/Mendocino-Farms.png',
      storeName: 'Mendocino Farms',
      category: 'Salads, Sandwiches',
    },
  ]

  const newStores: StoreCarouselItem[] = [
    {
      id: 7,
      imageUrl: '/images/stores/Brekki-Bagels.png',
      logoUrl: '/images/logos/Brekki-Bagels.png',
      storeName: 'Brekki Bagels',
      category: 'Breakfast, Bagels',
      badgeText: 'New',
    },
    {
      id: 8,
      imageUrl: '/images/stores/Pine-and-Crane.png',
      logoUrl: '/images/logos/Pine-and-Crane.png',
      storeName: 'Pine & Crane',
      category: 'Taiwanese, Noodles',
      badgeText: 'New',
    },
    {
      id: 9,
      imageUrl: '/images/stores/Levain-Bakery.png',
      logoUrl: '/images/logos/Levain-Bakery.png',
      storeName: 'Levain Bakery',
      category: 'Bakery, Cookies',
      badgeText: 'New',
    },
    {
      id: 10,
      imageUrl: '/images/stores/Erewhon-Market.png',
      logoUrl: '/images/logos/Erewhon-Market.png',
      storeName: 'Erewhon',
      category: 'Healthy, Smoothies',
      badgeText: 'New',
    },
    {
      id: 11,
      imageUrl: '/images/stores/Pita-Dust.png',
      logoUrl: '/images/logos/Pita-Dust.png',
      storeName: 'Pita Dust',
      category: 'Mediterranean, Bowls',
      badgeText: 'New',
    },
  ]

  const allStores = [
    { id: 101, imageUrl: '/images/stores/Sweetgreen.png', logoUrl: '/images/logos/Sweetgreen.png', storeName: 'Sweetgreen', category: 'Salads, Bowls' },
    { id: 102, imageUrl: '/images/stores/Cava.png', logoUrl: '/images/logos/Cava.png', storeName: 'Cava', category: 'Mediterranean, Bowls' },
    { id: 103, imageUrl: '/images/stores/Shake-Shack.png', logoUrl: '/images/logos/Shake-Shack.png', storeName: 'Shake Shack', category: 'Burgers, American' },
    { id: 104, imageUrl: '/images/stores/Din-Tai-Fung.png', logoUrl: '/images/logos/Din-Tai-Fung.png', storeName: 'Din Tai Fung', category: 'Dumplings, Taiwanese' },
    { id: 105, imageUrl: '/images/stores/Ggiata.png', logoUrl: '/images/logos/Ggiata.png', storeName: 'Ggiata', category: 'Sandwiches, Italian' },
    { id: 106, imageUrl: '/images/stores/Mendocino-Farms.png', logoUrl: '/images/logos/Mendocino-Farms.png', storeName: 'Mendocino Farms', category: 'Salads, Sandwiches' },
    { id: 107, imageUrl: '/images/stores/Chipotle.png', logoUrl: '/images/logos/Chipotle.png', storeName: 'Chipotle', category: 'Mexican, Burritos' },
    { id: 108, imageUrl: '/images/stores/Zankou-Chicken.png', logoUrl: '/images/logos/Zankou-Chicken.png', storeName: 'Zankou Chicken', category: 'Mediterranean, Chicken' },
    { id: 109, imageUrl: '/images/stores/Sugarfish.png', logoUrl: '/images/logos/Sugarfish.png', storeName: 'Sugarfish', category: 'Sushi, Japanese' },
    { id: 110, imageUrl: '/images/stores/Prince-Street-Pizza.png', logoUrl: '/images/logos/Prince-Street-Pizza.png', storeName: 'Prince Street Pizza', category: 'Pizza, Italian' },
    { id: 111, imageUrl: '/images/stores/Sonoratown.png', logoUrl: '/images/logos/Sonoratown.png', storeName: 'Sonoratown', category: 'Mexican, Tacos' },
    { id: 112, imageUrl: '/images/stores/Silverlake-Ramen.png', logoUrl: '/images/logos/Silverlake-Ramen.png', storeName: 'Silverlake Ramen', category: 'Ramen, Japanese' },
    { id: 113, imageUrl: '/images/stores/Hungry-Cowgirl.png', logoUrl: '/images/logos/Hungry-Cowgirl.png', storeName: 'Hungry Cowgirl', category: 'Bowls, Healthy' },
    { id: 114, imageUrl: '/images/stores/Teriyaki-Madness.png', logoUrl: '/images/logos/Teriyaki-Madness.png', storeName: 'Teriyaki Madness', category: 'Teriyaki, Japanese' },
    { id: 115, imageUrl: '/images/stores/Sweetfin.png', logoUrl: '/images/logos/Sweetfin.png', storeName: 'Sweetfin', category: 'Poke, Bowls' },
    { id: 116, imageUrl: '/images/stores/California-Chicken-Cafe.png', logoUrl: '/images/logos/California-Chicken-Cafe.png', storeName: 'California Chicken', category: 'Chicken, Wraps' },
  ]

  return (
    <div className="app">
      {/* Header */}
      <Header
        logoUrl="/images/general/Logo.svg"
        locationName="CSS - Los Angeles"
        orderTiming="Today, Lunch"
        countdownText="3hr 13m"
        onLogoClick={() => {}}
        onLocationClick={() => {}}
        onTeamOrderClick={() => {}}
        onBasketClick={() => {}}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Banner */}
        <div className="banner-section">
          <Banner
            title="Sweetgreen + Function menu is here"
            subtitle="Start 2026 with 5 new nutrient-rich meals designed for longevity, wellness and focus"
            ctaText="View new items →"
            onCtaClick={() => {}}
            theme="dark"
            imageUrl="/images/banners/SweetgreenxFunction.png"
          />
        </div>

        {/* Filter Chips */}
        <div className="filter-section">
          <FilterChipCarousel
            chips={filterChips}
            activeChipId={null}
            onChipClick={() => {}}
            gap={8}
          />
        </div>

        {/* Featured Items */}
        <div className="carousel-section">
          <ItemCarousel
            title="Featured items"
            items={featuredItems}
            visibleCount={5}
            gap={16}
            showFavoriteButton={false}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Budget Items */}
        <div className="carousel-section">
          <ItemCarousel
            title="$15.00 & under"
            items={budgetItems}
            visibleCount={5}
            gap={16}
            showFavoriteButton={false}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Order Again */}
        <div className="carousel-section">
          <ItemCarousel
            title="Order again"
            items={orderAgainItems}
            visibleCount={5}
            gap={16}
            onItemClick={handleItemClick}
          />
        </div>

        {/* New Items */}
        <div className="carousel-section">
          <ItemCarousel
            title="New on Picnic"
            items={newItems}
            visibleCount={5}
            gap={16}
            showFavoriteButton={false}
            onItemClick={handleItemClick}
          />
        </div>

        {/* Popular Stores */}
        <div className="carousel-section">
          <StoreCarousel
            title="Popular restaurants"
            stores={popularStores}
            visibleCount={4}
            gap={16}
            onStoreClick={() => {}}
          />
        </div>

        {/* New Stores */}
        <div className="carousel-section">
          <StoreCarousel
            title="New on Picnic"
            subtitle="Recently added restaurants in your area"
            stores={newStores}
            visibleCount={4}
            gap={16}
            onStoreClick={() => {}}
          />
        </div>

        {/* All Stores Grid */}
        <div className="stores-grid-section">
          <h2 className="section-title">All restaurants</h2>
          <div className="stores-grid">
            {allStores.map((store) => (
              <StoreCard
                key={store.id}
                imageUrl={store.imageUrl}
                logoUrl={store.logoUrl}
                storeName={store.storeName}
                category={store.category}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Panel - Fixed at bottom */}
      <div className="floating-panel-container">
        <FloatingPanel
          upcomingCount={scheduledOrders.length + 1}
          isExpanded={isPanelExpanded}
          activeOrder={{
            status: 'Order en route',
            restaurant: 'Cava',
            itemCount: 1,
            eta: '12:00pm',
            progress: 64,
            avatarUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
          }}
          scheduledOrders={scheduledOrders}
          highlightedOrderId={highlightedOrderId}
          onToggle={() => setIsPanelExpanded(!isPanelExpanded)}
          onViewRotation={() => console.log('View rotation')}
        />
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal
          isOpen={isModalOpen}
          imageUrl={selectedItem.imageUrl}
          itemName={selectedItem.dishName}
          description={`Delicious ${selectedItem.dishName} from ${selectedItem.restaurantName}. Made with fresh, quality ingredients.`}
          tags={[
            { id: 1, label: 'Popular' },
            { id: 2, label: 'Chef\'s Pick' },
          ]}
          nutrition={{
            calories: 650,
            fat: '28g',
            carbs: '54g',
            protein: '38g',
          }}
          customizations={sampleCustomizations}
          basePrice={selectedItem.price}
          onClose={handleCloseModal}
          onAddToBasket={(selections, total) => {
            console.log('Added to basket:', selectedItem.dishName, 'Selections:', selections, 'Total:', total)
            handleCloseModal()
          }}
          onScheduleMeal={(date) => handleScheduleOrder(date, selectedItem)}
        />
      )}
    </div>
  )
}

export default App
