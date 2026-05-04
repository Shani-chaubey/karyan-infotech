/**
 * Preset cities for the home “Our presence” map. Each entry has approximate
 * coordinates so markers align on a simple India bounding-box projection.
 * `region` drives a light-golden highlight blob on the map when that city is selected.
 */
export type IndiaMapRegionId =
  | "north"
  | "west"
  | "central"
  | "east"
  | "south"
  | "northeast";

export type IndiaPresenceCityDef = {
  id: string;
  /** Human-readable name (shown in uppercase on the site) */
  label: string;
  lat: number;
  lon: number;
  /** Broad map region for golden highlight */
  region: IndiaMapRegionId;
};

/**
 * Soft ellipses in the same 0–100 coordinate space as markers (viewBox 0 0 100 100).
 * Tuned to read as “Indian regions” on the simplified rectangular map.
 */
export const INDIA_REGION_ELLIPSES: Record<
  IndiaMapRegionId,
  { cx: number; cy: number; rx: number; ry: number }
> = {
  north: { cx: 44, cy: 30, rx: 14, ry: 16 },
  west: { cx: 26, cy: 52, rx: 16, ry: 24 },
  central: { cx: 44, cy: 50, rx: 14, ry: 20 },
  east: { cx: 64, cy: 48, rx: 16, ry: 22 },
  south: { cx: 42, cy: 76, rx: 24, ry: 16 },
  northeast: { cx: 80, cy: 36, rx: 10, ry: 16 },
};

/** Rough mainland India + islands bbox for normalised map placement */
const MAP = {
  minLat: 6.4,
  maxLat: 37.2,
  minLon: 67.8,
  maxLon: 97.8,
};

export function projectIndiaPresenceToMapPercent(lat: number, lon: number): { x: number; y: number } {
  const x = ((lon - MAP.minLon) / (MAP.maxLon - MAP.minLon)) * 100;
  const y = ((MAP.maxLat - lat) / (MAP.maxLat - MAP.minLat)) * 100;
  return {
    x: Math.min(96, Math.max(4, x)),
    y: Math.min(94, Math.max(6, y)),
  };
}

export const INDIA_PRESENCE_CITIES: IndiaPresenceCityDef[] = [
  { id: "jhajjar", label: "Jhajjar", lat: 28.6078, lon: 76.6445, region: "north" },
  { id: "khordha", label: "Khordha", lat: 20.1722, lon: 85.6208, region: "east" },
  { id: "mendhasala", label: "Mendhasala", lat: 20.2289, lon: 85.8147, region: "east" },
  { id: "changodar", label: "Changodar", lat: 22.901, lon: 72.457, region: "west" },
  { id: "rajoda", label: "Rajoda", lat: 22.8305, lon: 72.4659, region: "west" },
  { id: "mehsana", label: "Mehsana", lat: 23.588, lon: 72.3693, region: "west" },
  { id: "jhagadia", label: "Jhagadia", lat: 21.7179, lon: 73.1605, region: "west" },
  { id: "kachholi", label: "Kachholi", lat: 22.567, lon: 75.678, region: "central" },
  { id: "ranchi", label: "Ranchi", lat: 23.3441, lon: 85.3096, region: "east" },
  { id: "patna", label: "Patna", lat: 25.5941, lon: 85.1376, region: "east" },
  { id: "wave-city", label: "Wave City", lat: 28.642, lon: 77.498, region: "north" },
  { id: "goa", label: "Goa", lat: 15.4989, lon: 73.8278, region: "west" },
  { id: "delhi", label: "Delhi", lat: 28.6139, lon: 77.209, region: "north" },
  { id: "gurugram", label: "Gurugram", lat: 28.4595, lon: 77.0266, region: "north" },
  { id: "noida", label: "Noida", lat: 28.5355, lon: 77.391, region: "north" },
  { id: "ghaziabad", label: "Ghaziabad", lat: 28.6692, lon: 77.4538, region: "north" },
  { id: "mumbai", label: "Mumbai", lat: 19.076, lon: 72.8777, region: "west" },
  { id: "bangalore", label: "Bengaluru", lat: 12.9716, lon: 77.5946, region: "south" },
  { id: "hyderabad", label: "Hyderabad", lat: 17.385, lon: 78.4867, region: "south" },
  { id: "chennai", label: "Chennai", lat: 13.0827, lon: 80.2707, region: "south" },
  { id: "kolkata", label: "Kolkata", lat: 22.5726, lon: 88.3639, region: "east" },
  { id: "ahmedabad", label: "Ahmedabad", lat: 23.0225, lon: 72.5714, region: "west" },
  { id: "pune", label: "Pune", lat: 18.5204, lon: 73.8567, region: "west" },
  { id: "jaipur", label: "Jaipur", lat: 26.9124, lon: 75.7873, region: "north" },
  { id: "lucknow", label: "Lucknow", lat: 26.8467, lon: 80.9462, region: "north" },
  { id: "indore", label: "Indore", lat: 22.7196, lon: 75.8577, region: "central" },
  { id: "bhubaneswar", label: "Bhubaneswar", lat: 20.2961, lon: 85.8245, region: "east" },
  { id: "surat", label: "Surat", lat: 21.1702, lon: 72.8311, region: "west" },
  { id: "vadodara", label: "Vadodara", lat: 22.3072, lon: 73.1812, region: "west" },
  { id: "nagpur", label: "Nagpur", lat: 21.1458, lon: 79.0882, region: "central" },
  { id: "kochi", label: "Kochi", lat: 9.9312, lon: 76.2673, region: "south" },
];

const byId = new Map(INDIA_PRESENCE_CITIES.map((c) => [c.id, c]));

export function getIndiaPresenceCity(id: string): IndiaPresenceCityDef | undefined {
  return byId.get(id);
}

export const INDIA_PRESENCE_CITIES_SORTED = [...INDIA_PRESENCE_CITIES].sort((a, b) =>
  a.label.localeCompare(b.label)
);
