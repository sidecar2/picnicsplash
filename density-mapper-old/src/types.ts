export type RestaurantType = "internal" | "partner" | "selection";

export interface Restaurant {
  id: string;
  name: string;
  type: RestaurantType;
  basePrepMeanMinutes: number;
  basePrepStdMinutes: number;
  lng: number;
  lat: number;
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
  demandDensity: number; // orders per sq mi (for overlay)
}

export interface EconomicsMetrics {
  revenuePerOrder: number;
  costPerOrder: number;
  contributionPerOrder: number;
  refundCostPerOrder: number;
  netContributionPerOrder: number;
}
