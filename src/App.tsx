import { useState } from 'react'
import { ItemCard, StoreCard, ItemCarousel, StoreCarousel, FilterChip, FilterChipCarousel, Header, Banner } from './lib'
import type { ItemCarouselItem, StoreCarouselItem, FilterChipItem } from './lib'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [activeFilter, setActiveFilter] = useState<string | number | null>('price')

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filterChips: FilterChipItem[] = [
    { id: 'price', label: '$15 & Under', icon: '/images/filter-chips/$15 & Under.png' },
    { id: 'bowls', label: 'Bowls', icon: '/images/filter-chips/Bowls.png' },
    { id: 'limited', label: 'Limited time', icon: '/images/filter-chips/Limited time.png' },
    { id: 'top', label: 'Top rated', icon: '/images/filter-chips/Top rated.png' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '/images/filter-chips/Vegetarian.png' },
    { id: 'salads', label: 'Salads', icon: '/images/filter-chips/Salads.png' },
    { id: 'sushi', label: 'Sushi', icon: '/images/filter-chips/Sushi.png' },
    { id: 'mexican', label: 'Mexican', icon: '/images/filter-chips/Mexican.png' },
    { id: 'poke', label: 'Poke', icon: '/images/filter-chips/Poke.png' },
    { id: 'chinese', label: 'Chinese', icon: '/images/filter-chips/Chinese.png' },
    { id: 'sandwiches', label: 'Sandwiches', icon: '/images/filter-chips/sandwiches.png' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '/images/filter-chips/Mediteranean.png' },
    { id: 'sides', label: 'Sides', icon: '/images/filter-chips/Sides.png' },
  ]

  const menuItems = [
    {
      id: 1,
      imageUrl: '/images/items/Din-Tai-Fung--Shrimp-Fried-Noodles.png',
      restaurantLogo: '/images/logos/Din-Tai-Fung.png',
      restaurantName: 'Din Tai Fung',
      dishName: 'Shrimp Fried Noodles',
      price: 17.95,
      badgeText: 'Today only',
    },
    {
      id: 2,
      imageUrl: '/images/items/Ggiata--The-Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/Ggiata.png',
      restaurantName: 'Ggiata',
      dishName: 'The Chicken Caesar Wrap',
      price: 14.99,
      badgeText: '2 left',
      badgeColor: '#1a73e8',
    },
    {
      id: 3,
      imageUrl: '/images/stores/Prince-Street-Pizza.png',
      restaurantLogo: '/images/logos/Prince-Street-Pizza.png',
      restaurantName: 'Prince Street Pizza',
      dishName: 'Pepperoni Square',
      price: 14.99,
    },
    {
      id: 4,
      imageUrl: '/images/stores/Farm-Stand.png',
      restaurantLogo: '/images/logos/Farm-Stand.png',
      restaurantName: 'Farm Stand',
      dishName: 'Pesto Chopped Salad',
      price: 9.99,
      originalPrice: 11.99,
      discount: true,
      badgeText: '$2 off',
    },
  ]

  const stores = [
    {
      id: 1,
      imageUrl: '/images/stores/Ggiata.png',
      logoUrl: '/images/logos/Ggiata.png',
      storeName: 'Ggiata',
      category: 'Sandwiches, Italian',
      badgeText: 'Picnic Debut',
    },
    {
      id: 2,
      imageUrl: '/images/stores/Cava.png',
      logoUrl: '/images/logos/Cava.png',
      storeName: 'Cava',
      category: 'Mediterranean, Bowls',
      badgeText: '1 order left',
    },
    {
      id: 3,
      imageUrl: '/images/stores/Zankou-Chicken.png',
      logoUrl: '/images/logos/Zankou-Chicken.png',
      storeName: 'Zankou Chicken',
      category: 'Chicken, Mediterranean',
    },
  ]

  const carouselItems: ItemCarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/items/Shake-Shack--ShackBurger.png',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      restaurantName: 'Shake Shack',
      dishName: 'ShackBurger',
      price: 12.49,
    },
    {
      id: 2,
      imageUrl: '/images/stores/Prince-Street-Pizza.png',
      restaurantLogo: '/images/logos/Prince-Street-Pizza.png',
      restaurantName: 'Prince Street Pizza',
      dishName: 'Pepperoni Square',
      price: 14.99,
      badgeText: 'Popular',
      badgeColor: '#1a73e8',
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
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Harissa Chicken Bowl',
      price: 13.50,
    },
    {
      id: 5,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      restaurantName: 'Mendocino Farms',
      dishName: 'Impossible Taco Salad',
      price: 14.99,
      badgeText: 'New',
    },
    {
      id: 6,
      imageUrl: '/images/items/Ggiata--The-Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/Ggiata.png',
      restaurantName: 'Ggiata',
      dishName: 'The Chicken Caesar Wrap',
      price: 15.99,
    },
    {
      id: 7,
      imageUrl: '/images/stores/Sonoratown.png',
      restaurantLogo: '/images/logos/Sonoratown.png',
      restaurantName: 'Sonoratown',
      dishName: 'Carne Asada Tacos',
      price: 12.49,
    },
    {
      id: 8,
      imageUrl: '/images/stores/Sugarfish.png',
      restaurantLogo: '/images/logos/Sugarfish.png',
      restaurantName: 'Sugarfish',
      dishName: 'Trust Me Lite',
      price: 28.99,
      originalPrice: 32.99,
      discount: true,
      badgeText: '$4 off',
    },
  ]

  const carouselStores: StoreCarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/stores/Ggiata.png',
      logoUrl: '/images/logos/Ggiata.png',
      storeName: 'Ggiata',
      category: 'Sandwiches, Italian',
      badgeText: 'Picnic Debut',
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
      imageUrl: '/images/stores/Zankou-Chicken.png',
      logoUrl: '/images/logos/Zankou-Chicken.png',
      storeName: 'Zankou Chicken',
      category: 'Chicken, Mediterranean',
      badgeText: 'Local hero',
      badgeColor: '#d93025',
    },
    {
      id: 4,
      imageUrl: '/images/stores/Din-Tai-Fung.png',
      logoUrl: '/images/logos/Din-Tai-Fung.png',
      storeName: 'Din Tai Fung',
      category: 'Dumplings, Taiwanese',
    },
    {
      id: 5,
      imageUrl: '/images/stores/Shake-Shack.png',
      logoUrl: '/images/logos/Shake-Shack.png',
      storeName: 'Shake Shack',
      category: 'Burgers, American',
    },
    {
      id: 6,
      imageUrl: '/images/stores/Sweetgreen.png',
      logoUrl: '/images/logos/Sweetgreen.png',
      storeName: 'Sweetgreen',
      category: 'Salads, Healthy',
      badgeText: 'New',
    },
  ]

  const sections = [
    { id: 'item-card', label: 'ItemCard' },
    { id: 'store-card', label: 'StoreCard' },
    { id: 'item-carousel', label: 'ItemCarousel' },
    { id: 'store-carousel', label: 'StoreCarousel' },
    { id: 'filter-chip', label: 'FilterChip' },
    { id: 'filter-chip-carousel', label: 'FilterChipCarousel' },
    { id: 'banner', label: 'Banner' },
    { id: 'header', label: 'Header' },
  ]

  return (
    <div className="app">
      <h1>Picnic Components</h1>

      {/* Navigation */}
      <nav className="nav">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="nav-link">
            {section.label}
          </a>
        ))}
      </nav>

      {/* ItemCard Section */}
      <div className="section" id="item-card">
        <h2>ItemCard</h2>
        <div className="cards-grid">
          {menuItems.map((item) => (
            <ItemCard
              key={item.id}
              imageUrl={item.imageUrl}
              restaurantLogo={item.restaurantLogo}
              restaurantName={item.restaurantName}
              dishName={item.dishName}
              price={item.price}
              originalPrice={item.originalPrice}
              discount={item.discount}
              badgeText={item.badgeText}
              badgeColor={item.badgeColor}
              isFavorited={favorites.has(item.id)}
              onFavorite={() => toggleFavorite(item.id)}
              onClick={() => console.log(`Clicked: ${item.dishName}`)}
            />
          ))}
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<ItemCard
  imageUrl="https://..."
  restaurantLogo="https://..."
  restaurantName="Din Tai Fung"
  dishName="Shrimp Fried Noodles"
  price={17.95}
  badgeText="Today only"
  onClick={() => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>badgeText</code> <code>badgeColor</code> <code>discount</code> <code>originalPrice</code> <code>isFavorited</code>
          </p>
        </div>
      </div>

      {/* StoreCard Section */}
      <div className="section" id="store-card">
        <h2>StoreCard</h2>
        <div className="cards-grid">
          {stores.map((store) => (
            <div key={store.id} style={{ width: 290 }}>
              <StoreCard
                imageUrl={store.imageUrl}
                logoUrl={store.logoUrl}
                storeName={store.storeName}
                category={store.category}
                badgeText={store.badgeText}
                onClick={() => console.log(`Clicked: ${store.storeName}`)}
              />
            </div>
          ))}
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<StoreCard
  imageUrl="https://..."
  logoUrl="https://..."
  storeName="Ggiata"
  category="Sandwiches, Wraps"
  badgeText="Picnic Debut"
  onClick={() => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>logoUrl</code> <code>badgeText</code> <code>badgeColor</code> <code>showLogo</code>
          </p>
        </div>
      </div>

      {/* ItemCarousel Section */}
      <div className="section" id="item-carousel">
        <h2>ItemCarousel</h2>
        <div style={{ width: '100%' }}>
          <ItemCarousel
            title="Featured items"
            items={carouselItems}
            visibleCount={5}
            gap={16}
            favoritedIds={favorites as Set<string | number>}
            onItemClick={(item) => console.log(`Clicked: ${item.dishName}`)}
            onItemFavorite={(item) => toggleFavorite(item.id as number)}
          />
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<ItemCarousel
  title="Featured items"
  items={[...]}
  visibleCount={5}
  gap={16}
  onItemClick={(item) => {}}
  onItemFavorite={(item) => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>title</code> <code>visibleCount</code> <code>gap</code> <code>favoritedIds</code> <code>showArrows</code>
          </p>
        </div>
      </div>

      {/* StoreCarousel Section */}
      <div className="section" id="store-carousel">
        <h2>StoreCarousel</h2>
        <div style={{ width: '100%' }}>
          <StoreCarousel
            title="Available today"
            subtitle="Hurry up! These restaurants won't be around until next Thursday"
            stores={carouselStores}
            visibleCount={4}
            gap={16}
            onStoreClick={(store) => console.log(`Clicked: ${store.storeName}`)}
          />
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<StoreCarousel
  title="Available today"
  subtitle="Limited time only!"
  stores={[...]}
  visibleCount={4}
  gap={16}
  onStoreClick={(store) => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>title</code> <code>subtitle</code> <code>visibleCount</code> <code>gap</code> <code>showArrows</code>
          </p>
        </div>
      </div>

      {/* FilterChip Section */}
      <div className="section" id="filter-chip">
        <h2>FilterChip</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <FilterChip label="$15 & Under" icon="/images/filter-chips/$15 & Under.png" isActive={true} />
          <FilterChip label="Bowls" icon="/images/filter-chips/Bowls.png" />
          <FilterChip label="Limited time" icon="/images/filter-chips/Limited time.png" />
          <FilterChip label="Top rated" icon="/images/filter-chips/Top rated.png" />
          <FilterChip label="Vegetarian" icon="/images/filter-chips/Vegetarian.png" />
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<FilterChip
  label="$15.00 & under"
  icon="🥗"
  isActive={true}
  onClick={() => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>label</code> <code>icon</code> <code>isActive</code> <code>onClick</code>
          </p>
        </div>
      </div>

      {/* FilterChipCarousel Section */}
      <div className="section" id="filter-chip-carousel">
        <h2>FilterChipCarousel</h2>
        <div style={{ width: '100%' }}>
          <FilterChipCarousel
            chips={filterChips}
            activeChipId={activeFilter}
            onChipClick={(chip) => setActiveFilter(chip.id === activeFilter ? null : chip.id)}
            gap={8}
          />
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<FilterChipCarousel
  chips={[
    { id: 'price', label: '$15.00 & under', icon: '🥗' },
    { id: 'bowls', label: 'Bowls', icon: '🍲' },
    ...
  ]}
  activeChipId="price"
  onChipClick={(chip) => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>chips</code> <code>activeChipId</code> <code>onChipClick</code> <code>gap</code> <code>showArrows</code>
          </p>
        </div>
      </div>

      {/* Banner Section */}
      <div className="section" id="banner">
        <h2>Banner</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Banner
            title="Sweetgreen + Function menu is here"
            subtitle="Start 2026 with 5 new nutrient-rich meals designed for longevity, wellness and focus"
            ctaText="View new items →"
            onCtaClick={() => console.log('CTA clicked')}
            theme="dark"
            imageUrl="/images/banners/SweetgreenxFunction.png"
          />
          <Banner
            title="Free delivery on your first order"
            subtitle="Use code WELCOME at checkout"
            ctaText="Order now"
            theme="teal"
          />
          <Banner
            title="Limited time: 20% off bowls"
            subtitle="Fresh ingredients, bold flavors"
            ctaText="See deals"
            theme="orange"
          />
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<Banner
  title="Sweetgreen + Function menu is here"
  subtitle="Start 2026 with new meals..."
  ctaText="View new items →"
  onCtaClick={() => {}}
  theme="dark"
  imageUrl="https://..."
  logo={<LogoIcon />}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>title</code> <code>subtitle</code> <code>ctaText</code> <code>theme</code> <code>imageUrl</code> <code>logo</code> <code>backgroundColor</code> <code>textColor</code>
          </p>
        </div>
      </div>

      {/* Header Section */}
      <div className="section" id="header">
        <h2>Header</h2>
        <div style={{ width: '100%' }}>
          <Header
            logoUrl="/images/general/Logo.svg"
            locationName="CSS - Los Angeles"
            orderTiming="Today, Lunch"
            countdownText="3hr 13m"
            onLogoClick={() => console.log('Logo clicked')}
            onLocationClick={() => console.log('Location clicked')}
            onTeamOrderClick={() => console.log('Team order clicked')}
            onBasketClick={() => console.log('Basket clicked')}
          />
        </div>
        <div className="usage">
          <h3>Usage</h3>
          <pre>
            <code>{`<Header
  locationName="CSS - Los Angeles"
  orderTiming="Today, Lunch"
  countdownText="3hr 13m"
  basketCount={3}
  onLogoClick={() => {}}
  onLocationClick={() => {}}
  onTeamOrderClick={() => {}}
  onBasketClick={() => {}}
/>`}</code>
          </pre>
          <p className="props-caption">
            Props shown: <code>locationName</code> <code>orderTiming</code> <code>countdownText</code> <code>basketCount</code> <code>logoUrl</code>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
