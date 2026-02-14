/**
 * Splash-page store ticker – full-width auto-scroll, loop (like hero ticker).
 * Uses SplashStoreCard (Figma 691-1892).
 */
import { SplashStoreCard } from './SplashStoreCard'
import type { SplashStoreCardProps } from './SplashStoreCard'
import './SplashStoreCarousel.css'

export interface SplashStoreCarouselItem extends SplashStoreCardProps {
  id: string | number
}

export interface SplashStoreCarouselProps {
  stores: SplashStoreCarouselItem[]
  gap?: number
  onStoreClick?: (store: SplashStoreCarouselItem) => void
  className?: string
}

export function SplashStoreCarousel({
  stores,
  gap = 16,
  onStoreClick,
  className,
}: SplashStoreCarouselProps) {
  return (
    <div
      className={[className, 'splash-store-carousel'].filter(Boolean).join(' ')}
      data-component="splash-store-carousel"
    >
      <div className="splash-store-carousel__viewport">
        <div
          className="splash-store-carousel__track"
          style={{ gap }}
        >
          {[...stores, ...stores].map((store, i) => (
            <SplashStoreCard
              key={`${store.id}-${i}`}
              imageUrl={store.imageUrl}
              storeName={store.storeName}
              category={store.category}
              onClick={onStoreClick ? () => onStoreClick(store) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
