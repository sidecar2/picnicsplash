import type { ControllerState, ZoneMetrics, EconomicsMetrics } from "@/types";

export function computeZoneMetrics(state: ControllerState): ZoneMetrics {
  const { courierCount, demandVolume, avgCourierSpeedMph, dispatchHoldWindowMinutes, batchingRadiusMiles, targetAvgBatchSize, parkingHandoffTimeMinutes } = state;
  if (courierCount <= 0) {
    return { ordersPerCourierPerHour: 0, effectiveBatchSize: 0, avgCycleTimeMinutes: 0, demandDensity: 0 };
  }
  const ordersPerCourierPerHour = demandVolume / courierCount;
  const effectiveBatchSize = Math.min(targetAvgBatchSize, demandVolume / Math.max(1, courierCount));
  const avgMilesPerTrip = batchingRadiusMiles * 0.6;
  const travelTimeMinutes = (avgMilesPerTrip / avgCourierSpeedMph) * 60;
  const avgCycleTimeMinutes = dispatchHoldWindowMinutes + 12 + travelTimeMinutes * 2 + parkingHandoffTimeMinutes * effectiveBatchSize;
  const zoneAreaSqMi = 4;
  const demandDensity = demandVolume / zoneAreaSqMi;
  return {
    ordersPerCourierPerHour,
    effectiveBatchSize,
    avgCycleTimeMinutes,
    demandDensity,
  };
}

export function computeEconomicsMetrics(state: ControllerState): EconomicsMetrics {
  const zone = computeZoneMetrics(state);
  const ordersPerCourierPerHour = zone.ordersPerCourierPerHour || 1;
  const costPerOrder = state.courierCostPerHour / ordersPerCourierPerHour;
  const revenuePerOrder = (state.internalContributionPerOrder + state.partnerContributionPerOrder + state.selectionContributionPerOrder) / 3 + costPerOrder;
  const contributionPerOrder = (state.internalContributionPerOrder + state.partnerContributionPerOrder + state.selectionContributionPerOrder) / 3;
  const refundCostPerOrder = (state.refundRatePct / 100) * state.avgRefundCost;
  const netContributionPerOrder = contributionPerOrder - refundCostPerOrder;
  return {
    revenuePerOrder,
    costPerOrder,
    contributionPerOrder,
    refundCostPerOrder,
    netContributionPerOrder,
  };
}
