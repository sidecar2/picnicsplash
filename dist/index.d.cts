import * as react from 'react';
import { CSSProperties, ReactNode } from 'react';

interface ItemCardProps {
    /** URL of the food/dish image */
    imageUrl: string;
    /** URL of the restaurant logo */
    restaurantLogo: string;
    /** Name of the restaurant */
    restaurantName: string;
    /** Name of the dish */
    dishName: string;
    /** Price of the dish (discounted price if discount is true) */
    price: number;
    /** Original price before discount (required when discount is true) */
    originalPrice?: number;
    /** Whether to show discount styling (teal badge, strikethrough original price) */
    discount?: boolean;
    /** Optional promotional badge text (e.g., "Today only", "1 order left", "$2 off") */
    badgeText?: string;
    /** Badge background color (defaults to teal when discount is true) */
    badgeColor?: string;
    /** Currency symbol to display */
    currency?: string;
    /** Whether the item is favorited */
    isFavorited?: boolean;
    /** Whether to show the favorite/add button */
    showFavoriteButton?: boolean;
    /** Callback when favorite button is clicked */
    onFavorite?: () => void;
    /** Callback when the card is clicked */
    onClick?: () => void;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const ITEM_CARD_BADGE_COLORS: {
    readonly default: "#df5234";
    readonly discount: "#00796b";
    readonly black: "#141414";
};
declare const ItemCard: react.ForwardRefExoticComponent<ItemCardProps & react.RefAttributes<HTMLDivElement>>;

interface StoreCardProps {
    /** URL of the store/food image */
    imageUrl: string;
    /** Name of the store */
    storeName: string;
    /** Store category/cuisine (e.g., "Sandwiches, Wraps") */
    category: string;
    /** URL of the store logo */
    logoUrl?: string;
    /** Whether to show the logo */
    showLogo?: boolean;
    /** Optional promotional badge text (e.g., "Picnic Debut", "1 order left") */
    badgeText?: string;
    /** Badge background color */
    badgeColor?: string;
    /** Callback when the card is clicked */
    onClick?: () => void;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const StoreCard: react.ForwardRefExoticComponent<StoreCardProps & react.RefAttributes<HTMLDivElement>>;

interface ItemCarouselItem extends Omit<ItemCardProps, 'onClick' | 'onFavorite'> {
    /** Unique identifier for the item */
    id: string | number;
}
interface ItemCarouselProps {
    /** Title displayed above the carousel */
    title?: string;
    /** Array of items to display in the carousel */
    items: ItemCarouselItem[];
    /** Number of items visible at once (default: 5) */
    visibleCount?: number;
    /** Gap between items in pixels (default: 16) */
    gap?: number;
    /** Callback when an item is clicked */
    onItemClick?: (item: ItemCarouselItem) => void;
    /** Callback when an item's favorite button is clicked */
    onItemFavorite?: (item: ItemCarouselItem) => void;
    /** Set of favorited item IDs */
    favoritedIds?: Set<string | number>;
    /** Whether to show navigation arrows (default: true) */
    showArrows?: boolean;
    /** Whether to show the add/favorite button on items (default: true) */
    showFavoriteButton?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const ItemCarousel: react.ForwardRefExoticComponent<ItemCarouselProps & react.RefAttributes<HTMLDivElement>>;

interface StoreCarouselItem extends Omit<StoreCardProps, 'onClick'> {
    /** Unique identifier for the store */
    id: string | number;
}
interface StoreCarouselProps {
    /** Title displayed above the carousel */
    title?: string;
    /** Subtitle displayed below the title */
    subtitle?: string;
    /** Array of stores to display in the carousel */
    stores: StoreCarouselItem[];
    /** Number of stores visible at once (default: 4) */
    visibleCount?: number;
    /** Gap between stores in pixels (default: 16) */
    gap?: number;
    /** Callback when a store is clicked */
    onStoreClick?: (store: StoreCarouselItem) => void;
    /** Whether to show navigation arrows (default: true) */
    showArrows?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const StoreCarousel: react.ForwardRefExoticComponent<StoreCarouselProps & react.RefAttributes<HTMLDivElement>>;

interface FilterChipProps {
    /** Label text for the chip */
    label: string;
    /** Icon URL or emoji to display */
    icon?: string;
    /** Whether the chip is currently active/selected */
    isActive?: boolean;
    /** Callback when chip is clicked */
    onClick?: () => void;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const FilterChip: react.ForwardRefExoticComponent<FilterChipProps & react.RefAttributes<HTMLButtonElement>>;

interface FilterChipItem {
    /** Unique identifier for the chip */
    id: string | number;
    /** Label text for the chip */
    label: string;
    /** Icon URL or emoji to display */
    icon?: string;
}
interface FilterChipCarouselProps {
    /** Array of filter chips to display */
    chips: FilterChipItem[];
    /** ID of the currently active chip */
    activeChipId?: string | number | null;
    /** Callback when a chip is clicked */
    onChipClick?: (chip: FilterChipItem) => void;
    /** Gap between chips in pixels (default: 8) */
    gap?: number;
    /** Whether to show navigation arrows (default: true) */
    showArrows?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const FilterChipCarousel: react.ForwardRefExoticComponent<FilterChipCarouselProps & react.RefAttributes<HTMLDivElement>>;

interface HeaderProps {
    /** Logo image URL or element */
    logoUrl?: string;
    /** Location/office name */
    locationName?: string;
    /** Order timing text (e.g., "Today, Lunch") */
    orderTiming?: string;
    /** Countdown timer text (e.g., "3hr 13m") */
    countdownText?: string;
    /** Number of items in basket */
    basketCount?: number;
    /** Callback when logo is clicked */
    onLogoClick?: () => void;
    /** Callback when location button is clicked */
    onLocationClick?: () => void;
    /** Callback when Team order is clicked */
    onTeamOrderClick?: () => void;
    /** Callback when Basket is clicked */
    onBasketClick?: () => void;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const Header: react.ForwardRefExoticComponent<HeaderProps & react.RefAttributes<HTMLDivElement>>;

type BannerTheme = 'dark' | 'light' | 'teal' | 'orange' | 'custom';
interface BannerProps {
    /** Main title text */
    title: string;
    /** Subtitle/description text */
    subtitle?: string;
    /** CTA button text */
    ctaText?: string;
    /** Callback when CTA is clicked */
    onCtaClick?: () => void;
    /** URL of the banner image (right side) */
    imageUrl?: string;
    /** Optional logo/icon element or URL (left side) */
    logo?: ReactNode | string;
    /** Theme preset */
    theme?: BannerTheme;
    /** Custom background color (overrides theme) */
    backgroundColor?: string;
    /** Custom text color (overrides theme) */
    textColor?: string;
    /** Custom button background color (overrides theme) */
    buttonColor?: string;
    /** Custom button text color (overrides theme) */
    buttonTextColor?: string;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const Banner: react.ForwardRefExoticComponent<BannerProps & react.RefAttributes<HTMLDivElement>>;

interface ScheduledOrderProps {
    /** Whether this is an active/in-progress order */
    isActive?: boolean;
    /** Date label (e.g., "Weds, 3/17") - shown for default state */
    dateLabel?: string;
    /** Meal name */
    mealName: string;
    /** Restaurant name */
    restaurant: string;
    /** Order status (e.g., "Order en route") - shown for active state */
    status?: string;
    /** Item count - shown for active state */
    itemCount?: number;
    /** ETA time (e.g., "12:00pm") - shown for active state */
    eta?: string;
    /** Avatar image URL */
    avatarUrl?: string;
    /** Progress percentage (0-100) - shown for active state */
    progress?: number;
    /** Whether to hide the progress bar (useful when parent handles it) */
    hideProgress?: boolean;
    /** Whether to show bottom border */
    showBorder?: boolean;
    /** Whether to highlight this item (for newly added orders) */
    isHighlighted?: boolean;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const ScheduledOrder: react.ForwardRefExoticComponent<ScheduledOrderProps & react.RefAttributes<HTMLDivElement>>;

interface ScheduledOrderItem {
    /** Unique identifier */
    id: string | number;
    /** Date label (e.g., "Weds, 3/17") */
    dateLabel: string;
    /** Meal name */
    mealName: string;
    /** Restaurant name */
    restaurant: string;
    /** Avatar image URL */
    avatarUrl?: string;
}
interface ActiveOrderData {
    /** Order status text (e.g., "Order en route") */
    status: string;
    /** Restaurant name */
    restaurant: string;
    /** Number of items */
    itemCount: number;
    /** Estimated time of arrival */
    eta: string;
    /** Avatar image URL */
    avatarUrl?: string;
    /** Progress percentage (0-100) */
    progress?: number;
}
interface FloatingPanelProps {
    /** Number of upcoming orders */
    upcomingCount: number;
    /** Active order details (when provided, shows active order state) */
    activeOrder?: ActiveOrderData;
    /** List of scheduled orders to display when expanded */
    scheduledOrders?: ScheduledOrderItem[];
    /** Whether the panel is expanded */
    isExpanded?: boolean;
    /** Callback when expand/collapse is toggled */
    onToggle?: () => void;
    /** Callback when the panel is clicked */
    onClick?: () => void;
    /** Callback when "View rotation" is clicked */
    onViewRotation?: () => void;
    /** ID of an order to highlight (for newly added items) */
    highlightedOrderId?: string | number | null;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const FloatingPanel: react.ForwardRefExoticComponent<FloatingPanelProps & react.RefAttributes<HTMLDivElement>>;

interface NutritionInfo {
    calories?: number;
    fat?: string;
    carbs?: string;
    protein?: string;
}
interface Tag {
    id: string | number;
    label: string;
}
interface CustomizationOption {
    id: string | number;
    label: string;
    price?: number;
    selected?: boolean;
}
interface CustomizationGroup {
    id: string | number;
    title: string;
    requiredCount?: number;
    options: CustomizationOption[];
}
interface ItemModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Item image URL */
    imageUrl: string;
    /** Item name */
    itemName: string;
    /** Item description */
    description?: string;
    /** Tags to display (e.g., "Gluten Free", "Contains Egg") */
    tags?: Tag[];
    /** Nutrition information */
    nutrition?: NutritionInfo;
    /** Customization groups */
    customizations?: CustomizationGroup[];
    /** Base price of the item */
    basePrice: number;
    /** Currency symbol (default: $) */
    currency?: string;
    /** Callback when modal is closed */
    onClose?: () => void;
    /** Callback when "Add to basket" is clicked */
    onAddToBasket?: (selectedOptions: Record<string | number, (string | number)[]>, totalPrice: number) => void;
    /** Callback when a date is selected from the schedule popover */
    onScheduleMeal?: (date: Date) => void;
    /** Additional CSS class name */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}
declare const ItemModal: react.ForwardRefExoticComponent<ItemModalProps & react.RefAttributes<HTMLDivElement>>;

export { type ActiveOrderData, Banner, type BannerProps, type BannerTheme, type CustomizationGroup, type CustomizationOption, FilterChip, FilterChipCarousel, type FilterChipCarouselProps, type FilterChipItem, type FilterChipProps, FloatingPanel, type FloatingPanelProps, Header, type HeaderProps, ITEM_CARD_BADGE_COLORS, ItemCard, type ItemCardProps, ItemCarousel, type ItemCarouselItem, type ItemCarouselProps, ItemModal, type ItemModalProps, type NutritionInfo, ScheduledOrder, type ScheduledOrderItem, type ScheduledOrderProps, StoreCard, type StoreCardProps, StoreCarousel, type StoreCarouselItem, type StoreCarouselProps, type Tag };
