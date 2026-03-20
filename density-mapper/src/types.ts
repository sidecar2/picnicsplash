export type RestaurantType = "internal" | "partner" | "selection";

export interface Restaurant {
  id: string;
  name: string;
  type: RestaurantType;
  basePrepMeanMinutes: number;
  basePrepStdMinutes: number;
  lng: number;
  lat: number;
  /** When set, restaurant is part of a clustered partner/selection group; used to draw connecting lines */
  groupId?: string;
  /** Commission rate (e.g. percentage) */
  commission: number;
  /** Capacity limit (e.g. max orders per hour) */
  capacityLimits: number;
}

/** A cluster of partner + selection restaurants with a connecting line */
export interface RestaurantGroup {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  partnerCount: number;
  selectionCount: number;
}

export interface ControllerState {
  courierCount: number;
  demandVolume: number;
  avgCourierSpeedMph: number;
  dispatchHoldWindowMinutes: number;
  batchingRadiusMiles: number;
  targetAvgBatchSize: number;
  parkingHandoffTimeMinutes: number;
  prepTimeMeanMultiplier: number;
  prepTimeVarianceMultiplier: number;
  badActorRestaurantsPct: number;
  courierCostPerHour: number;
  internalContributionPerOrder: number;
  partnerContributionPerOrder: number;
  selectionContributionPerOrder: number;
  refundRatePct: number;
  avgRefundCost: number;
}

export interface SliderConfig {
  key: keyof ControllerState;
  label: string;
  min: number;
  max: number;
  step: number;
  caption: string;
  format?: (v: number) => string;
}

export interface ZoneMetrics {
  ordersPerCourierPerHour: number;
  effectiveBatchSize: number;
  avgCycleTimeMinutes: number;
  demandDensity: number;
}

export interface EconomicsMetrics {
  revenuePerOrder: number;
  costPerOrder: number;
  contributionPerOrder: number;
  refundCostPerOrder: number;
  netContributionPerOrder: number;
}
