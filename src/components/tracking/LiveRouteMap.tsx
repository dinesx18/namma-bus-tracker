import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import type { BusStop } from "@/data/busData";

interface LiveRouteMapProps {
  stops: BusStop[];
  startIdx: number;
  endIdx: number;
  busPosition: [number, number] | null;
  etaLabel: string;
  showBus: boolean;
}

interface TileProvider {
  name: string;
  url: string;
  options: L.TileLayerOptions;
}

const TILE_PROVIDERS: TileProvider[] = [
  {
    name: "Carto Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    options: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
      detectRetina: true,
      crossOrigin: true,
    },
  },
  {
    name: "Esri Streets",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
      maxZoom: 19,
      detectRetina: true,
      crossOrigin: true,
    },
  },
  {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      detectRetina: true,
      crossOrigin: true,
    },
  },
];

const FALLBACK_CENTER: [number, number] = [13.0827, 80.2707];

const getTokenColor = (token: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return raw ? `hsl(${raw})` : fallback;
};

const createBusIcon = (etaLabel: string) =>
  L.divIcon({
    className: "track-bus-marker",
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
      ${
        etaLabel
          ? `<div style="padding:4px 10px;border-radius:9999px;background:hsl(var(--background));color:hsl(var(--foreground));box-shadow:var(--shadow-card);font-size:11px;font-weight:700;white-space:nowrap;line-height:1;">${etaLabel}</div>`
          : ""
      }
      <div style="background:hsl(var(--primary));width:40px;height:40px;border-radius:9999px;display:flex;align-items:center;justify-content:center;color:hsl(var(--primary-foreground));box-shadow:var(--shadow-elevated);border:2px solid hsl(var(--background));">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="15" rx="3"/>
          <rect x="5" y="5" width="5" height="5" rx="1" fill="hsl(var(--primary))" opacity="0.9"/>
          <rect x="14" y="5" width="5" height="5" rx="1" fill="hsl(var(--primary))" opacity="0.9"/>
          <circle cx="7.5" cy="20" r="2"/>
          <circle cx="16.5" cy="20" r="2"/>
          <rect x="4" y="17" width="16" height="2"/>
        </svg>
      </div>
    </div>`,
    iconSize: [124, 72],
    iconAnchor: [62, 64],
  });

const LiveRouteMap = ({ stops, startIdx, endIdx, busPosition, etaLabel, showBus }: LiveRouteMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const stopLayerRef = useRef<L.LayerGroup | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const providerIndexRef = useRef(0);
  const tileErrorsRef = useRef(0);

  const safeStops = useMemo(
    () => stops.filter((stop) => Number.isFinite(stop.lat) && Number.isFinite(stop.lng)),
    [stops],
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true,
      preferCanvas: true,
    });

    const setProvider = (index: number) => {
      const provider = TILE_PROVIDERS[index];
      providerIndexRef.current = index;
      tileErrorsRef.current = 0;

      if (tileLayerRef.current) {
        tileLayerRef.current.off("tileerror");
        tileLayerRef.current.remove();
      }

      const tileLayer = L.tileLayer(provider.url, provider.options).addTo(map);
      tileLayer.on("tileerror", () => {
        tileErrorsRef.current += 1;

        if (tileErrorsRef.current >= 8 && providerIndexRef.current < TILE_PROVIDERS.length - 1) {
          setProvider(providerIndexRef.current + 1);
        }
      });

      tileLayerRef.current = tileLayer;
    };

    setProvider(0);

    const initialCenter: [number, number] = safeStops.length
      ? [safeStops[0].lat, safeStops[0].lng]
      : FALLBACK_CENTER;

    map.setView(initialCenter, 12);
    mapRef.current = map;

    const onWindowResize = () => {
      map.invalidateSize({ animate: false });
    };

    window.addEventListener("resize", onWindowResize);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
    });

    resizeObserver.observe(mapContainerRef.current);

    const resizeRaf = requestAnimationFrame(() => {
      map.invalidateSize({ animate: false });
    });

    return () => {
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onWindowResize);
      resizeObserver.disconnect();
      tileLayerRef.current?.off("tileerror");
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
    };
  }, [safeStops]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || safeStops.length < 2) return;

    routeLayerRef.current?.remove();
    stopLayerRef.current?.remove();

    const fullRouteCoords = safeStops.map((stop) => [stop.lat, stop.lng] as [number, number]);

    const clampedStart = Math.max(0, Math.min(startIdx, safeStops.length - 1));
    const clampedEnd = Math.max(clampedStart, Math.min(endIdx, safeStops.length - 1));

    const primary = getTokenColor("--primary", "hsl(25 100% 50%)");
    const primaryDark = getTokenColor("--accent-foreground", "hsl(25 100% 30%)");
    const muted = getTokenColor("--muted-foreground", "hsl(215 16% 47%)");
    const border = getTokenColor("--border", "hsl(214 32% 91%)");
    const secondary = getTokenColor("--secondary", "hsl(30 100% 96%)");
    const destructive = getTokenColor("--destructive", "hsl(0 84% 60%)");

    const routeLayer = L.layerGroup();
    const stopLayer = L.layerGroup();

    L.polyline(fullRouteCoords, {
      color: border,
      weight: 5,
      dashArray: "12 8",
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(routeLayer);

    L.polyline(fullRouteCoords.slice(clampedStart, clampedEnd + 1), {
      color: primary,
      weight: 6,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(routeLayer);

    safeStops.forEach((stop, index) => {
      const isOrigin = index === 0;
      const isFinal = index === safeStops.length - 1;
      const isUserStart = index === clampedStart;
      const isUserEnd = index === clampedEnd;

      let fillColor = border;
      let strokeColor = muted;
      let radius = 5;
      let label = stop.name;

      if (isOrigin) {
        fillColor = secondary;
        strokeColor = primaryDark;
        radius = 7;
        label = `Route start • ${stop.name}`;
      }

      if (isFinal) {
        fillColor = secondary;
        strokeColor = primaryDark;
        radius = 7;
        label = `Route end • ${stop.name}`;
      }

      if (isUserStart) {
        fillColor = primary;
        strokeColor = primaryDark;
        radius = 9;
        label = `Your pickup • ${stop.name}`;
      }

      if (isUserEnd) {
        fillColor = destructive;
        strokeColor = primaryDark;
        radius = 9;
        label = `Your destination • ${stop.name}`;
      }

      L.circleMarker([stop.lat, stop.lng], {
        radius,
        fillColor,
        fillOpacity: 1,
        color: strokeColor,
        weight: 2.5,
      })
        .bindTooltip(label, { direction: "top", offset: [0, -8] })
        .bindPopup(label)
        .addTo(stopLayer);
    });

    routeLayer.addTo(map);
    stopLayer.addTo(map);

    routeLayerRef.current = routeLayer;
    stopLayerRef.current = stopLayer;

    const bounds = L.latLngBounds(fullRouteCoords.map(([lat, lng]) => L.latLng(lat, lng)));
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
    map.invalidateSize({ animate: false });
  }, [safeStops, startIdx, endIdx]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!showBus || !busPosition) {
      busMarkerRef.current?.remove();
      busMarkerRef.current = null;
      return;
    }

    const icon = createBusIcon(etaLabel);

    if (!busMarkerRef.current) {
      busMarkerRef.current = L.marker(busPosition, { icon, keyboard: false, zIndexOffset: 1000 }).addTo(map);
      return;
    }

    busMarkerRef.current.setLatLng(busPosition);
    busMarkerRef.current.setIcon(icon);
  }, [busPosition, etaLabel, showBus]);

  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full"
      role="application"
      aria-label="Live route map"
      data-map-provider={TILE_PROVIDERS[providerIndexRef.current]?.name ?? "Map"}
    />
  );
};

export default LiveRouteMap;
