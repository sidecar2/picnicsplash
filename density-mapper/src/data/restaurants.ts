import type { Restaurant, RestaurantType } from "@/types";
import { RESTAURANT_GROUPS } from "@/data/restaurantGroups";

const DTLA_LNG_MIN = -118.28;
const DTLA_LNG_MAX = -118.21;
const DTLA_LAT_MIN = 34.03;
const DTLA_LAT_MAX = 34.07;

/** Internal restaurants are all in one building; one is at this exact point */
const INTERNAL_BUILDING_CENTER = { lat: 34.0744862, lng: -118.2517504 };
const INTERNAL_CLUSTER_RADIUS = 0.00015;

/** Second internal location: 32 restaurants in one building */
const INTERNAL_ANCHOR_2 = { lat: 34.0814093, lng: -118.310306 };
const INTERNAL_ANCHOR_2_RADIUS = 0.00015;

/** Third internal location: 24 restaurants in one building */
const INTERNAL_ANCHOR_3 = { lat: 34.0397099, lng: -118.3013705 };
const INTERNAL_ANCHOR_3_RADIUS = 0.00015;

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

const TYPE_PREP: Record<RestaurantType, { mean: number; std: number }> = {
  internal: { mean: 12, std: 3 },
  partner: { mean: 18, std: 6 },
  selection: { mean: 15, std: 4 },
};

const COMMISSION_RANGE: Record<RestaurantType, { min: number; max: number }> = {
  internal: { min: 0, max: 0 },
  partner: { min: 12, max: 22 },
  selection: { min: 8, max: 18 },
};

const CAPACITY_LIMITS_RANGE: Record<RestaurantType, { min: number; max: number }> = {
  internal: { min: 80, max: 150 },
  partner: { min: 20, max: 60 },
  selection: { min: 30, max: 80 },
};

const NAMES: Record<RestaurantType, string[]> = {
  internal: [
    "Picnic Kitchen DTLA", "Central Prep", "Spring St Kitchen", "Broadway Eats", "Main St Kitchen", "Olive Prep", "Figueroa Kitchen", "Hope St Eats", "Grand Central Kitchen", "Pershing Prep", "7th St Kitchen", "5th St Eats", "Hill St Kitchen", "Los Angeles St Prep", "San Pedro Kitchen", "Flower St Eats", "Bunker Hill Kitchen", "Civic Center Prep", "Little Tokyo Kitchen", "Arts District Eats", "Metro Kitchen", "Union Prep",
    "South Central Prep", "Vernon Kitchen", "Slauson Eats", "Washington Prep", "Adams Kitchen", "Jefferson Eats", "Expo Prep", "Crenshaw Kitchen", "Western Eats", "Normandie Prep", "Vermont Kitchen", "Harvard Eats", "Arlington Prep", "Culver Kitchen", "National Eats", "Manchester Prep", "Century Kitchen", "Imperial Eats", "Rosecrans Prep", "Marina Kitchen", "Playa Eats", "Inglewood Prep", "Hawthorne Kitchen", "Lennox Eats",
    "Downtown East Prep", "Commerce Kitchen", "Boyle Heights Eats", "Lincoln Park Prep", "Aliso Kitchen", "East LA Eats", "Montebello Prep", "Pico Rivera Kitchen", "Whittier Eats", "Santa Fe Prep", "Atlantic Kitchen", "Garfield Eats", "Eastern Prep", "Soto Kitchen", "Olympic Eats", "Pico Prep", "Venice Kitchen", "Santa Monica Eats", "Westside Prep", "Sawtelle Kitchen", "Brentwood Eats", "Pacific Prep", "Wilshire Kitchen", "Mid-Wilshire Eats", "Koreatown Prep", "MacArthur Park Kitchen", "Westlake Eats", "Echo Park Prep", "Silver Lake Kitchen", "Los Feliz Eats", "Glendale Prep",
  ],
  partner: ["Joe's Pizza DTLA", "Tacos La Palma", "Sushi Gen", "Philippe's", "Cole's", "Grand Central Market Grill", "Wurstküche", "Guisados", "Howlin' Ray's", "B.S. Taqueria", "Badmaash", "Birdies", "Bottega Louie", "Cafe Dulce", "Daikokuya", "Engine Co No 28", "Faith & Flower", "KazuNori", "Marugame", "Otium"],
  selection: ["The Golden Fork", "Mendocino Farms", "Sweetgreen", "Tender Greens", "Lemonade", "Urbane Cafe", "Zinc Cafe", "Greenleaf Chopshop", "Flame Broiler", "Islands Fine Burgers", "The Stand", "Tocaya Organica", "Blaze Pizza", "Chipotle", "Panera Bread", "California Pizza Kitchen", "Wahoo's Fish Taco", "Native Foods", "True Food Kitchen"],
};

function pick(arr: string[], used: Set<number>) {
  let i: number;
  do i = Math.floor(Math.random() * arr.length); while (used.has(i));
  used.add(i);
  return arr[i];
}

function addRestaurant(
  out: Restaurant[],
  id: number,
  type: RestaurantType,
  lng: number,
  lat: number,
  used: Set<number>,
  groupId?: string
): number {
  const { mean, std } = TYPE_PREP[type];
  const names = NAMES[type];
  const name = pick(names, used);
  const comm = COMMISSION_RANGE[type];
  const cap = CAPACITY_LIMITS_RANGE[type];
  out.push({
    id: `r-${id}`,
    name,
    type,
    basePrepMeanMinutes: mean + (Math.random() - 0.5) * 4,
    basePrepStdMinutes: Math.max(1, std + (Math.random() - 0.5) * 2),
    lng,
    lat,
    ...(groupId && { groupId }),
    commission: type === "internal" || type === "selection" ? 0 : Math.round(randomInRange(comm.min, comm.max) * 10) / 10,
    capacityLimits: Math.round(randomInRange(cap.min, cap.max)),
  });
  return id + 1;
}

export function generateRestaurants(): Restaurant[] {
  const out: Restaurant[] = [];
  let id = 1;
  const usedInternal = new Set<number>();
  const usedPartner = new Set<number>();
  const usedSelection = new Set<number>();

  for (let i = 0; i < 77; i++) {
    let lng: number;
    let lat: number;
    if (i === 0) {
      lng = INTERNAL_BUILDING_CENTER.lng;
      lat = INTERNAL_BUILDING_CENTER.lat;
    } else if (i >= 1 && i < 33) {
      if (i === 1) {
        lng = INTERNAL_ANCHOR_2.lng;
        lat = INTERNAL_ANCHOR_2.lat;
      } else {
        lng = INTERNAL_ANCHOR_2.lng + randomInRange(-INTERNAL_ANCHOR_2_RADIUS, INTERNAL_ANCHOR_2_RADIUS);
        lat = INTERNAL_ANCHOR_2.lat + randomInRange(-INTERNAL_ANCHOR_2_RADIUS, INTERNAL_ANCHOR_2_RADIUS);
      }
    } else if (i >= 33 && i < 57) {
      if (i === 33) {
        lng = INTERNAL_ANCHOR_3.lng;
        lat = INTERNAL_ANCHOR_3.lat;
      } else {
        lng = INTERNAL_ANCHOR_3.lng + randomInRange(-INTERNAL_ANCHOR_3_RADIUS, INTERNAL_ANCHOR_3_RADIUS);
        lat = INTERNAL_ANCHOR_3.lat + randomInRange(-INTERNAL_ANCHOR_3_RADIUS, INTERNAL_ANCHOR_3_RADIUS);
      }
    } else {
      lng = INTERNAL_BUILDING_CENTER.lng + randomInRange(-INTERNAL_CLUSTER_RADIUS, INTERNAL_CLUSTER_RADIUS);
      lat = INTERNAL_BUILDING_CENTER.lat + randomInRange(-INTERNAL_CLUSTER_RADIUS, INTERNAL_CLUSTER_RADIUS);
    }
    id = addRestaurant(out, id, "internal", lng, lat, usedInternal);
  }

  for (const g of RESTAURANT_GROUPS) {
    for (let k = 0; k < g.partnerCount; k++) {
      const lng = g.center.lng + randomInRange(-g.radius, g.radius);
      const lat = g.center.lat + randomInRange(-g.radius, g.radius);
      id = addRestaurant(out, id, "partner", lng, lat, usedPartner, g.id);
    }
    for (let k = 0; k < g.selectionCount; k++) {
      const lng = g.center.lng + randomInRange(-g.radius, g.radius);
      const lat = g.center.lat + randomInRange(-g.radius, g.radius);
      id = addRestaurant(out, id, "selection", lng, lat, usedSelection, g.id);
    }
  }

  const groupedPartner = RESTAURANT_GROUPS.reduce((s, g) => s + g.partnerCount, 0);
  const groupedSelection = RESTAURANT_GROUPS.reduce((s, g) => s + g.selectionCount, 0);
  for (let i = 0; i < 20 - groupedPartner; i++) {
    id = addRestaurant(out, id, "partner", randomInRange(DTLA_LNG_MIN, DTLA_LNG_MAX), randomInRange(DTLA_LAT_MIN, DTLA_LAT_MAX), usedPartner);
  }
  for (let i = 0; i < 18 - groupedSelection; i++) {
    id = addRestaurant(out, id, "selection", randomInRange(DTLA_LNG_MIN, DTLA_LNG_MAX), randomInRange(DTLA_LAT_MIN, DTLA_LAT_MAX), usedSelection);
  }

  return out;
}

export const MOCK_RESTAURANTS = generateRestaurants();
