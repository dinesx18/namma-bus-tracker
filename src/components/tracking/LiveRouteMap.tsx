import { useEffect, useRef } from "react";
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

const getTokenColor = (token: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return raw ? `hsl(${raw})` : fallback;
};

const createBusIcon = (etaLabel: string) =>
  L.divIcon({
    className: "track-bus-marker",
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      ${
        etaLabel
          ? `<div style="padding:2px 8px;border-radius:9999px;background:hsl(var(--background));color:hsl(var(--foreground));box-shadow:var(--shadow-card);font-size:10px;font-weight:700;white-space:nowrap;">${etaLabel}</div>`
          : ""
      }
      <div style="background:hsl(var(--primary));width:36px;height:36px;border-radius:9999px;display:flex;align-items:center;justify-content:center;color:hsl(var(--primary-foreground));box-shadow:var(--shadow-elevated);border:2px solid hsl(var(--background));">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="15" rx="3"/>
          <rect x="5" y="5" width="5" height="5" rx="1" fill="hsl(var(--primary))" opacity="0.9"/>
          <rect x="14" y="5" width="5" height="5" rx="1" fill="hsl(var(--primary))" opacity="0.9"/>
          <circle cx="7.5" cy="20" r="2"/>
          <circle cx="16.5" cy="20" r="2"/>
          <rect x="4" y="17" width="16" height="2"/>
        </svg>
      </div>
    </div>`,
    iconSize: [120, 64],
    iconAnchor: [60, 56],
  });

const LiveRouteMap = ({ stops, startIdx, endIdx, busPosition, etaLabel, showBus }: LiveRouteMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const stopLayerRef = useRef<L.LayerGroup | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true,
      preferCanvas: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const defaultCenter: [number, number] = stops.length
      ? [stops[0].lat, stops[0].lng]
      : [13.0827, 80.2707];

    map.setView(defaultCenter, 12);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [stops]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || stops.length < 2) return;

    routeLayerRef.current?.remove();
    stopLayerRef.current?.remove();

    const fullRouteCoords = stops.map((stop) => [stop.lat, stop.lng] as [number, number]);

    const primary = getTokenColor("--primary", "hsl(25 100% 50%)");
    const primaryDark = getTokenColor("--accent-foreground", "hsl(25 100% 30%)");
    const muted = getTokenColor("--muted-foreground", "hsl(215 16% 47%)");
    const border = getTokenColor("--border", "hsl(214 32% 91%)");
    const secondary = getTokenColor("--secondary", "hsl(30 100% 96%)");

    const routeLayer = L.layerGroup();
    const stopLayer = L.layerGroup();

    L.polyline(fullRouteCoords, {
      color: border,
      weight: 5,
      dashArray: "10 6",
      opacity: 1,
    }).addTo(routeLayer);

    L.polyline(fullRouteCoords.slice(startIdx, endIdx + 1), {
      color: primary,
      weight: 6,
      opacity: 1,
    }).addTo(routeLayer);

    stops.forEach((stop, index) => {
      const isUserStart = index === startIdx;
      const isUserEnd = index === endIdx;
      const isRouteBoundary = index === 0 || index === stops.length - 1;

      L.circleMarker([stop.lat, stop.lng], {
        radius: isUserStart || isUserEnd ? 8 : isRouteBoundary ? 6 : 4,
        fillColor: isUserStart || isUserEnd ? primary : isRouteBoundary ? secondary : border,
        fillOpacity: 1,
        color: isUserStart || isUserEnd ? primaryDark : muted,
        weight: isUserStart || isUserEnd ? 3 : 2,
      })
        .bindPopup(stop.name)
        .addTo(stopLayer);
    });

    routeLayer.addTo(map);
    stopLayer.addTo(map);

    routeLayerRef.current = routeLayer;
    stopLayerRef.current = stopLayer;

    const bounds = L.latLngBounds(fullRouteCoords.map(([lat, lng]) => L.latLng(lat, lng)));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [stops, startIdx, endIdx]);

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
      busMarkerRef.current = L.marker(busPosition, { icon, keyboard: false }).addTo(map);
      return;
    }

    busMarkerRef.current.setLatLng(busPosition);
    busMarkerRef.current.setIcon(icon);
  }, [busPosition, etaLabel, showBus]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default LiveRouteMap;
