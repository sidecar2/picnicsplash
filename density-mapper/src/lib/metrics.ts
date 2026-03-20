import type { ControllerState, ZoneMetrics, EconomicsMetrics } from "@/types";

export function computeZoneMetrics(s: ControllerState): ZoneMetrics {
  if (s.courierCount <= 0) return { ordersPerCourierPerHour: 0, effectiveBatchSize: 0, avgCycleTimeMinutes: 0, demandDensity: 0 };
  const ordersPerCourierPerHour = s.demandVolume / s.courierCount;
  const effectiveBatchSize = Math.min(s.targetAvgBatchSize, s.demandVolume / Math.max(1, s.courierCount));
  const travelMin = (s.batchingRadiusMiles * 0.6 / s.avgCourierSpeedMph) * 60;
  const avgCycleTimeMinutes = s.dispatchHoldWindowMinutes + 12 + travelMin * 2 + s.parkingHandoffTimeMinutes * effectiveBatchSize;
  const demandDensity = s.demandVolume / 4;
  return { ordersPerCourierPerHour, effectiveBatchSize, avgCycleTimeMinutes, demandDensity };
}

export function computeEconomicsMetrics(s: ControllerState): EconomicsMetrics {
  const zone = computeZoneMetrics(s);
  const opc = zone.ordersPerCourierPerHour || 1;
  const costPerOrder = s.courierCostPerHour / opc;
  const contributionPerOrder = (s.internalContributionPerOrder + s.partnerContributionPerOrder + s.selectionContributionPerOrder) / 3;
  const refundCostPerOrder = (s.refundRatePct / 100) * s.avgRefundCost;
  return {
    revenuePerOrder: contributionPerOrder + costPerOrder,
    costPerOrder,
    contributionPerOrder,
    refundCostPerOrder,
    netContributionPerOrder: contributionPerOrder - refundCostPerOrder,
  };
}
