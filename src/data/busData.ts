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

// Comprehensive Chennai bus stops with real coordinates
export const busStops: BusStop[] = [
  // Major Terminals & Junctions
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

  // South Chennai
  { id: "s11", name: "Tambaram", lat: 12.9249, lng: 80.1000 },
  { id: "s12", name: "Chromepet", lat: 12.9516, lng: 80.1462 },
  { id: "s13", name: "Pallavaram", lat: 12.9675, lng: 80.1491 },
  { id: "s14", name: "Meenambakkam", lat: 12.9823, lng: 80.1575 },
  { id: "s15", name: "Alandur", lat: 13.0021, lng: 80.2060 },
  { id: "s16", name: "Velachery", lat: 12.9815, lng: 80.2180 },
  { id: "s17", name: "Medavakkam", lat: 12.9200, lng: 80.1920 },
  { id: "s18", name: "Madipakkam", lat: 12.9621, lng: 80.1985 },
  { id: "s19", name: "Sholinganallur", lat: 12.9010, lng: 80.2279 },
  { id: "s20", name: "Perungudi", lat: 12.9612, lng: 80.2410 },
  { id: "s21", name: "Thoraipakkam", lat: 12.9350, lng: 80.2330 },
  { id: "s22", name: "Palavakkam", lat: 12.9530, lng: 80.2580 },
  { id: "s23", name: "Neelankarai", lat: 12.9500, lng: 80.2600 },
  { id: "s24", name: "Injambakkam", lat: 12.9180, lng: 80.2520 },
  { id: "s25", name: "Kelambakkam", lat: 12.7880, lng: 80.2200 },
  { id: "s26", name: "Mahabalipuram", lat: 12.6269, lng: 80.1927 },
  { id: "s27", name: "Nanganallur", lat: 12.9840, lng: 80.1930 },
  { id: "s28", name: "Adambakkam", lat: 12.9880, lng: 80.2050 },
  { id: "s29", name: "Pallikaranai", lat: 12.9450, lng: 80.2110 },
  { id: "s30", name: "Sithalapakkam", lat: 12.9100, lng: 80.2000 },

  // Central Chennai
  { id: "s31", name: "Egmore", lat: 13.0732, lng: 80.2609 },
  { id: "s32", name: "Central Station", lat: 13.0827, lng: 80.2707 },
  { id: "s33", name: "Broadway", lat: 13.0878, lng: 80.2785 },
  { id: "s34", name: "Parrys Corner", lat: 13.0936, lng: 80.2874 },
  { id: "s35", name: "Royapuram", lat: 13.1070, lng: 80.2942 },
  { id: "s36", name: "Triplicane", lat: 13.0590, lng: 80.2750 },
  { id: "s37", name: "Mylapore", lat: 13.0368, lng: 80.2676 },
  { id: "s38", name: "Mandaveli", lat: 13.0250, lng: 80.2610 },
  { id: "s39", name: "Alwarpet", lat: 13.0330, lng: 80.2500 },
  { id: "s40", name: "Nungambakkam", lat: 13.0600, lng: 80.2420 },
  { id: "s41", name: "Chetpet", lat: 13.0720, lng: 80.2430 },
  { id: "s42", name: "Kilpauk", lat: 13.0800, lng: 80.2400 },
  { id: "s43", name: "Purasawalkam", lat: 13.0870, lng: 80.2500 },
  { id: "s44", name: "Vepery", lat: 13.0780, lng: 80.2580 },
  { id: "s45", name: "Choolai", lat: 13.0880, lng: 80.2670 },
  { id: "s46", name: "Washermanpet", lat: 13.1010, lng: 80.2810 },
  { id: "s47", name: "Tondiarpet", lat: 13.1150, lng: 80.2850 },
  { id: "s48", name: "George Town", lat: 13.0900, lng: 80.2830 },
  { id: "s49", name: "Chepauk", lat: 13.0630, lng: 80.2810 },
  { id: "s50", name: "Rajarathinam Stadium", lat: 13.0700, lng: 80.2550 },

  // North Chennai
  { id: "s51", name: "Perambur", lat: 13.1119, lng: 80.2336 },
  { id: "s52", name: "Villivakkam", lat: 13.1100, lng: 80.2100 },
  { id: "s53", name: "Kolathur", lat: 13.1220, lng: 80.2180 },
  { id: "s54", name: "Anna Nagar", lat: 13.0850, lng: 80.2101 },
  { id: "s55", name: "Anna Nagar East", lat: 13.0900, lng: 80.2190 },
  { id: "s56", name: "Anna Nagar West", lat: 13.0850, lng: 80.2020 },
  { id: "s57", name: "Arumbakkam", lat: 13.0726, lng: 80.2100 },
  { id: "s58", name: "Aminjikarai", lat: 13.0690, lng: 80.2280 },
  { id: "s59", name: "Shenoy Nagar", lat: 13.0790, lng: 80.2300 },
  { id: "s60", name: "Mogappair", lat: 13.0920, lng: 80.1700 },
  { id: "s61", name: "Ambattur", lat: 13.1143, lng: 80.1548 },
  { id: "s62", name: "Avadi", lat: 13.1145, lng: 80.1027 },
  { id: "s63", name: "Padi", lat: 13.0950, lng: 80.1900 },
  { id: "s64", name: "Thirumangalam", lat: 13.0870, lng: 80.2030 },
  { id: "s65", name: "Madhavaram", lat: 13.1500, lng: 80.2300 },
  { id: "s66", name: "Manali", lat: 13.1660, lng: 80.2600 },
  { id: "s67", name: "Ennore", lat: 13.2130, lng: 80.3190 },
  { id: "s68", name: "Tiruvottiyur", lat: 13.1600, lng: 80.2970 },
  { id: "s69", name: "Red Hills", lat: 13.1900, lng: 80.1850 },
  { id: "s70", name: "Puzhal", lat: 13.1670, lng: 80.2000 },

  // West Chennai
  { id: "s71", name: "Porur", lat: 13.0373, lng: 80.1565 },
  { id: "s72", name: "Valasaravakkam", lat: 13.0450, lng: 80.1700 },
  { id: "s73", name: "Virugambakkam", lat: 13.0500, lng: 80.1850 },
  { id: "s74", name: "Ramapuram", lat: 13.0310, lng: 80.1800 },
  { id: "s75", name: "Manapakkam", lat: 13.0200, lng: 80.1680 },
  { id: "s76", name: "Mugalivakkam", lat: 13.0150, lng: 80.1620 },
  { id: "s77", name: "Kundrathur", lat: 12.9920, lng: 80.1020 },
  { id: "s78", name: "Mangadu", lat: 13.0250, lng: 80.1300 },
  { id: "s79", name: "Poonamallee", lat: 13.0480, lng: 80.0960 },
  { id: "s80", name: "Maduravoyal", lat: 13.0660, lng: 80.1700 },

  // East Chennai / Beach
  { id: "s81", name: "Besant Nagar", lat: 13.0003, lng: 80.2666 },
  { id: "s82", name: "Thiruvalluvar Nagar", lat: 12.9930, lng: 80.2610 },
  { id: "s83", name: "Kotturpuram", lat: 13.0130, lng: 80.2420 },
  { id: "s84", name: "Raja Annamalai Puram", lat: 13.0300, lng: 80.2590 },
  { id: "s85", name: "Marina Beach", lat: 13.0500, lng: 80.2820 },
  { id: "s86", name: "Foreshore Estate", lat: 13.0440, lng: 80.2770 },
  { id: "s87", name: "Pattinapakkam", lat: 13.0130, lng: 80.2700 },
  { id: "s88", name: "Kasturba Nagar", lat: 13.0090, lng: 80.2650 },

  // Additional areas
  { id: "s89", name: "Kodambakkam", lat: 13.0480, lng: 80.2220 },
  { id: "s90", name: "Teynampet", lat: 13.0440, lng: 80.2480 },
  { id: "s91", name: "Thousand Lights", lat: 13.0560, lng: 80.2560 },
  { id: "s92", name: "Sterling Road", lat: 13.0620, lng: 80.2380 },
  { id: "s93", name: "Ayyavoo Colony", lat: 13.0800, lng: 80.2550 },
  { id: "s94", name: "ICF", lat: 13.0760, lng: 80.1850 },
  { id: "s95", name: "Thiruverkadu", lat: 13.0740, lng: 80.1300 },
  { id: "s96", name: "Nerkundram", lat: 13.0670, lng: 80.1750 },
  { id: "s97", name: "Ayanavaram", lat: 13.1000, lng: 80.2380 },
  { id: "s98", name: "Otteri", lat: 13.0920, lng: 80.2550 },
  { id: "s99", name: "Perungalathur", lat: 12.9050, lng: 80.0920 },
  { id: "s100", name: "Vandalur", lat: 12.8920, lng: 80.0810 },
];

// Helper to get stop by name
const s = (name: string) => busStops.find((b) => b.name === name)!;

export const busRoutes: BusRoute[] = [
  // Route 1: 21G – CMBT to Thiruvanmiyur
  {
    id: "r1", busNumber: "21G",
    from: "CMBT (Chennai Mofussil Bus Terminus)", to: "Thiruvanmiyur",
    stops: [s("CMBT (Chennai Mofussil Bus Terminus)"), s("Koyambedu"), s("Vadapalani"), s("Ashok Nagar"), s("T. Nagar"), s("Saidapet"), s("Guindy"), s("Adyar"), s("Thiruvanmiyur")],
    totalTime: 65, frequency: 10,
  },
  // Route 2: 570 – Tambaram to Broadway
  {
    id: "r2", busNumber: "570",
    from: "Tambaram", to: "Broadway",
    stops: [s("Tambaram"), s("Chromepet"), s("Pallavaram"), s("Meenambakkam"), s("Alandur"), s("Guindy"), s("Saidapet"), s("T. Nagar"), s("Egmore"), s("Central Station"), s("Broadway")],
    totalTime: 80, frequency: 12,
  },
  // Route 3: M70 – Koyambedu to Velachery
  {
    id: "r3", busNumber: "M70",
    from: "Koyambedu", to: "Velachery",
    stops: [s("Koyambedu"), s("Vadapalani"), s("Ashok Nagar"), s("Mambalam"), s("Saidapet"), s("Guindy"), s("Velachery")],
    totalTime: 55, frequency: 15,
  },
  // Route 4: 119 – Broadway to Tambaram
  {
    id: "r4", busNumber: "119",
    from: "Broadway", to: "Tambaram",
    stops: [s("Broadway"), s("Central Station"), s("Egmore"), s("T. Nagar"), s("Saidapet"), s("Guindy"), s("Alandur"), s("Pallavaram"), s("Tambaram")],
    totalTime: 75, frequency: 8,
  },
  // Route 5: 27C – Central Station to Sholinganallur
  {
    id: "r5", busNumber: "27C",
    from: "Central Station", to: "Sholinganallur",
    stops: [s("Central Station"), s("Egmore"), s("T. Nagar"), s("Saidapet"), s("Guindy"), s("Adyar"), s("Thiruvanmiyur"), s("Sholinganallur")],
    totalTime: 70, frequency: 12,
  },
  // Route 6: 23C – Anna Nagar to Adyar
  {
    id: "r6", busNumber: "23C",
    from: "Anna Nagar", to: "Adyar",
    stops: [s("Anna Nagar"), s("Arumbakkam"), s("Vadapalani"), s("Ashok Nagar"), s("Mambalam"), s("Saidapet"), s("Guindy"), s("Adyar")],
    totalTime: 50, frequency: 10,
  },
  // Route 7: S70 – Porur to Broadway
  {
    id: "r7", busNumber: "S70",
    from: "Porur", to: "Broadway",
    stops: [s("Porur"), s("Vadapalani"), s("Ashok Nagar"), s("Mambalam"), s("T. Nagar"), s("Egmore"), s("Central Station"), s("Broadway")],
    totalTime: 60, frequency: 15,
  },
  // Route 8: M19 – Perambur to Guindy
  {
    id: "r8", busNumber: "M19",
    from: "Perambur", to: "Guindy",
    stops: [s("Perambur"), s("Villivakkam"), s("Anna Nagar"), s("Arumbakkam"), s("Vadapalani"), s("Ashok Nagar"), s("Saidapet"), s("Guindy")],
    totalTime: 55, frequency: 10,
  },
  // Route 9: 17A – Royapuram to Velachery
  {
    id: "r9", busNumber: "17A",
    from: "Royapuram", to: "Velachery",
    stops: [s("Royapuram"), s("Parrys Corner"), s("Broadway"), s("Central Station"), s("Egmore"), s("T. Nagar"), s("Saidapet"), s("Guindy"), s("Velachery")],
    totalTime: 70, frequency: 12,
  },
  // Route 10: M5 – CMBT to Central Station
  {
    id: "r10", busNumber: "M5",
    from: "CMBT (Chennai Mofussil Bus Terminus)", to: "Central Station",
    stops: [s("CMBT (Chennai Mofussil Bus Terminus)"), s("Koyambedu"), s("Arumbakkam"), s("Anna Nagar"), s("Villivakkam"), s("Central Station")],
    totalTime: 40, frequency: 8,
  },
  // Route 11: 29C – Tambaram to Thiruvanmiyur (via Velachery)
  {
    id: "r11", busNumber: "29C",
    from: "Tambaram", to: "Thiruvanmiyur",
    stops: [s("Tambaram"), s("Chromepet"), s("Pallavaram"), s("Nanganallur"), s("Madipakkam"), s("Velachery"), s("Perungudi"), s("Adyar"), s("Thiruvanmiyur")],
    totalTime: 60, frequency: 10,
  },
  // Route 12: 5B – Broadway to Tambaram (via Velachery)
  {
    id: "r12", busNumber: "5B",
    from: "Broadway", to: "Tambaram",
    stops: [s("Broadway"), s("Central Station"), s("Egmore"), s("Nungambakkam"), s("T. Nagar"), s("Saidapet"), s("Guindy"), s("Velachery"), s("Madipakkam"), s("Chromepet"), s("Tambaram")],
    totalTime: 90, frequency: 15,
  },
  // Route 13: 47A – Avadi to Broadway
  {
    id: "r13", busNumber: "47A",
    from: "Avadi", to: "Broadway",
    stops: [s("Avadi"), s("Ambattur"), s("Padi"), s("Mogappair"), s("Anna Nagar"), s("Kilpauk"), s("Egmore"), s("Central Station"), s("Broadway")],
    totalTime: 80, frequency: 12,
  },
  // Route 14: 11C – Besant Nagar to Broadway
  {
    id: "r14", busNumber: "11C",
    from: "Besant Nagar", to: "Broadway",
    stops: [s("Besant Nagar"), s("Adyar"), s("Kotturpuram"), s("Mylapore"), s("Triplicane"), s("Chepauk"), s("Central Station"), s("Broadway")],
    totalTime: 50, frequency: 10,
  },
  // Route 15: M27 – Medavakkam to T. Nagar
  {
    id: "r15", busNumber: "M27",
    from: "Medavakkam", to: "T. Nagar",
    stops: [s("Medavakkam"), s("Madipakkam"), s("Nanganallur"), s("Adambakkam"), s("Alandur"), s("Saidapet"), s("T. Nagar")],
    totalTime: 45, frequency: 12,
  },
  // Route 16: 1B – Poonamallee to Broadway
  {
    id: "r16", busNumber: "1B",
    from: "Poonamallee", to: "Broadway",
    stops: [s("Poonamallee"), s("Porur"), s("Valasaravakkam"), s("Vadapalani"), s("Kodambakkam"), s("T. Nagar"), s("Nungambakkam"), s("Egmore"), s("Broadway")],
    totalTime: 75, frequency: 10,
  },
  // Route 17: 12B – Madhavaram to Guindy
  {
    id: "r17", busNumber: "12B",
    from: "Madhavaram", to: "Guindy",
    stops: [s("Madhavaram"), s("Perambur"), s("Ayanavaram"), s("Kilpauk"), s("Nungambakkam"), s("T. Nagar"), s("Saidapet"), s("Guindy")],
    totalTime: 65, frequency: 10,
  },
  // Route 18: 15A – Tondiarpet to Adyar
  {
    id: "r18", busNumber: "15A",
    from: "Tondiarpet", to: "Adyar",
    stops: [s("Tondiarpet"), s("Washermanpet"), s("Royapuram"), s("Parrys Corner"), s("George Town"), s("Central Station"), s("Egmore"), s("Thousand Lights"), s("Teynampet"), s("Alwarpet"), s("Adyar")],
    totalTime: 60, frequency: 8,
  },
  // Route 19: 45A – Chromepet to Mylapore
  {
    id: "r19", busNumber: "45A",
    from: "Chromepet", to: "Mylapore",
    stops: [s("Chromepet"), s("Pallavaram"), s("Alandur"), s("Guindy"), s("Saidapet"), s("Alwarpet"), s("Mylapore")],
    totalTime: 50, frequency: 12,
  },
  // Route 20: M44 – Velachery to Egmore
  {
    id: "r20", busNumber: "M44",
    from: "Velachery", to: "Egmore",
    stops: [s("Velachery"), s("Guindy"), s("Saidapet"), s("T. Nagar"), s("Nungambakkam"), s("Chetpet"), s("Egmore")],
    totalTime: 45, frequency: 10,
  },
  // Route 21: 23B – Kolathur to Saidapet
  {
    id: "r21", busNumber: "23B",
    from: "Kolathur", to: "Saidapet",
    stops: [s("Kolathur"), s("Villivakkam"), s("Anna Nagar East"), s("Anna Nagar"), s("Arumbakkam"), s("Vadapalani"), s("Ashok Nagar"), s("Kodambakkam"), s("Mambalam"), s("Saidapet")],
    totalTime: 55, frequency: 12,
  },
  // Route 22: E55 – Tambaram to Sholinganallur
  {
    id: "r22", busNumber: "E55",
    from: "Tambaram", to: "Sholinganallur",
    stops: [s("Tambaram"), s("Chromepet"), s("Madipakkam"), s("Velachery"), s("Perungudi"), s("Thoraipakkam"), s("Sholinganallur")],
    totalTime: 55, frequency: 15,
  },
  // Route 23: 54 – Red Hills to Broadway
  {
    id: "r23", busNumber: "54",
    from: "Red Hills", to: "Broadway",
    stops: [s("Red Hills"), s("Puzhal"), s("Madhavaram"), s("Perambur"), s("Purasawalkam"), s("Egmore"), s("Broadway")],
    totalTime: 65, frequency: 12,
  },
  // Route 24: M21 – Madipakkam to Central Station
  {
    id: "r24", busNumber: "M21",
    from: "Madipakkam", to: "Central Station",
    stops: [s("Madipakkam"), s("Nanganallur"), s("Adambakkam"), s("Alandur"), s("Guindy"), s("Saidapet"), s("T. Nagar"), s("Nungambakkam"), s("Egmore"), s("Central Station")],
    totalTime: 65, frequency: 10,
  },
  // Route 25: 36B – Thiruvanmiyur to Broadway (via ECR)
  {
    id: "r25", busNumber: "36B",
    from: "Thiruvanmiyur", to: "Broadway",
    stops: [s("Thiruvanmiyur"), s("Adyar"), s("Besant Nagar"), s("Mylapore"), s("Triplicane"), s("Marina Beach"), s("Chepauk"), s("George Town"), s("Broadway")],
    totalTime: 55, frequency: 10,
  },
  // Route 26: 49 – Porur to Central Station
  {
    id: "r26", busNumber: "49",
    from: "Porur", to: "Central Station",
    stops: [s("Porur"), s("Ramapuram"), s("Vadapalani"), s("Kodambakkam"), s("Nungambakkam"), s("Chetpet"), s("Kilpauk"), s("Egmore"), s("Central Station")],
    totalTime: 55, frequency: 10,
  },
  // Route 27: 7C – Anna Nagar to Thiruvanmiyur
  {
    id: "r27", busNumber: "7C",
    from: "Anna Nagar", to: "Thiruvanmiyur",
    stops: [s("Anna Nagar"), s("Shenoy Nagar"), s("Chetpet"), s("Nungambakkam"), s("Teynampet"), s("Alwarpet"), s("Mylapore"), s("Mandaveli"), s("Adyar"), s("Thiruvanmiyur")],
    totalTime: 55, frequency: 10,
  },
  // Route 28: M99 – Poonamallee to Velachery
  {
    id: "r28", busNumber: "M99",
    from: "Poonamallee", to: "Velachery",
    stops: [s("Poonamallee"), s("Mangadu"), s("Porur"), s("Ramapuram"), s("Guindy"), s("Alandur"), s("Adambakkam"), s("Madipakkam"), s("Velachery")],
    totalTime: 70, frequency: 15,
  },
  // Route 29: 18A – Ennore to Central Station
  {
    id: "r29", busNumber: "18A",
    from: "Ennore", to: "Central Station",
    stops: [s("Ennore"), s("Tiruvottiyur"), s("Tondiarpet"), s("Washermanpet"), s("Royapuram"), s("Parrys Corner"), s("George Town"), s("Central Station")],
    totalTime: 60, frequency: 12,
  },
  // Route 30: 55K – Vandalur to Broadway
  {
    id: "r30", busNumber: "55K",
    from: "Vandalur", to: "Broadway",
    stops: [s("Vandalur"), s("Perungalathur"), s("Tambaram"), s("Chromepet"), s("Pallavaram"), s("Alandur"), s("Guindy"), s("Saidapet"), s("T. Nagar"), s("Egmore"), s("Central Station"), s("Broadway")],
    totalTime: 95, frequency: 15,
  },
  // Route 31: 19B – Adyar to Broadway
  {
    id: "r31", busNumber: "19B",
    from: "Adyar", to: "Broadway",
    stops: [s("Adyar"), s("Mandaveli"), s("Mylapore"), s("Triplicane"), s("Chepauk"), s("Central Station"), s("Broadway")],
    totalTime: 52, frequency: 8,
  },
  // Route 32: 102 – Avadi to Tambaram
  {
    id: "r32", busNumber: "102",
    from: "Avadi", to: "Tambaram",
    stops: [s("Avadi"), s("Ambattur"), s("Padi"), s("Koyambedu"), s("Vadapalani"), s("Ashok Nagar"), s("Guindy"), s("Alandur"), s("Pallavaram"), s("Chromepet"), s("Tambaram")],
    totalTime: 92, frequency: 12,
  },
  // Route 33: 52A – Puzhal to T. Nagar
  {
    id: "r33", busNumber: "52A",
    from: "Puzhal", to: "T. Nagar",
    stops: [s("Puzhal"), s("Madhavaram"), s("Perambur"), s("Ayanavaram"), s("Kilpauk"), s("Chetpet"), s("Nungambakkam"), s("T. Nagar")],
    totalTime: 58, frequency: 10,
  },
  // Route 34: D70 – Kelambakkam to Broadway
  {
    id: "r34", busNumber: "D70",
    from: "Kelambakkam", to: "Broadway",
    stops: [s("Kelambakkam"), s("Sholinganallur"), s("Thoraipakkam"), s("Perungudi"), s("Thiruvanmiyur"), s("Adyar"), s("Mylapore"), s("Triplicane"), s("Chepauk"), s("Broadway")],
    totalTime: 98, frequency: 15,
  },
  // Route 35: E18 – Vandalur to Sholinganallur
  {
    id: "r35", busNumber: "E18",
    from: "Vandalur", to: "Sholinganallur",
    stops: [s("Vandalur"), s("Perungalathur"), s("Tambaram"), s("Medavakkam"), s("Sithalapakkam"), s("Sholinganallur")],
    totalTime: 62, frequency: 15,
  },
  // Route 36: M88 – Porur to Thiruvanmiyur
  {
    id: "r36", busNumber: "M88",
    from: "Porur", to: "Thiruvanmiyur",
    stops: [s("Porur"), s("Valasaravakkam"), s("Virugambakkam"), s("Vadapalani"), s("Ashok Nagar"), s("Saidapet"), s("Guindy"), s("Adyar"), s("Thiruvanmiyur")],
    totalTime: 70, frequency: 10,
  },
  // Route 37: 27D – Red Hills to Central Station
  {
    id: "r37", busNumber: "27D",
    from: "Red Hills", to: "Central Station",
    stops: [s("Red Hills"), s("Puzhal"), s("Madhavaram"), s("Perambur"), s("Ayanavaram"), s("Vepery"), s("Egmore"), s("Central Station")],
    totalTime: 72, frequency: 12,
  },
  // Route 38: 6A – Besant Nagar to Tambaram
  {
    id: "r38", busNumber: "6A",
    from: "Besant Nagar", to: "Tambaram",
    stops: [s("Besant Nagar"), s("Adyar"), s("Guindy"), s("Alandur"), s("Nanganallur"), s("Madipakkam"), s("Medavakkam"), s("Tambaram")],
    totalTime: 68, frequency: 10,
  },
  // Route 39: 41C – Poonamallee to T. Nagar
  {
    id: "r39", busNumber: "41C",
    from: "Poonamallee", to: "T. Nagar",
    stops: [s("Poonamallee"), s("Porur"), s("Maduravoyal"), s("Koyambedu"), s("Vadapalani"), s("Kodambakkam"), s("T. Nagar")],
    totalTime: 65, frequency: 10,
  },
  // Route 40: M51 – Ennore to Sholinganallur
  {
    id: "r40", busNumber: "M51",
    from: "Ennore", to: "Sholinganallur",
    stops: [s("Ennore"), s("Tiruvottiyur"), s("Tondiarpet"), s("Washermanpet"), s("Central Station"), s("Egmore"), s("T. Nagar"), s("Saidapet"), s("Guindy"), s("Perungudi"), s("Sholinganallur")],
    totalTime: 105, frequency: 15,
  },
];

export interface RouteSegment {
  userStops: BusStop[];
  beforeUser: BusStop[];
  afterUser: BusStop[];
  allStops: BusStop[];
  etaToStart: number;
  travelTime: number;
  startIdx: number;
  endIdx: number;
}

export function findRoutes(startStop: string, endStop: string): BusRoute[] {
  return busRoutes.filter((route) => {
    const stopNames = route.stops.map((stop) => stop.name);
    const startIdx = stopNames.indexOf(startStop);
    const endIdx = stopNames.indexOf(endStop);
    return startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
  });
}

export function getRouteSegment(route: BusRoute, startStop: string, endStop: string): RouteSegment | null {
  const stopNames = route.stops.map((stop) => stop.name);
  const startIdx = stopNames.indexOf(startStop);
  const endIdx = stopNames.indexOf(endStop);

  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
    return null;
  }

  const userStops = route.stops.slice(startIdx, endIdx + 1);
  const beforeUser = route.stops.slice(0, startIdx + 1);
  const afterUser = route.stops.slice(endIdx);

  const totalStops = Math.max(route.stops.length - 1, 1);
  const timePerStop = route.totalTime / totalStops;

  return {
    userStops,
    beforeUser,
    afterUser,
    allStops: route.stops,
    etaToStart: Math.round(startIdx * timePerStop),
    travelTime: Math.round((endIdx - startIdx) * timePerStop),
    startIdx,
    endIdx,
  };
}

// Deterministic pseudo-random based on route id for stable arrival times
export function getArrivalTime(routeId: string): number {
  let hash = 0;
  for (let i = 0; i < routeId.length; i += 1) {
    hash = ((hash << 5) - hash) + routeId.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 12) + 2;
}

export function searchStops(query: string): BusStop[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...busStops].sort((a, b) => a.name.localeCompare(b.name));
  }

  return busStops
    .filter((stop) => stop.name.toLowerCase().includes(normalized))
    .sort((a, b) => a.name.localeCompare(b.name));
}
