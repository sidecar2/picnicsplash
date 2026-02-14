/**
 * Splash-page store card – Figma 691-1892.
 * Separate from the library StoreCard so the main app component is unchanged.
 */
import './SplashStoreCard.css'

export interface SplashStoreCardProps {
  imageUrl: string
  storeName: string
  category: string
  onClick?: () => void
}

export function SplashStoreCard({
  imageUrl,
  storeName,
  category,
  onClick,
}: SplashStoreCardProps) {
  return (
    <article
      className="splash-store-card"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      <div className="splash-store-card__photo">
        <img src={imageUrl} alt={storeName} />
      </div>
      <h3 className="splash-store-card__name">{storeName}</h3>
      <p className="splash-store-card__category">{category}</p>
    </article>
  )
}
