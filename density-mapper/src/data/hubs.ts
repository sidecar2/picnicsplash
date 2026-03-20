/**
 * Hubs: delivery destinations where orders from internal, partner, and selection
 * restaurants can arrive (e.g. single route with mixed orders).
 */
export interface Hub {
  id: string;
  label: string;
  lng: number;
  lat: number;
}

/** Seven hubs in/around DTLA for delivery drop-offs (A–G) */
export const HUBS: Hub[] = [
  { id: "hub-a", label: "A", lng: -118.248, lat: 34.048 },
  { id: "hub-b", label: "B", lng: -118.255, lat: 34.055 },
  { id: "hub-c", label: "C", lng: -118.242, lat: 34.058 },
  { id: "hub-d", label: "D", lng: -118.235, lat: 34.052 },
  { id: "hub-e", label: "E", lng: -118.262, lat: 34.045 },
  { id: "hub-f", label: "F", lng: -118.268, lat: 34.062 },
  { id: "hub-g", label: "G", lng: -118.228, lat: 34.041 },
];
