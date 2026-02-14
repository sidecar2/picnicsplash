# Picnic Eater Components

A beautiful, reusable food menu component library for React applications.

## Features

- Clean, modern design based on Figma specs
- TypeScript support with full type definitions
- Customizable badge, colors, and currency
- Favorite/unfavorite functionality
- Click handlers for navigation
- Zero external dependencies (besides React)
- Works with any React project (Next.js, Vite, CRA, etc.)

## Installation

```bash
# Using npm
npm install picnic-eater-components

# Using yarn
yarn add picnic-eater-components

# Using pnpm
pnpm add picnic-eater-components
```

## Usage

```tsx
import { ItemCard } from 'picnic-eater-components'

function App() {
  return (
    <ItemCard
      imageUrl="https://example.com/dish.jpg"
      restaurantLogo="https://example.com/logo.png"
      restaurantName="Din Tai Fung"
      dishName="Shrimp Fried Noodles"
      price={17.95}
      badgeText="Today only"
      badgeColor="#df5234"
      currency="$"
      isFavorited={false}
      onFavorite={() => console.log('Favorited!')}
      onClick={() => console.log('Card clicked!')}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | *required* | URL of the food/dish image |
| `restaurantLogo` | `string` | *required* | URL of the restaurant logo |
| `restaurantName` | `string` | *required* | Name of the restaurant |
| `dishName` | `string` | *required* | Name of the dish |
| `price` | `number` | *required* | Price of the dish |
| `badgeText` | `string` | `undefined` | Optional promotional badge text |
| `badgeColor` | `string` | `#df5234` | Background color of the badge |
| `currency` | `string` | `$` | Currency symbol to display |
| `isFavorited` | `boolean` | `false` | Whether the item is favorited |
| `onFavorite` | `() => void` | `undefined` | Callback when favorite button is clicked |
| `onClick` | `() => void` | `undefined` | Callback when the card is clicked |
| `className` | `string` | `undefined` | Additional CSS class name |
| `style` | `CSSProperties` | `undefined` | Additional inline styles |

## Local Development

```bash
# Install dependencies
npm install

# Run the demo app
npm run dev

# Build the library
npm run build
```

### Splash page app

The **picnic-splash** marketing splash page lives in this repo. From the repo root:

```bash
npm run build          # build the library first
cd picnic-splash
npm install
npm run dev
```

## Using in Your Project

### Option 1: Link locally (for development)

```bash
# In this directory
npm link

# In your project
npm link picnic-eater-components
```

### Option 2: Install from local path

```bash
npm install /path/to/food-menu-card
```

### Option 3: Publish to npm

1. Update the package name in `package.json`
2. Run `npm publish`

## License

MIT
