import type { Restaurant, RestaurantType } from "@/types";

// DTLA approximate bbox: lng -118.28 to -118.21, lat 34.03 to 34.07
const DTLA_LNG_MIN = -118.28;
const DTLA_LNG_MAX = -118.21;
const DTLA_LAT_MIN = 34.03;
const DTLA_LAT_MAX = 34.07;

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

const INTERNAL_NAMES = [
  "Picnic Kitchen DTLA", "Central Prep", "Spring St Kitchen", "Broadway Eats",
  "Main St Kitchen", "Olive Prep", "Figueroa Kitchen", "Hope St Eats",
  "Grand Central Kitchen", "Pershing Prep", "7th St Kitchen", "5th St Eats",
  "Hill St Kitchen", "Los Angeles St Prep", "San Pedro Kitchen", "Flower St Eats",
  "Bunker Hill Kitchen", "Civic Center Prep", "Little Tokyo Kitchen", "Arts District Eats",
];
const PARTNER_NAMES = [
  "Joe's Pizza DTLA", "Tacos La Palma", "Sushi Gen", "Philippe's", "Cole's",
  "Grand Central Market Grill", "Wurstküche", "Guisados", "Howlin' Ray's",
  "B.S. Taqueria", "Badmaash", "Birdies", "Bottega Louie", "Cafe Dulce",
  "Daikokuya", "Engine Co No 28", "Faith & Flower", "KazuNori", "Marugame",
  "Otium",
];
const SELECTION_NAMES = [
  "Selection Kitchen A", "Selection Kitchen B", "Selection Central", "Selection East",
  "Selection West", "Selection South", "Selection North", "Selection Hub 1",
  "Selection Hub 2", "Selection Express", "Selection Prime", "Selection Plus",
  "Selection Fresh", "Selection Quick", "Selection Local", "Selection Downtown",
  "Selection Metro", "Selection Urban", "Selection City", "Selection Grid",
];

const TYPE_BASE_PREP: Record<RestaurantType, { mean: number; std: number }> = {
  internal: { mean: 12, std: 3 },
  partner: { mean: 18, std: 6 },
  selection: { mean: 15, std: 4 },
};

function pick<T>(arr: T[], used: Set<number>): T {
  let i: number;
  do i = Math.floor(Math.random() * arr.length); while (used.has(i));
  used.add(i);
  return arr[i];
}

export function generateMockRestaurants(): Restaurant[] {
  const out: Restaurant[] = [];
  const usedInternal = new Set<number>();
  const usedPartner = new Set<number>();
  const usedSelection = new Set<number>();
  let id = 1;

  for (let i = 0; i < 22; i++) {
    const name = pick(INTERNAL_NAMES, usedInternal);
    const { mean, std } = TYPE_BASE_PREP.internal;
    out.push({
      id: `r-${id++}`,
      name,
      type: "internal",
      basePrepMeanMinutes: mean + (Math.random() - 0.5) * 4,
      basePrepStdMinutes: Math.max(1, std + (Math.random() - 0.5) * 2),
      lng: randomInRange(DTLA_LNG_MIN, DTLA_LNG_MAX),
      lat: randomInRange(DTLA_LAT_MIN, DTLA_LAT_MAX),
    });
  }
  for (let i = 0; i < 20; i++) {
    const name = pick(PARTNER_NAMES, usedPartner);
    const { mean, std } = TYPE_BASE_PREP.partner;
    out.push({
      id: `r-${id++}`,
      name,
      type: "partner",
      basePrepMeanMinutes: mean + (Math.random() - 0.5) * 6,
      basePrepStdMinutes: Math.max(1, std + (Math.random() - 0.5) * 3),
      lng: randomInRange(DTLA_LNG_MIN, DTLA_LNG_MAX),
      lat: randomInRange(DTLA_LAT_MIN, DTLA_LAT_MAX),
    });
  }
  for (let i = 0; i < 18; i++) {
    const name = pick(SELECTION_NAMES, usedSelection);
    const { mean, std } = TYPE_BASE_PREP.selection;
    out.push({
      id: `r-${id++}`,
      name,
      type: "selection",
      basePrepMeanMinutes: mean + (Math.random() - 0.5) * 4,
      basePrepStdMinutes: Math.max(1, std + (Math.random() - 0.5) * 2),
      lng: randomInRange(DTLA_LNG_MIN, DTLA_LNG_MAX),
      lat: randomInRange(DTLA_LAT_MIN, DTLA_LAT_MAX),
    });
  }

  return out;
}

export const MOCK_RESTAURANTS = generateMockRestaurants();
