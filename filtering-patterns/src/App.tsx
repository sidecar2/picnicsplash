import {
  Header,
  Banner,
  FilterChipCarousel,
  ItemCarousel,
  StoreCarousel,
  StoreCard,
  ItemCard,
} from 'picnic-eater-components'
import type { FilterChipItem, ItemCarouselItem, StoreCarouselItem } from 'picnic-eater-components'
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

// Extended item type with categories for filtering
interface FilterableItem extends ItemCarouselItem {
  categories: string[]
  isPrototypeFiller?: boolean
}

type SortOption = 'popularity' | 'price'
type DietaryOption = 'vegetarian' | 'vegan' | 'gluten-free'
type PriceOption = 'under-15' | '15-20' | 'over-20'

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'popularity', label: 'By popularity' },
  { value: 'price', label: 'By price' },
]

const DIETARY_OPTIONS: Array<{ value: DietaryOption; label: string }> = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten free' },
]

const PRICE_OPTIONS: Array<{ value: PriceOption; label: string }> = [
  { value: 'under-15', label: 'Under $15' },
  { value: '15-20', label: '$15 - $20' },
  { value: 'over-20', label: 'Over $20' },
]

function App() {
  const [activeFilter, setActiveFilter] = useState<string | number | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [dietaryFilter, setDietaryFilter] = useState<DietaryOption | null>(null)
  const [priceFilter, setPriceFilter] = useState<PriceOption | null>(null)
  const [isDietaryDropdownOpen, setIsDietaryDropdownOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const dietaryDropdownRef = useRef<HTMLDivElement | null>(null)
  const priceDropdownRef = useRef<HTMLDivElement | null>(null)
  const sortDropdownRef = useRef<HTMLDivElement | null>(null)
  const isPriceChipActive = activeFilter === 'price'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        dietaryDropdownRef.current?.contains(target) ||
        priceDropdownRef.current?.contains(target) ||
        sortDropdownRef.current?.contains(target)
      ) {
        return
      }

      setIsDietaryDropdownOpen(false)
      setIsPriceDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!isPriceChipActive) return
    setPriceFilter(null)
    setIsPriceDropdownOpen(false)
  }, [isPriceChipActive])

  // Filter chips data
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

  // Item carousel data - Featured items
  const featuredItems: ItemCarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/items/Ggiata--The-Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/Ggiata.png',
      restaurantName: 'Ggiata',
      dishName: 'The Chicken Caesar Wrap',
      price: 14.99,
      badgeText: 'Today only',
    },
    {
      id: 2,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      restaurantName: 'Mendocino Farms',
      dishName: 'Impossible Taco Salad',
      price: 16.00,
      badgeText: 'New',
      badgeColor: '#141414',
    },
    {
      id: 3,
      imageUrl: '/images/items/Din-Tai-Fung--Shrimp-Fried-Noodles.png',
      restaurantLogo: '/images/logos/Din-Tai-Fung.png',
      restaurantName: 'Din Tai Fung',
      dishName: 'Shrimp Fried Noodles',
      price: 17.95,
      badgeText: 'Popular',
    },
    {
      id: 4,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Harvest Bowl',
      price: 14.50,
      badgeText: '$2 off',
      badgeColor: '#00796b',
    },
    {
      id: 5,
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Harissa Chicken Bowl',
      price: 13.95,
    },
    {
      id: 6,
      imageUrl: '/images/stores/Sugarfish.png',
      restaurantLogo: '/images/logos/Sugarfish.png',
      restaurantName: 'Sugarfish',
      dishName: 'Trust Me Lite',
      price: 28.00,
    },
    {
      id: 7,
      imageUrl: '/images/stores/Sonoratown.png',
      restaurantLogo: '/images/logos/Sonoratown.png',
      restaurantName: 'Sonoratown',
      dishName: 'Carne Asada Tacos',
      price: 12.49,
      badgeText: 'Local fave',
      badgeColor: '#d93025',
    },
    {
      id: 8,
      imageUrl: '/images/stores/Chipotle.png',
      restaurantLogo: '/images/logos/Chipotle.png',
      restaurantName: 'Chipotle',
      dishName: 'Chicken Burrito Bowl',
      price: 11.95,
    },
    {
      id: 9,
      imageUrl: '/images/items/Shake-Shack--ShackBurger.png',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      restaurantName: 'Shake Shack',
      dishName: 'ShackBurger',
      price: 12.49,
    },
  ]

  // Items under $15
  const budgetItems: ItemCarouselItem[] = [
    {
      id: 101,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      restaurantLogo: '/images/logos/Chipotle.png',
      restaurantName: 'Chipotle',
      dishName: 'Chicken Bowl',
      price: 11.95,
    },
    {
      id: 102,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      restaurantLogo: '/images/logos/Hiho-CheeseBurger.png',
      restaurantName: 'Hiho Cheeseburger',
      dishName: 'Single Cheeseburger',
      price: 12.49,
      badgeText: '$2 off',
      badgeColor: '#00796b',
      discount: true,
      originalPrice: 14.49,
    },
    {
      id: 103,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Greens + Grains Bowl',
      price: 13.50,
    },
    {
      id: 104,
      imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400',
      restaurantLogo: '/images/logos/Loqui.png',
      restaurantName: 'Loqui',
      dishName: 'Carnitas Tacos (3)',
      price: 11.95,
      badgeText: 'Popular',
    },
    {
      id: 105,
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      restaurantLogo: '/images/logos/Teriyaki-Madness.png',
      restaurantName: 'Teriyaki Madness',
      dishName: 'Chicken Teriyaki Bowl',
      price: 10.95,
    },
    {
      id: 106,
      imageUrl: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400',
      restaurantLogo: '/images/logos/Ghost-Sando.png',
      restaurantName: 'Ghost Sando',
      dishName: 'Egg Salad Sando',
      price: 13.95,
      badgeText: 'New',
      badgeColor: '#00796b',
    },
    {
      id: 107,
      imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
      restaurantLogo: '/images/logos/Tocaya.png',
      restaurantName: 'Tocaya',
      dishName: 'Chicken Burrito',
      price: 14.50,
    },
    {
      id: 108,
      imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400',
      restaurantLogo: '/images/logos/Sushi-Enya.png',
      restaurantName: 'Sushi Enya',
      dishName: 'Salmon Roll',
      price: 12.99,
    },
    {
      id: 109,
      imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Kale Caesar',
      price: 9.99,
      badgeText: '$3 off',
      badgeColor: '#00796b',
      discount: true,
      originalPrice: 12.99,
    },
    {
      id: 110,
      imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      restaurantName: 'Shake Shack',
      dishName: 'Shack Stack',
      price: 11.49,
    },
  ]

  // All filterable items with category tags
  const allFilterableItems: FilterableItem[] = [
    // Under $15 items
    {
      id: 501,
      imageUrl: '/images/items/Cava--Harissa-Chicken-Bowl.png',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Harissa Chicken Bowl',
      price: 13.95,
      categories: ['price', 'bowls', 'mediterranean', 'top'],
    },
    {
      id: 502,
      imageUrl: '/images/items/Sweetgreen--Harvest-Bowl.png',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Harvest Bowl',
      price: 14.50,
      categories: ['price', 'bowls', 'salads', 'vegetarian', 'vegan', 'gluten-free', 'top'],
    },
    {
      id: 503,
      imageUrl: '/images/items/Shake-Shack--ShackBurger.png',
      restaurantLogo: '/images/logos/Shake-Shack.png',
      restaurantName: 'Shake Shack',
      dishName: 'ShackBurger',
      price: 12.49,
      categories: ['price', 'top'],
    },
    {
      id: 504,
      imageUrl: '/images/items/Ggiata--The-Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/Ggiata.png',
      restaurantName: 'Ggiata',
      dishName: 'The Chicken Caesar Wrap',
      price: 14.99,
      categories: ['price', 'sandwiches', 'top'],
    },
    {
      id: 505,
      imageUrl: '/images/stores/Chipotle.png',
      restaurantLogo: '/images/logos/Chipotle.png',
      restaurantName: 'Chipotle',
      dishName: 'Chicken Burrito Bowl',
      price: 11.95,
      categories: ['price', 'bowls', 'mexican'],
    },
    {
      id: 506,
      imageUrl: '/images/stores/Sonoratown.png',
      restaurantLogo: '/images/logos/Sonoratown.png',
      restaurantName: 'Sonoratown',
      dishName: 'Carne Asada Tacos',
      price: 12.49,
      categories: ['price', 'mexican', 'top'],
    },
    {
      id: 507,
      imageUrl: '/images/stores/Zankou-Chicken.png',
      restaurantLogo: '/images/logos/Zankou-Chicken.png',
      restaurantName: 'Zankou Chicken',
      dishName: 'Chicken Tarna Plate',
      price: 13.99,
      categories: ['price', 'mediterranean'],
    },
    {
      id: 508,
      imageUrl: '/images/stores/Loqui.png',
      restaurantLogo: '/images/logos/Loqui.png',
      restaurantName: 'Loqui',
      dishName: 'Carnitas Tacos (3)',
      price: 11.95,
      categories: ['price', 'mexican', 'top'],
    },
    // Bowls
    {
      id: 509,
      imageUrl: '/images/stores/Sweetfin.png',
      restaurantLogo: '/images/logos/Sweetfin.png',
      restaurantName: 'Sweetfin',
      dishName: 'Spicy Tuna Bowl',
      price: 16.95,
      categories: ['bowls', 'poke', 'sushi'],
    },
    {
      id: 510,
      imageUrl: '/images/stores/Tocaya.png',
      restaurantLogo: '/images/logos/Tocaya.png',
      restaurantName: 'Tocaya',
      dishName: 'Veggie Bowl',
      price: 14.50,
      categories: ['price', 'bowls', 'mexican', 'vegetarian', 'vegan', 'gluten-free'],
    },
    // Sushi
    {
      id: 511,
      imageUrl: '/images/stores/Sugarfish.png',
      restaurantLogo: '/images/logos/Sugarfish.png',
      restaurantName: 'Sugarfish',
      dishName: 'Trust Me Lite',
      price: 28.00,
      categories: ['sushi', 'top'],
    },
    {
      id: 512,
      imageUrl: '/images/stores/Sushi-Enya.png',
      restaurantLogo: '/images/logos/Sushi-Enya.png',
      restaurantName: 'Sushi Enya',
      dishName: 'Chef\'s Selection',
      price: 24.00,
      categories: ['sushi'],
    },
    // Sandwiches
    {
      id: 513,
      imageUrl: '/images/stores/Ghost-Sando.png',
      restaurantLogo: '/images/logos/Ghost-Sando.png',
      restaurantName: 'Ghost Sando',
      dishName: 'Egg Salad Sando',
      price: 13.95,
      categories: ['price', 'sandwiches'],
    },
    {
      id: 514,
      imageUrl: '/images/stores/Jersey-Mikes.png',
      restaurantLogo: '/images/logos/Jersey-Mikes.png',
      restaurantName: "Jersey Mike's",
      dishName: 'Italian Sub',
      price: 12.99,
      categories: ['price', 'sandwiches'],
    },
    // Salads
    {
      id: 515,
      imageUrl: '/images/items/Mendocino-Farms--Impossible-Taco-Salad.png',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      restaurantName: 'Mendocino Farms',
      dishName: 'Impossible Taco Salad',
      price: 16.00,
      categories: ['salads', 'vegetarian', 'vegan', 'gluten-free'],
    },
    // Chinese
    {
      id: 516,
      imageUrl: '/images/items/Din-Tai-Fung--Shrimp-Fried-Noodles.png',
      restaurantLogo: '/images/logos/Din-Tai-Fung.png',
      restaurantName: 'Din Tai Fung',
      dishName: 'Shrimp Fried Noodles',
      price: 17.95,
      categories: ['chinese', 'top'],
    },
    {
      id: 517,
      imageUrl: '/images/stores/Pine-and-Crane.png',
      restaurantLogo: '/images/logos/Pine-and-Crane.png',
      restaurantName: 'Pine & Crane',
      dishName: 'Dan Dan Noodles',
      price: 14.50,
      categories: ['price', 'chinese'],
    },
    // Limited time
    {
      id: 518,
      imageUrl: '/images/stores/Erewhon-Market.png',
      restaurantLogo: '/images/logos/Erewhon-Market.png',
      restaurantName: 'Erewhon Market',
      dishName: 'Hailey Bieber Smoothie',
      price: 19.00,
      badgeText: 'Limited',
      badgeColor: '#d93025',
      categories: ['limited', 'top'],
    },
    {
      id: 519,
      imageUrl: '/images/stores/Levain-Bakery.png',
      restaurantLogo: '/images/logos/Levain-Bakery.png',
      restaurantName: 'Levain Bakery',
      dishName: 'Chocolate Chip Cookie',
      price: 5.00,
      badgeText: 'Limited',
      badgeColor: '#d93025',
      categories: ['price', 'limited'],
    },
    // Poke
    {
      id: 520,
      imageUrl: '/images/stores/Nuc-Poke.png',
      restaurantLogo: '/images/logos/Nuc-Poke.png',
      restaurantName: 'Nuc Poke',
      dishName: 'Signature Poke Bowl',
      price: 15.95,
      categories: ['poke', 'bowls'],
    },
    // New items with actual dish photos
    {
      id: 521,
      imageUrl: "/images/items/Ben's-Fast-Food--Chicken-Rice-Bowl.png",
      restaurantLogo: "/images/logos/Ben's-Fast-Food.png",
      restaurantName: "Ben's Fast Food",
      dishName: 'Chicken Rice Bowl',
      price: 12.95,
      categories: ['price', 'bowls'],
    },
    {
      id: 522,
      imageUrl: '/images/items/Brekki-Bagels--Brekki-Sando.png',
      restaurantLogo: '/images/logos/Brekki-Bagels.png',
      restaurantName: 'Brekki Bagels',
      dishName: 'Brekki Sando',
      price: 13.50,
      categories: ['price', 'sandwiches'],
    },
    {
      id: 523,
      imageUrl: '/images/items/California-Chicken-Cafe--Chicken-Caesar-Wrap.png',
      restaurantLogo: '/images/logos/California-Chicken-Cafe.png',
      restaurantName: 'California Chicken Cafe',
      dishName: 'Chicken Caesar Wrap',
      price: 11.99,
      categories: ['price', 'sandwiches'],
    },
    {
      id: 524,
      imageUrl: '/images/items/Hungry-Cowgirl-Southwest-Bowl.png',
      restaurantLogo: '/images/logos/Hungry-Cowgirl.png',
      restaurantName: 'Hungry Cowgirl',
      dishName: 'Southwest Bowl',
      price: 14.50,
      categories: ['price', 'bowls', 'mexican'],
    },
    {
      id: 525,
      imageUrl: '/images/items/Sweetfin-Chicken-Bahn-Mi-Bowl.png',
      restaurantLogo: '/images/logos/Sweetfin.png',
      restaurantName: 'Sweetfin',
      dishName: 'Chicken Banh Mi Bowl',
      price: 16.95,
      categories: ['bowls', 'poke'],
    },
    {
      id: 526,
      imageUrl: '/images/items/Sweetgreen--Create-your-own.png',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Create Your Own',
      price: 13.95,
      categories: ['price', 'salads', 'bowls', 'vegetarian', 'vegan', 'gluten-free'],
    },
    // New items batch
    {
      id: 527,
      imageUrl: '/images/items/Erewhon--Kale-Coconut-Smoothie.png',
      restaurantLogo: '/images/logos/Erewhon-Market.png',
      restaurantName: 'Erewhon Market',
      dishName: 'Kale Coconut Smoothie',
      price: 17.00,
      categories: ['vegetarian', 'vegan', 'gluten-free', 'top'],
    },
    {
      id: 528,
      imageUrl: '/images/items/Levain-Bakery--Double-Chocolate-Chip.png',
      restaurantLogo: '/images/logos/Levain-Bakery.png',
      restaurantName: 'Levain Bakery',
      dishName: 'Double Chocolate Chip Cookie',
      price: 5.50,
      categories: ['price'],
    },
    {
      id: 529,
      imageUrl: '/images/items/Pine-and-Crane--3-Cup-Chicken.png',
      restaurantLogo: '/images/logos/Pine-and-Crane.png',
      restaurantName: 'Pine & Crane',
      dishName: '3 Cup Chicken',
      price: 15.50,
      categories: ['chinese'],
    },
    {
      id: 530,
      imageUrl: '/images/items/Pita-Dust--Oasis-Bowl.png',
      restaurantLogo: '/images/logos/Pita-Dust.png',
      restaurantName: 'Pita Dust',
      dishName: 'Oasis Bowl',
      price: 14.95,
      categories: ['price', 'bowls', 'mediterranean'],
    },
    {
      id: 531,
      imageUrl: '/images/items/Starbucks--Cold-Brew-Reserve.png',
      restaurantLogo: '/images/logos/Starbucks.png',
      restaurantName: 'Starbucks',
      dishName: 'Cold Brew Reserve',
      price: 6.95,
      categories: ['price'],
    },
    {
      id: 532,
      imageUrl: '/images/items/Sweetgreen--Spicy-Reset-Bowl.png',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Spicy Reset Bowl',
      price: 15.95,
      categories: ['bowls', 'salads', 'vegetarian', 'vegan', 'gluten-free'],
    },
    {
      id: 533,
      imageUrl: '/images/items/Talo-Organic--Chicken-Broccoli-Plate.png',
      restaurantLogo: '/images/logos/Talo-Organic.png',
      restaurantName: 'Talo Organic',
      dishName: 'Chicken Broccoli Plate',
      price: 14.50,
      categories: ['price', 'bowls', 'top'],
    },
    // Additional prototype-only filler items (kept lower priority than real assets)
    {
      id: 534,
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Sweetgreen.png',
      restaurantName: 'Sweetgreen',
      dishName: 'Citrus Avocado Crunch',
      price: 15.25,
      categories: ['salads', 'vegetarian', 'vegan', 'gluten-free'],
      isPrototypeFiller: true,
    },
    {
      id: 535,
      imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Cava.png',
      restaurantName: 'Cava',
      dishName: 'Zaatar Falafel Bowl',
      price: 16.25,
      categories: ['bowls', 'mediterranean', 'vegetarian', 'vegan'],
      isPrototypeFiller: true,
    },
    {
      id: 536,
      imageUrl: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Mendocino-Farms.png',
      restaurantName: 'Mendocino Farms',
      dishName: 'Green Goddess Chop',
      price: 17.50,
      categories: ['salads', 'vegetarian', 'gluten-free', 'top'],
      isPrototypeFiller: true,
    },
    {
      id: 537,
      imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Chipotle.png',
      restaurantName: 'Chipotle',
      dishName: 'Steak Fajita Bowl',
      price: 14.95,
      categories: ['price', 'bowls', 'mexican', 'top'],
      isPrototypeFiller: true,
    },
    {
      id: 538,
      imageUrl: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Tocaya.png',
      restaurantName: 'Tocaya',
      dishName: 'Cali Lime Tacos',
      price: 13.75,
      categories: ['price', 'mexican'],
      isPrototypeFiller: true,
    },
    {
      id: 539,
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Sugarfish.png',
      restaurantName: 'Sugarfish',
      dishName: 'Salmon Set',
      price: 22.00,
      categories: ['sushi', 'top'],
      isPrototypeFiller: true,
    },
    {
      id: 540,
      imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Sweetfin.png',
      restaurantName: 'Sweetfin',
      dishName: 'Yuzu Poke Bowl',
      price: 16.75,
      categories: ['poke', 'bowls', 'sushi'],
      isPrototypeFiller: true,
    },
    {
      id: 541,
      imageUrl: 'https://images.unsplash.com/photo-1512058564366-c9e3e046f621?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Ggiata.png',
      restaurantName: 'Ggiata',
      dishName: 'Turkey Mozz Sando',
      price: 15.50,
      categories: ['sandwiches', 'top'],
      isPrototypeFiller: true,
    },
    {
      id: 542,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Pine-and-Crane.png',
      restaurantName: 'Pine & Crane',
      dishName: 'Scallion Beef Noodles',
      price: 16.25,
      categories: ['chinese'],
      isPrototypeFiller: true,
    },
    {
      id: 543,
      imageUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Farm-Stand.png',
      restaurantName: 'Farm Stand',
      dishName: 'Ancient Grain Bowl',
      price: 14.25,
      categories: ['price', 'bowls', 'vegetarian', 'vegan', 'gluten-free'],
      isPrototypeFiller: true,
    },
    {
      id: 544,
      imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Levain-Bakery.png',
      restaurantName: 'Levain Bakery',
      dishName: 'Cinnamon Morning Bun',
      price: 6.50,
      categories: ['price', 'limited'],
      isPrototypeFiller: true,
    },
    {
      id: 545,
      imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Starbucks.png',
      restaurantName: 'Starbucks',
      dishName: 'Iced Matcha Latte',
      price: 7.25,
      categories: ['price', 'limited'],
      isPrototypeFiller: true,
    },
    {
      id: 546,
      imageUrl: 'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Erewhon-Market.png',
      restaurantName: 'Erewhon Market',
      dishName: 'Glow Greens Smoothie',
      price: 18.00,
      categories: ['limited', 'vegetarian', 'vegan', 'gluten-free', 'top'],
      isPrototypeFiller: true,
    },
    {
      id: 547,
      imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=900&auto=format&fit=crop',
      restaurantLogo: '/images/logos/Talo-Organic.png',
      restaurantName: 'Talo Organic',
      dishName: 'Lemon Herb Chicken Bowl',
      price: 17.25,
      categories: ['bowls', 'mediterranean'],
      isPrototypeFiller: true,
    },
  ]

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (!activeFilter) return []
    let filterMatchedItems = allFilterableItems.filter(item =>
      item.categories.includes(activeFilter as string)
    )

    if (dietaryFilter) {
      filterMatchedItems = filterMatchedItems.filter(item => item.categories.includes(dietaryFilter))
    }

    if (!isPriceChipActive && priceFilter) {
      filterMatchedItems = filterMatchedItems.filter((item) => {
        if (priceFilter === 'under-15') return item.price < 15
        if (priceFilter === '15-20') return item.price >= 15 && item.price <= 20
        return item.price > 20
      })
    }

    return filterMatchedItems
  }, [activeFilter, allFilterableItems, dietaryFilter, isPriceChipActive, priceFilter])

  // Get the label for the active filter
  const getFilterLabel = (filterId: string | number | null) => {
    if (!filterId) return ''
    const chip = filterChips.find(c => c.id === filterId)
    return chip ? `${chip.label} items` : ''
  }

  const getDietaryLabel = () => {
    if (!dietaryFilter) return 'Dietary'
    const selectedOption = DIETARY_OPTIONS.find(option => option.value === dietaryFilter)
    return selectedOption ? selectedOption.label : 'Dietary'
  }

  const getSortLabel = () => {
    const selectedOption = SORT_OPTIONS.find(option => option.value === sortBy)
    return selectedOption ? selectedOption.label : 'By popularity'
  }

  const getPriceLabel = () => {
    if (!priceFilter) return 'Price'
    const selectedOption = PRICE_OPTIONS.find(option => option.value === priceFilter)
    return selectedOption ? selectedOption.label : 'Price'
  }

  // Category to restaurants mapping for "Popular restaurants" carousel
  const categoryRestaurants: Record<string, StoreCarouselItem[]> = {
    bowls: [
      { id: 601, imageUrl: '/images/stores/Cava.png', storeName: 'Cava', category: 'Mediterranean, Bowls', logoUrl: '/images/logos/Cava.png' },
      { id: 602, imageUrl: '/images/stores/Sweetgreen.png', storeName: 'Sweetgreen', category: 'Salads, Healthy', logoUrl: '/images/logos/Sweetgreen.png' },
      { id: 603, imageUrl: '/images/stores/Sweetfin.png', storeName: 'Sweetfin', category: 'Poke, Bowls', logoUrl: '/images/logos/Sweetfin.png' },
      { id: 604, imageUrl: '/images/stores/Tocaya.png', storeName: 'Tocaya', category: 'Mexican, Bowls', logoUrl: '/images/logos/Tocaya.png' },
      { id: 605, imageUrl: '/images/stores/Chipotle.png', storeName: 'Chipotle', category: 'Mexican, Burritos', logoUrl: '/images/logos/Chipotle.png' },
    ],
    salads: [
      { id: 611, imageUrl: '/images/stores/Sweetgreen.png', storeName: 'Sweetgreen', category: 'Salads, Healthy', logoUrl: '/images/logos/Sweetgreen.png' },
      { id: 612, imageUrl: '/images/stores/Mendocino-Farms.png', storeName: 'Mendocino Farms', category: 'Sandwiches, Salads', logoUrl: '/images/logos/Mendocino-Farms.png' },
      { id: 613, imageUrl: '/images/stores/Farm-Stand.png', storeName: 'Farm Stand', category: 'Healthy, Organic', logoUrl: '/images/logos/Farm-Stand.png' },
      { id: 614, imageUrl: '/images/stores/Cava.png', storeName: 'Cava', category: 'Mediterranean, Bowls', logoUrl: '/images/logos/Cava.png' },
    ],
    sushi: [
      { id: 621, imageUrl: '/images/stores/Sugarfish.png', storeName: 'Sugarfish', category: 'Japanese, Sushi', logoUrl: '/images/logos/Sugarfish.png' },
      { id: 622, imageUrl: '/images/stores/Sushi-Enya.png', storeName: 'Sushi Enya', category: 'Japanese, Sushi', logoUrl: '/images/logos/Sushi-Enya.png' },
      { id: 623, imageUrl: '/images/stores/Sweetfin.png', storeName: 'Sweetfin', category: 'Poke, Bowls', logoUrl: '/images/logos/Sweetfin.png' },
    ],
    mexican: [
      { id: 631, imageUrl: '/images/stores/Sonoratown.png', storeName: 'Sonoratown', category: 'Mexican, Tacos', logoUrl: '/images/logos/Sonoratown.png' },
      { id: 632, imageUrl: '/images/stores/Loqui.png', storeName: 'Loqui', category: 'Mexican, Tacos', logoUrl: '/images/logos/Loqui.png' },
      { id: 633, imageUrl: '/images/stores/Chipotle.png', storeName: 'Chipotle', category: 'Mexican, Burritos', logoUrl: '/images/logos/Chipotle.png' },
      { id: 634, imageUrl: '/images/stores/Tocaya.png', storeName: 'Tocaya', category: 'Mexican, Bowls', logoUrl: '/images/logos/Tocaya.png' },
      { id: 635, imageUrl: "/images/stores/Hugo's-Tacos.png", storeName: "Hugo's Tacos", category: 'Mexican, Tacos', logoUrl: "/images/logos/Hugo's-Tacos.png" },
    ],
    poke: [
      { id: 641, imageUrl: '/images/stores/Sweetfin.png', storeName: 'Sweetfin', category: 'Poke, Bowls', logoUrl: '/images/logos/Sweetfin.png' },
      { id: 642, imageUrl: '/images/stores/Nuc-Poke.png', storeName: 'Nuc Poke', category: 'Poke, Bowls', logoUrl: '/images/logos/Nuc-Poke.png' },
    ],
    chinese: [
      { id: 651, imageUrl: '/images/stores/Din-Tai-Fung.png', storeName: 'Din Tai Fung', category: 'Taiwanese, Dumplings', logoUrl: '/images/logos/Din-Tai-Fung.png' },
      { id: 652, imageUrl: '/images/stores/Pine-and-Crane.png', storeName: 'Pine & Crane', category: 'Taiwanese, Chinese', logoUrl: '/images/logos/Pine-and-Crane.png' },
    ],
    sandwiches: [
      { id: 661, imageUrl: '/images/stores/Ggiata.png', storeName: 'Ggiata', category: 'Sandwiches, Italian', logoUrl: '/images/logos/Ggiata.png' },
      { id: 662, imageUrl: '/images/stores/Ghost-Sando.png', storeName: 'Ghost Sando', category: 'Sandwiches, Japanese', logoUrl: '/images/logos/Ghost-Sando.png' },
      { id: 663, imageUrl: '/images/stores/Jersey-Mikes.png', storeName: "Jersey Mike's", category: 'Subs, Sandwiches', logoUrl: '/images/logos/Jersey-Mikes.png' },
      { id: 664, imageUrl: '/images/stores/Mendocino-Farms.png', storeName: 'Mendocino Farms', category: 'Sandwiches, Salads', logoUrl: '/images/logos/Mendocino-Farms.png' },
    ],
    mediterranean: [
      { id: 671, imageUrl: '/images/stores/Cava.png', storeName: 'Cava', category: 'Mediterranean, Bowls', logoUrl: '/images/logos/Cava.png' },
      { id: 672, imageUrl: '/images/stores/Zankou-Chicken.png', storeName: 'Zankou Chicken', category: 'Chicken, Mediterranean', logoUrl: '/images/logos/Zankou-Chicken.png' },
    ],
    vegetarian: [
      { id: 681, imageUrl: '/images/stores/Sweetgreen.png', storeName: 'Sweetgreen', category: 'Salads, Healthy', logoUrl: '/images/logos/Sweetgreen.png' },
      { id: 682, imageUrl: '/images/stores/Cava.png', storeName: 'Cava', category: 'Mediterranean, Bowls', logoUrl: '/images/logos/Cava.png' },
      { id: 683, imageUrl: '/images/stores/Erewhon-Market.png', storeName: 'Erewhon Market', category: 'Organic, Healthy', logoUrl: '/images/logos/Erewhon-Market.png' },
    ],
  }

  // Filters that should NOT show the Popular restaurants carousel
  const nonCuisineFilters = ['price', 'limited', 'top']
  
  // Get popular restaurants for the active filter
  const popularRestaurants = useMemo(() => {
    if (!activeFilter || nonCuisineFilters.includes(activeFilter as string)) return []
    return categoryRestaurants[activeFilter as string] || []
  }, [activeFilter])

  // Store carousel data - prioritizing stores with local images
  const stores: StoreCarouselItem[] = [
    {
      id: 1,
      imageUrl: '/images/stores/Sugarfish.png',
      storeName: 'Sugarfish',
      category: 'Japanese, Sushi',
      logoUrl: '/images/logos/Sugarfish.png',
    },
    {
      id: 2,
      imageUrl: '/images/stores/Loqui.png',
      storeName: 'Loqui',
      category: 'Mexican, Tacos',
      logoUrl: '/images/logos/Loqui.png',
    },
    {
      id: 3,
      imageUrl: '/images/stores/Levain-Bakery.png',
      storeName: 'Levain Bakery',
      category: 'Bakery, Cookies',
      logoUrl: '/images/logos/Levain-Bakery.png',
    },
    {
      id: 4,
      imageUrl: '/images/stores/Katsu-Bar.png',
      storeName: 'Katsu Bar',
      category: 'Japanese, Katsu',
      logoUrl: '/images/logos/Katsu-Bar.png',
    },
    {
      id: 5,
      imageUrl: "/images/stores/Hugo's-Tacos.png",
      storeName: "Hugo's Tacos",
      category: 'Mexican, Tacos',
      logoUrl: "/images/logos/Hugo's-Tacos.png",
    },
    {
      id: 6,
      imageUrl: '/images/stores/Farm-Stand.png',
      storeName: 'Farm Stand',
      category: 'Healthy, Organic',
      logoUrl: '/images/logos/Farm-Stand.png',
    },
  ]

  // Standout restaurants carousel
  const standoutStores: StoreCarouselItem[] = [
    {
      id: 50,
      imageUrl: '/images/stores/Ggiata.png',
      storeName: 'Ggiata',
      category: 'Sandwiches, Italian',
      logoUrl: '/images/logos/Ggiata.png',
    },
    {
      id: 51,
      imageUrl: '/images/stores/Din-Tai-Fung.png',
      storeName: 'Din Tai Fung',
      category: 'Taiwanese, Dumplings',
      logoUrl: '/images/logos/Din-Tai-Fung.png',
    },
    {
      id: 52,
      imageUrl: '/images/stores/Shake-Shack.png',
      storeName: 'Shake Shack',
      category: 'Burgers, American',
      logoUrl: '/images/logos/Shake-Shack.png',
    },
    {
      id: 53,
      imageUrl: '/images/stores/Sweetgreen.png',
      storeName: 'Sweetgreen',
      category: 'Salads, Healthy',
      logoUrl: '/images/logos/Sweetgreen.png',
    },
    {
      id: 54,
      imageUrl: '/images/stores/Cava.png',
      storeName: 'Cava',
      category: 'Mediterranean, Bowls',
      logoUrl: '/images/logos/Cava.png',
    },
    {
      id: 55,
      imageUrl: '/images/stores/Prince-Street-Pizza.png',
      storeName: 'Prince Street Pizza',
      category: 'Pizza, Italian',
      logoUrl: '/images/logos/Prince-Street-Pizza.png',
    },
    {
      id: 56,
      imageUrl: '/images/stores/Zankou-Chicken.png',
      storeName: 'Zankou Chicken',
      category: 'Chicken, Mediterranean',
      logoUrl: '/images/logos/Zankou-Chicken.png',
    },
    {
      id: 57,
      imageUrl: '/images/stores/Sonoratown.png',
      storeName: 'Sonoratown',
      category: 'Mexican, Tacos',
      logoUrl: '/images/logos/Sonoratown.png',
    },
    {
      id: 58,
      imageUrl: '/images/stores/Erewhon-Market.png',
      storeName: 'Erewhon Market',
      category: 'Organic, Grocery',
      logoUrl: '/images/logos/Erewhon-Market.png',
    },
  ]

  // All restaurants data (for grid) - real logos first, then fake stores
  const allRestaurants: StoreCarouselItem[] = [
    // Real stores with local logos
    {
      id: 201,
      imageUrl: '/images/stores/Sugarfish.png',
      storeName: 'Sugarfish',
      category: 'Japanese, Sushi',
      logoUrl: '/images/logos/Sugarfish.png',
    },
    {
      id: 202,
      imageUrl: '/images/stores/Din-Tai-Fung.png',
      storeName: 'Din Tai Fung',
      category: 'Taiwanese, Dumplings',
      logoUrl: '/images/logos/Din-Tai-Fung.png',
    },
    {
      id: 203,
      imageUrl: '/images/stores/Mendocino-Farms.png',
      storeName: 'Mendocino Farms',
      category: 'Sandwiches, Salads',
      logoUrl: '/images/logos/Mendocino-Farms.png',
    },
    {
      id: 204,
      imageUrl: '/images/stores/Farm-Stand.png',
      storeName: 'Farm Stand',
      category: 'Healthy, Organic',
      logoUrl: '/images/logos/Farm-Stand.png',
    },
    {
      id: 205,
      imageUrl: "/images/stores/Hugo's-Tacos.png",
      storeName: "Hugo's Tacos",
      category: 'Mexican, Tacos',
      logoUrl: "/images/logos/Hugo's-Tacos.png",
    },
    {
      id: 206,
      imageUrl: '/images/stores/Katsu-Bar.png',
      storeName: 'Katsu Bar',
      category: 'Japanese, Katsu',
      logoUrl: '/images/logos/Katsu-Bar.png',
    },
    {
      id: 207,
      imageUrl: '/images/stores/Levain-Bakery.png',
      storeName: 'Levain Bakery',
      category: 'Bakery, Cookies',
      logoUrl: '/images/logos/Levain-Bakery.png',
    },
    {
      id: 208,
      imageUrl: '/images/stores/Erewhon-Market.png',
      storeName: 'Erewhon Market',
      category: 'Organic, Healthy',
      logoUrl: '/images/logos/Erewhon-Market.png',
    },
    {
      id: 209,
      imageUrl: '/images/stores/Chipotle.png',
      storeName: 'Chipotle',
      category: 'Mexican, Burritos',
      logoUrl: '/images/logos/Chipotle.png',
    },
    {
      id: 210,
      imageUrl: '/images/stores/Prince-Street-Pizza.png',
      storeName: 'Prince Street Pizza',
      category: 'Pizza, Italian',
      logoUrl: '/images/logos/Prince-Street-Pizza.png',
    },
    {
      id: 211,
      imageUrl: '/images/stores/Cava.png',
      storeName: 'Cava',
      category: 'Mediterranean, Bowls',
      logoUrl: '/images/logos/Cava.png',
    },
    {
      id: 212,
      imageUrl: '/images/stores/Zankou-Chicken.png',
      storeName: 'Zankou Chicken',
      category: 'Armenian, Chicken',
      logoUrl: '/images/logos/Zankou-Chicken.png',
    },
    {
      id: 213,
      imageUrl: '/images/stores/Ggiata.png',
      storeName: 'Ggiata',
      category: 'Italian, Sandwiches',
      logoUrl: '/images/logos/Ggiata.png',
    },
    {
      id: 214,
      imageUrl: '/images/stores/Ghost-Sando.png',
      storeName: 'Ghost Sando',
      category: 'Japanese, Sandwiches',
      logoUrl: '/images/logos/Ghost-Sando.png',
    },
    {
      id: 215,
      imageUrl: '/images/stores/Hiho-CheeseBurger.png',
      storeName: 'Hiho Cheeseburger',
      category: 'Burgers, American',
      logoUrl: '/images/logos/Hiho-CheeseBurger.png',
    },
    {
      id: 216,
      imageUrl: '/images/stores/Loqui.png',
      storeName: 'Loqui',
      category: 'Mexican, Tacos',
      logoUrl: '/images/logos/Loqui.png',
    },
    {
      id: 217,
      imageUrl: '/images/stores/Sushi-Enya.png',
      storeName: 'Sushi Enya',
      category: 'Japanese, Sushi',
      logoUrl: '/images/logos/Sushi-Enya.png',
    },
    {
      id: 218,
      imageUrl: '/images/stores/Teriyaki-Madness.png',
      storeName: 'Teriyaki Madness',
      category: 'Japanese, Teriyaki',
      logoUrl: '/images/logos/Teriyaki-Madness.png',
    },
    {
      id: 219,
      imageUrl: '/images/stores/Tocaya.png',
      storeName: 'Tocaya',
      category: 'Mexican, Modern',
      logoUrl: '/images/logos/Tocaya.png',
    },
    {
      id: 220,
      imageUrl: '/images/stores/Sweetgreen.png',
      storeName: 'Sweetgreen',
      category: 'Salads, Bowls, Healthy',
      logoUrl: '/images/logos/Sweetgreen.png',
    },
    {
      id: 221,
      imageUrl: '/images/stores/Shake-Shack.png',
      storeName: 'Shake Shack',
      category: 'Burgers, American',
      logoUrl: '/images/logos/Shake-Shack.png',
    },
    {
      id: 222,
      imageUrl: '/images/stores/Pine-and-Crane.png',
      storeName: 'Pine and Crane',
      category: 'Taiwanese, Asian',
      logoUrl: '/images/logos/Pine-and-Crane.png',
    },
    {
      id: 223,
      imageUrl: '/images/stores/Silverlake-Ramen.png',
      storeName: 'Silverlake Ramen',
      category: 'Japanese, Ramen',
      logoUrl: '/images/logos/Silverlake-Ramen.png',
    },
    {
      id: 224,
      imageUrl: '/images/stores/Homestate.png',
      storeName: 'Homestate',
      category: 'Tex-Mex, Breakfast',
      logoUrl: '/images/logos/Homestate.png',
    },
    {
      id: 225,
      imageUrl: '/images/stores/Xenia.png',
      storeName: 'Xenia',
      category: 'Greek, Mediterranean',
      logoUrl: '/images/logos/Xenia.png',
    },
    {
      id: 226,
      imageUrl: '/images/stores/Starbucks.png',
      storeName: 'Starbucks',
      category: 'Coffee, Breakfast',
      logoUrl: '/images/logos/starbucks.png',
    },
    {
      id: 227,
      imageUrl: '/images/stores/Jersey-Mikes.png',
      storeName: 'Jersey Mikes',
      category: 'Subs, Sandwiches',
      logoUrl: '/images/logos/Jersey-Mikes.png',
    },
    {
      id: 228,
      imageUrl: '/images/stores/Goop-Kitchen.png',
      storeName: 'Goop Kitchen',
      category: 'Healthy, Clean Eating',
      logoUrl: '/images/logos/Goop-Kitchen.png',
    },
    {
      id: 229,
      imageUrl: '/images/stores/California-Chicken-Cafe.png',
      storeName: 'California Chicken Cafe',
      category: 'Chicken, Healthy',
      logoUrl: '/images/logos/California-Chicken-Cafe.png',
    },
    {
      id: 230,
      imageUrl: '/images/stores/Sol-Bowls.png',
      storeName: 'Sol Bowls',
      category: 'Acai, Bowls, Smoothies',
      logoUrl: '/images/logos/Sol-Bowls.png',
    },
    {
      id: 231,
      imageUrl: '/images/stores/Sweetfin.png',
      storeName: 'Sweetfin',
      category: 'Poke, Bowls, Healthy',
      logoUrl: '/images/logos/Sweetfin.png',
    },
    {
      id: 232,
      imageUrl: '/images/stores/Hungry-Cowgirl.png',
      storeName: 'Hungry Cowgirl',
      category: 'BBQ, American',
      logoUrl: '/images/logos/Hungry-Cowgirl.png',
    },
    {
      id: 233,
      imageUrl: '/images/stores/Pita-Dust.png',
      storeName: 'Pita Dust',
      category: 'Mediterranean, Healthy',
      logoUrl: '/images/logos/Pita-Dust.png',
    },
    {
      id: 234,
      imageUrl: '/images/stores/Brekki-Bagels.png',
      storeName: 'Brekki Bagels',
      category: 'Breakfast, Bagels',
      logoUrl: '/images/logos/Brekki-Bagels.png',
    },
    {
      id: 235,
      imageUrl: '/images/stores/Nuc-Poke.png',
      storeName: 'Nuc Poke',
      category: 'Hawaiian, Poke',
      logoUrl: '/images/logos/Nuc-Poke.png',
    },
    {
      id: 236,
      imageUrl: '/images/stores/Palmita.png',
      storeName: 'Palmita',
      category: 'Mexican, Tacos',
      logoUrl: '/images/logos/Palmita.png',
    },
    {
      id: 243,
      imageUrl: '/images/stores/Sonoratown.png',
      storeName: 'Sonoratown',
      category: 'Mexican, Tacos',
      logoUrl: '/images/logos/Sonoratown.png',
    },
    {
      id: 244,
      imageUrl: '/images/stores/Ben\'s-Fast-Food.png',
      storeName: "Ben's Fast Food",
      category: 'Fast Food, American',
      logoUrl: "/images/logos/Ben's-Fast-Food 1.png",
    },
    {
      id: 245,
      imageUrl: "/images/stores/Fatty's-Teriyaki.png",
      storeName: "Fatty's Teriyaki",
      category: 'Japanese, Teriyaki',
      logoUrl: "/images/logos/Fatty's-Teriyaki.png",
    },
    // Fake stores with Unsplash logos
    {
      id: 237,
      imageUrl: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400',
      storeName: 'Urban Kitchen',
      category: 'American, Modern',
      logoUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100',
    },
    {
      id: 238,
      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400',
      storeName: 'The Garden Grill',
      category: 'Vegetarian, Healthy',
      logoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100',
    },
    {
      id: 239,
      imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
      storeName: 'Noodle King',
      category: 'Asian, Noodles',
      logoUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=100',
    },
    {
      id: 240,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      storeName: 'Morning Glory Cafe',
      category: 'Breakfast, Brunch',
      logoUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100',
    },
    {
      id: 241,
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
      storeName: 'Burger Republic',
      category: 'Burgers, American',
      logoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100',
    },
    {
      id: 242,
      imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
      storeName: 'Fresh & Co',
      category: 'Salads, Healthy',
      logoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100',
    },
  ]

  return (
    <div className="page">
      {/* Header */}
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

      {/* Main Content */}
      <main className="content">
        {/* Banner */}
        <Banner
          title="Sweetgreen + Function menu is here"
          subtitle="Start 2026 with 5 new nutrient-rich meals designed for longevity, wellness and focus"
          ctaText="View new items →"
          onCtaClick={() => console.log('Banner CTA clicked')}
          theme="dark"
          imageUrl="/images/banners/SweetgreenxFunction.png"
        />

        {/* Filter Chips */}
        <section className="filters-section">
          <FilterChipCarousel
            chips={filterChips}
            activeChipId={activeFilter}
            onChipClick={(chip) => setActiveFilter(chip.id === activeFilter ? null : chip.id)}
            gap={8}
          />
        </section>

        {/* Conditional rendering based on active filter */}
        {activeFilter ? (
          /* Filtered Items View */
          <section className="filtered-section">
            {/* Top Restaurants Carousel - only for cuisine filters */}
            {popularRestaurants.length > 0 && (
              <div className="popular-restaurants-section">
                <StoreCarousel
                  title="Top restaurants"
                  stores={popularRestaurants}
                  visibleCount={4}
                  gap={16}
                  onStoreClick={(store) => console.log(`Clicked store: ${store.storeName}`)}
                />
              </div>
            )}

            {/* Section Header with filters */}
            <div className="filtered-header">
              <h2 className="filtered-title">{getFilterLabel(activeFilter)}</h2>
              <div className="filter-dropdowns">
                <div className="filter-dropdown-wrapper" ref={dietaryDropdownRef}>
                  <button
                    className={`filter-dropdown ${dietaryFilter ? 'active' : ''}`}
                    onClick={() => {
                      setIsDietaryDropdownOpen(!isDietaryDropdownOpen)
                      setIsPriceDropdownOpen(false)
                      setIsSortDropdownOpen(false)
                    }}
                  >
                    {getDietaryLabel()}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isDietaryDropdownOpen && (
                    <div className="filter-dropdown-menu">
                      {DIETARY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          className={`filter-dropdown-option ${dietaryFilter === option.value ? 'selected' : ''}`}
                          onClick={() => {
                            setDietaryFilter(dietaryFilter === option.value ? null : option.value)
                            setIsDietaryDropdownOpen(false)
                          }}
                        >
                          <span>{option.label}</span>
                          {dietaryFilter === option.value && (
                            <svg
                              className="filter-dropdown-check"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {!isPriceChipActive && (
                  <div className="filter-dropdown-wrapper" ref={priceDropdownRef}>
                    <button
                      className={`filter-dropdown ${priceFilter ? 'active' : ''}`}
                      onClick={() => {
                        setIsPriceDropdownOpen(!isPriceDropdownOpen)
                        setIsDietaryDropdownOpen(false)
                        setIsSortDropdownOpen(false)
                      }}
                    >
                      {getPriceLabel()}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {isPriceDropdownOpen && (
                      <div className="filter-dropdown-menu">
                        {PRICE_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            className={`filter-dropdown-option ${priceFilter === option.value ? 'selected' : ''}`}
                            onClick={() => {
                              setPriceFilter(priceFilter === option.value ? null : option.value)
                              setIsPriceDropdownOpen(false)
                            }}
                          >
                            <span>{option.label}</span>
                            {priceFilter === option.value && (
                              <svg
                                className="filter-dropdown-check"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="filter-dropdown-wrapper" ref={sortDropdownRef}>
                  <button
                    className={`filter-dropdown ${sortBy !== 'popularity' ? 'active' : ''}`}
                    onClick={() => {
                      setIsSortDropdownOpen(!isSortDropdownOpen)
                      setIsDietaryDropdownOpen(false)
                      setIsPriceDropdownOpen(false)
                    }}
                  >
                    {getSortLabel()}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isSortDropdownOpen && (
                    <div className="filter-dropdown-menu">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          className={`filter-dropdown-option ${sortBy === option.value ? 'selected' : ''}`}
                          onClick={() => {
                            setSortBy(sortBy === option.value ? 'popularity' : option.value)
                            setIsSortDropdownOpen(false)
                          }}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && (
                            <svg
                              className="filter-dropdown-check"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="items-grid">
              {filteredItems
                .sort((a, b) => {
                  const priorityDelta = Number(!!a.isPrototypeFiller) - Number(!!b.isPrototypeFiller)
                  if (priorityDelta !== 0) return priorityDelta
                  return sortBy === 'price' ? a.price - b.price : 0
                })
                .map((item) => (
                  <ItemCard
                    key={item.id}
                    imageUrl={item.imageUrl}
                    restaurantLogo={item.restaurantLogo}
                    restaurantName={item.restaurantName}
                    dishName={item.dishName}
                    price={item.price}
                    badgeText={item.badgeText}
                    badgeColor={item.badgeColor}
                    onClick={() => console.log(`Clicked item: ${item.dishName}`)}
                  />
                ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="no-results">
                <p>No items found for this filter. Try another category!</p>
              </div>
            )}
          </section>
        ) : (
          /* Default Carousels View */
          <>
            {/* Featured Items Carousel */}
            <section className="carousel-section">
              <ItemCarousel
                title="Featured items"
                items={featuredItems}
                visibleCount={5}
                gap={16}
                onItemClick={(item) => console.log(`Clicked item: ${item.dishName}`)}
              />
            </section>

            {/* Stores Carousel */}
            <section className="carousel-section">
              <StoreCarousel
                title="Available today"
                subtitle="Hurry up! These restaurants won't be around until next Thursday"
                stores={stores}
                visibleCount={4}
                gap={16}
                onStoreClick={(store) => console.log(`Clicked store: ${store.storeName}`)}
              />
            </section>

            {/* $15 and under Items Carousel */}
            <section className="carousel-section">
              <ItemCarousel
                title="$15 and under"
                items={budgetItems}
                visibleCount={5}
                gap={16}
                onItemClick={(item) => console.log(`Clicked item: ${item.dishName}`)}
              />
            </section>

            {/* Standout Restaurants Carousel */}
            <section className="carousel-section">
              <StoreCarousel
                title="Standout restaurants"
                stores={standoutStores}
                visibleCount={4}
                gap={16}
                onStoreClick={(store) => console.log(`Clicked store: ${store.storeName}`)}
              />
            </section>

            {/* All Restaurants Grid */}
            <section className="restaurants-section">
              <h2 className="section-title">All restaurants</h2>
              <div className="restaurants-grid">
                {allRestaurants.map((store) => (
                  <StoreCard
                    key={store.id}
                    imageUrl={store.imageUrl}
                    storeName={store.storeName}
                    category={store.category}
                    logoUrl={store.logoUrl}
                    badgeText={store.badgeText}
                    badgeColor={store.badgeColor}
                    onClick={() => console.log(`Clicked store: ${store.storeName}`)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
