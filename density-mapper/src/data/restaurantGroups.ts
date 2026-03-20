import type { RestaurantGroup } from "@/types";

/** Clustered partner + selection groups (days); restaurants in each group are placed near center and connected by a line */
export const RESTAURANT_GROUPS: RestaurantGroup[] = [
  { id: "monday", name: "Monday", center: { lat: 34.052, lng: -118.246 }, radius: 0.0025, partnerCount: 3, selectionCount: 3 },
  { id: "tuesday", name: "Tuesday", center: { lat: 34.058, lng: -118.262 }, radius: 0.0025, partnerCount: 3, selectionCount: 3 },
  { id: "wednesday", name: "Wednesday", center: { lat: 34.044, lng: -118.255 }, radius: 0.0025, partnerCount: 3, selectionCount: 3 },
  { id: "thursday", name: "Thursday", center: { lat: 34.048, lng: -118.238 }, radius: 0.0025, partnerCount: 3, selectionCount: 3 },
  { id: "friday", name: "Friday", center: { lat: 34.055, lng: -118.252 }, radius: 0.0025, partnerCount: 3, selectionCount: 3 },
];
