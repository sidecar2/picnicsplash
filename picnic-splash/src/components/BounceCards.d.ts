import type { FC } from 'react'

export interface BounceCardsProps {
  className?: string
  images?: string[]
  containerWidth?: number
  containerHeight?: number
  animationDelay?: number
  animationStagger?: number
  easeType?: string
  transformStyles?: string[]
  enableHover?: boolean
}

declare const BounceCards: FC<BounceCardsProps>
export default BounceCards
