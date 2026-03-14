export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  from: string;
  to: string;
  stops: BusStop[];
  totalTime: number; // minutes
  frequency: number; // minutes between buses
}

// Tamil Nadu bus stops with real coordinates
export const busStops: BusStop[] = [
  { id: "s1", name: "CMBT (Chennai Mofussil Bus Terminus)", lat: 13.0694, lng: 80.2030 },
  { id: "s2", name: "Koyambedu", lat: 13.0694, lng: 80.1948 },
  { id: "s3", name: "Vadapalani", lat: 13.0516, lng: 80.2121 },
  { id: "s4", name: "Ashok Nagar", lat: 13.0383, lng: 80.2120 },
  { id: "s5", name: "T. Nagar", lat: 13.0418, lng: 80.2341 },
  { id: "s6", name: "Mambalam", lat: 13.0383, lng: 80.2262 },
  { id: "s7", name: "Saidapet", lat: 13.0215, lng: 80.2237 },
  { id: "s8", name: "Guindy", lat: 13.0067, lng: 80.2206 },
  { id: "s9", name: "Adyar", lat: 13.0063, lng: 80.2574 },
  { id: "s10", name: "Thiruvanmiyur", lat: 12.9830, lng: 80.2594 },
  { id: "s11", name: "Tambaram", lat: 12.9249, lng: 80.1000 },
  { id: "s12", name: "Chromepet", lat: 12.9516, lng: 80.1462 },
  { id: "s13", name: "Pallavaram", lat: 12.9675, lng: 80.1491 },
  { id: "s14", name: "Meenambakkam", lat: 12.9823, lng: 80.1575 },
  { id: "s15", name: "Alandur", lat: 13.0021, lng: 80.2060 },
  { id: "s16", name: "Egmore", lat: 13.0732, lng: 80.2609 },
  { id: "s17", name: "Central Station", lat: 13.0827, lng: 80.2707 },
  { id: "s18", name: "Broadway", lat: 13.0878, lng: 80.2785 },
  { id: "s19", name: "Parrys Corner", lat: 13.0936, lng: 80.2874 },
  { id: "s20", name: "Royapuram", lat: 13.1070, lng: 80.2942 },
  { id: "s21", name: "Perambur", lat: 13.1119, lng: 80.2336 },
  { id: "s22", name: "Villivakkam", lat: 13.1100, lng: 80.2100 },
  { id: "s23", name: "Anna Nagar", lat: 13.0850, lng: 80.2101 },
  { id: "s24", name: "Arumbakkam", lat: 13.0726, lng: 80.2100 },
  { id: "s25", name: "Porur", lat: 13.0373, lng: 80.1565 },
  { id: "s26", name: "Velachery", lat: 12.9815, lng: 80.2180 },
  { id: "s27", name: "Sholinganallur", lat: 12.9010, lng: 80.2279 },
  { id: "s28", name: "Mahabalipuram", lat: 12.6269, lng: 80.1927 },
  { id: "s29", name: "Medavakkam", lat: 12.9200, lng: 80.1920 },
  { id: "s30", name: "Madipakkam", lat: 12.9621, lng: 80.1985 },
];

export const busRoutes: BusRoute[] = [
  {
    id: "r1",
    busNumber: "21G",
    from: "CMBT (Chennai Mofussil Bus Terminus)",
    to: "Thiruvanmiyur",
    stops: [
      busStops[0], busStops[1], busStops[2], busStops[3],
      busStops[4], busStops[6], busStops[7], busStops[8], busStops[9],
    ],
    totalTime: 65,
    frequency: 10,
  },
  {
    id: "r2",
    busNumber: "570",
    from: "Tambaram",
    to: "Broadway",
    stops: [
      busStops[10], busStops[11], busStops[12], busStops[13],
      busStops[14], busStops[7], busStops[6], busStops[4],
      busStops[15], busStops[16], busStops[17],
    ],
    totalTime: 80,
    frequency: 12,
  },
  {
    id: "r3",
    busNumber: "M70",
    from: "Koyambedu",
    to: "Velachery",
    stops: [
      busStops[1], busStops[2], busStops[3], busStops[5],
      busStops[6], busStops[7], busStops[25],
    ],
    totalTime: 55,
    frequency: 15,
  },
  {
    id: "r4",
    busNumber: "119",
    from: "Broadway",
    to: "Tambaram",
    stops: [
      busStops[17], busStops[16], busStops[15], busStops[4],
      busStops[6], busStops[7], busStops[14], busStops[12], busStops[10],
    ],
    totalTime: 75,
    frequency: 8,
  },
  {
    id: "r5",
    busNumber: "27C",
    from: "Central Station",
    to: "Sholinganallur",
    stops: [
      busStops[16], busStops[15], busStops[4], busStops[6],
      busStops[7], busStops[8], busStops[9], busStops[26],
    ],
    totalTime: 70,
    frequency: 12,
  },
  {
    id: "r6",
    busNumber: "23C",
    from: "Anna Nagar",
    to: "Adyar",
    stops: [
      busStops[22], busStops[23], busStops[2], busStops[3],
      busStops[5], busStops[6], busStops[7], busStops[8],
    ],
    totalTime: 50,
    frequency: 10,
  },
  {
    id: "r7",
    busNumber: "S70",
    from: "Porur",
    to: "Broadway",
    stops: [
      busStops[24], busStops[2], busStops[3], busStops[5],
      busStops[4], busStops[15], busStops[16], busStops[17],
    ],
    totalTime: 60,
    frequency: 15,
  },
  {
    id: "r8",
    busNumber: "M19",
    from: "Perambur",
    to: "Guindy",
    stops: [
      busStops[20], busStops[21], busStops[22], busStops[23],
      busStops[2], busStops[3], busStops[6], busStops[7],
    ],
    totalTime: 55,
    frequency: 10,
  },
  {
    id: "r9",
    busNumber: "17A",
    from: "Royapuram",
    to: "Velachery",
    stops: [
      busStops[19], busStops[18], busStops[17], busStops[16],
      busStops[15], busStops[4], busStops[6], busStops[7],
      busStops[25],
    ],
    totalTime: 70,
    frequency: 12,
  },
  {
    id: "r10",
    busNumber: "M5",
    from: "CMBT (Chennai Mofussil Bus Terminus)",
    to: "Central Station",
    stops: [
      busStops[0], busStops[1], busStops[23], busStops[22],
      busStops[21], busStops[16],
    ],
    totalTime: 40,
    frequency: 8,
  },
];

export function findRoutes(startStop: string, endStop: string): BusRoute[] {
  return busRoutes.filter((route) => {
    const stopNames = route.stops.map((s) => s.name);
    const startIdx = stopNames.indexOf(startStop);
    const endIdx = stopNames.indexOf(endStop);
    return startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
  });
}

export function getRouteSegment(route: BusRoute, startStop: string, endStop: string) {
  const stopNames = route.stops.map((s) => s.name);
  const startIdx = stopNames.indexOf(startStop);
  const endIdx = stopNames.indexOf(endStop);
  
  const userStops = route.stops.slice(startIdx, endIdx + 1);
  const beforeUser = route.stops.slice(0, startIdx + 1);
  const afterUser = route.stops.slice(endIdx);
  
  const totalStops = route.stops.length - 1;
  const timePerStop = route.totalTime / totalStops;
  
  const etaToStart = Math.round(startIdx * timePerStop);
  const travelTime = Math.round((endIdx - startIdx) * timePerStop);
  
  return {
    userStops,
    beforeUser,
    afterUser,
    allStops: route.stops,
    etaToStart,
    travelTime,
    startIdx,
    endIdx,
  };
}

export function searchStops(query: string): BusStop[] {
  if (!query) return busStops;
  const q = query.toLowerCase();
  return busStops.filter((s) => s.name.toLowerCase().includes(q));
}
