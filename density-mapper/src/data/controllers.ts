import type { ControllerState, SliderConfig } from "@/types";

function mid(min: number, max: number) {
  return (min + max) / 2;
}

export const DEFAULT_STATE: ControllerState = {
  courierCount: mid(10, 120),
  demandVolume: mid(50, 400),
  avgCourierSpeedMph: mid(8, 20),
  dispatchHoldWindowMinutes: mid(0, 10),
  batchingRadiusMiles: mid(0.1, 1.5),
  targetAvgBatchSize: mid(1.0, 3.0),
  parkingHandoffTimeMinutes: mid(0.5, 6.0),
  prepTimeMeanMultiplier: mid(0.6, 1.6),
  prepTimeVarianceMultiplier: mid(0.5, 2.0),
  badActorRestaurantsPct: mid(0, 30),
  courierCostPerHour: mid(16, 35),
  internalContributionPerOrder: mid(-1, 6),
  partnerContributionPerOrder: mid(-2, 4),
  selectionContributionPerOrder: mid(-4, 2),
  refundRatePct: mid(0, 8),
  avgRefundCost: mid(5, 25),
};

export const SLIDER_CONFIGS: SliderConfig[] = [
  { key: "courierCount", label: "Courier Count", min: 10, max: 120, step: 1, caption: "Number of couriers in zone.", format: (v) => String(Math.round(v)) },
  { key: "demandVolume", label: "Demand Volume (orders/hr)", min: 50, max: 400, step: 5, caption: "Total orders per hour.", format: (v) => String(Math.round(v)) },
  { key: "avgCourierSpeedMph", label: "Avg Courier Speed (mph)", min: 8, max: 20, step: 0.5, caption: "Average travel speed.", format: (v) => v.toFixed(1) },
  { key: "dispatchHoldWindowMinutes", label: "Dispatch Hold Window (min)", min: 0, max: 10, step: 0.5, caption: "Time to hold for batching.", format: (v) => v.toFixed(1) },
  { key: "batchingRadiusMiles", label: "Batching Radius (miles)", min: 0.1, max: 1.5, step: 0.1, caption: "Max distance to batch.", format: (v) => v.toFixed(1) },
  { key: "targetAvgBatchSize", label: "Target Avg Batch Size", min: 1.0, max: 3.0, step: 0.1, caption: "Target orders per batch.", format: (v) => v.toFixed(1) },
  { key: "parkingHandoffTimeMinutes", label: "Parking + Handoff (min)", min: 0.5, max: 6.0, step: 0.1, caption: "Avg time at drop-off.", format: (v) => v.toFixed(1) },
  { key: "prepTimeMeanMultiplier", label: "Prep Time Mean Mult.", min: 0.6, max: 1.6, step: 0.05, caption: "Multiplier on prep mean.", format: (v) => v.toFixed(2) },
  { key: "prepTimeVarianceMultiplier", label: "Prep Time Variance Mult.", min: 0.5, max: 2.0, step: 0.05, caption: "Multiplier on variance.", format: (v) => v.toFixed(2) },
  { key: "badActorRestaurantsPct", label: '"Bad Actor" Restaurants (%)', min: 0, max: 30, step: 1, caption: "Slower restaurants share.", format: (v) => `${Math.round(v)}%` },
  { key: "courierCostPerHour", label: "Courier Cost ($/hr)", min: 16, max: 35, step: 0.5, caption: "Cost per courier per hour.", format: (v) => `$${v.toFixed(1)}` },
  { key: "internalContributionPerOrder", label: "Internal Contribution ($/order)", min: -1, max: 6, step: 0.25, caption: "Margin per internal order.", format: (v) => `$${v.toFixed(2)}` },
  { key: "partnerContributionPerOrder", label: "Paid Partner Contribution ($/order)", min: -2, max: 4, step: 0.25, caption: "Margin per paid partner order.", format: (v) => `$${v.toFixed(2)}` },
  { key: "selectionContributionPerOrder", label: "Unpaid partner Contribution ($/order)", min: -4, max: 2, step: 0.25, caption: "Margin per unpaid partner order.", format: (v) => `$${v.toFixed(2)}` },
  { key: "refundRatePct", label: "Refund Rate (%)", min: 0, max: 8, step: 0.25, caption: "Share of orders refunded.", format: (v) => `${v.toFixed(1)}%` },
  { key: "avgRefundCost", label: "Avg Refund Cost ($)", min: 5, max: 25, step: 0.5, caption: "Average cost per refund.", format: (v) => `$${v.toFixed(1)}` },
];

const THROUGHPUT_KEYS: (keyof ControllerState)[] = ["courierCount", "demandVolume", "avgCourierSpeedMph", "dispatchHoldWindowMinutes", "batchingRadiusMiles", "targetAvgBatchSize", "parkingHandoffTimeMinutes"];
const RELIABILITY_KEYS: (keyof ControllerState)[] = ["prepTimeMeanMultiplier", "prepTimeVarianceMultiplier", "badActorRestaurantsPct"];
const ECONOMICS_KEYS: (keyof ControllerState)[] = ["courierCostPerHour", "internalContributionPerOrder", "partnerContributionPerOrder", "selectionContributionPerOrder", "refundRatePct", "avgRefundCost"];

export function getSliderGroups() {
  return [
    { heading: "Throughput", keys: THROUGHPUT_KEYS },
    { heading: "Restaurant / Reliability", keys: RELIABILITY_KEYS },
    { heading: "Economics", keys: ECONOMICS_KEYS },
  ];
}
