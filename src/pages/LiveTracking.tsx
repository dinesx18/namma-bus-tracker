import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Navigation } from "lucide-react";
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import BusIcon from "@/components/BusIcon";
import { busRoutes, getRouteSegment } from "@/data/busData";

// Custom bus icon for leaflet
const createBusIcon = () =>
  L.divIcon({
    className: "bus-marker-icon",
    html: `<div style="background:hsl(25,100%,50%);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(255,107,0,0.4);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="18" height="15" rx="3"/><rect x="5" y="5" width="5" height="5" rx="1" fill="hsl(25,100%,50%)" opacity="0.9"/><rect x="14" y="5" width="5" height="5" rx="1" fill="hsl(25,100%,50%)" opacity="0.9"/><circle cx="7.5" cy="20" r="2" fill="white"/><circle cx="16.5" cy="20" r="2" fill="white"/><rect x="4" y="17" width="16" height="2" fill="white"/></svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, bounds]);
  return null;
}

type TrackingState = "idle" | "moving-to-user" | "reached-user" | "moving-to-dest" | "reached-dest" | "moving-to-end";

const LiveTracking = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const routeId = params.get("routeId") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const arrivalMin = parseInt(params.get("arrival") || "5");

  const route = useMemo(() => busRoutes.find((r) => r.id === routeId), [routeId]);
  const segment = useMemo(() => (route ? getRouteSegment(route, from, to) : null), [route, from, to]);

  const [trackingState, setTrackingState] = useState<TrackingState>("idle");
  const [busPosition, setBusPosition] = useState<[number, number] | null>(null);
  const [currentStopIdx, setCurrentStopIdx] = useState(0);
  const [eta, setEta] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const allStops = route?.stops || [];
  const startIdx = segment?.startIdx || 0;
  const endIdx = segment?.endIdx || 0;

  const routeCoords: [number, number][] = allStops.map((s) => [s.lat, s.lng]);

  const bounds = useMemo(() => {
    if (routeCoords.length < 2) return undefined;
    return L.latLngBounds(routeCoords.map(([lat, lng]) => L.latLng(lat, lng)));
  }, [routeCoords]);

  const interpolate = (from: [number, number], to: [number, number], t: number): [number, number] => [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
  ];

  const startTracking = useCallback(() => {
    if (!route || !segment) return;
    setTrackingState("moving-to-user");
    setCurrentStopIdx(0);
    setBusPosition([allStops[0].lat, allStops[0].lng]);
    setEta(arrivalMin);

    let idx = 0;
    let progress = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      progress += 0.05;

      if (progress >= 1) {
        idx++;
        progress = 0;
        setCurrentStopIdx(idx);

        if (idx === startIdx) {
          setTrackingState("reached-user");
          setTimeout(() => setTrackingState("moving-to-dest"), 1500);
        } else if (idx === endIdx) {
          setTrackingState("reached-dest");
          setTimeout(() => {
            if (idx < allStops.length - 1) {
              setTrackingState("moving-to-end");
            }
          }, 2000);
        }

        if (idx >= allStops.length - 1) {
          clearInterval(intervalRef.current);
          setBusPosition([allStops[allStops.length - 1].lat, allStops[allStops.length - 1].lng]);
          return;
        }
      }

      if (idx < allStops.length - 1) {
        const fromCoord: [number, number] = [allStops[idx].lat, allStops[idx].lng];
        const toCoord: [number, number] = [allStops[idx + 1].lat, allStops[idx + 1].lng];
        setBusPosition(interpolate(fromCoord, toCoord, progress));
      }

      // Update ETA
      const totalStops = allStops.length - 1;
      const timePerStop = route.totalTime / totalStops;
      const currentProgress = idx + progress;

      if (currentProgress < startIdx) {
        setEta(Math.max(0, Math.round((startIdx - currentProgress) * timePerStop)));
      } else if (currentProgress < endIdx) {
        setEta(Math.max(0, Math.round((endIdx - currentProgress) * timePerStop)));
      } else {
        setEta(Math.max(0, Math.round((totalStops - currentProgress) * timePerStop)));
      }
    }, 300);
  }, [route, segment, allStops, startIdx, endIdx, arrivalMin]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!route || !segment) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <p className="text-muted-foreground">Route not found</p>
      </div>
    );
  }

  const getStatusText = () => {
    switch (trackingState) {
      case "idle": return "Press Track Bus to start";
      case "moving-to-user": return `Heading to ${from}`;
      case "reached-user": return "🎉 Bus Reached Your Location!";
      case "moving-to-dest": return `Heading to ${to}`;
      case "reached-dest": return "🎉 Bus Reached Your Destination!";
      case "moving-to-end": return `Continuing to ${route.to}`;
      default: return "";
    }
  };

  const getEtaLabel = () => {
    if (trackingState === "reached-user" || trackingState === "reached-dest") return "";
    if (trackingState === "idle") return "";
    return `${eta} min`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-[100dvh] flex-col bg-background"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 backdrop-blur shadow-[var(--shadow-card)] hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="rounded-xl bg-background/90 backdrop-blur px-3 py-1.5 shadow-[var(--shadow-card)]">
          <span className="font-bold text-primary">{route.busNumber}</span>
          <span className="ml-2 text-xs text-muted-foreground">{route.from} → {route.to}</span>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative" style={{ minHeight: "60dvh" }}>
        <MapContainer
          center={[13.05, 80.22]}
          zoom={12}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {bounds && <FitBounds bounds={bounds} />}

          {/* Full route line */}
          <Polyline
            positions={routeCoords}
            pathOptions={{ color: "#e0e0e0", weight: 4, dashArray: "8 4" }}
          />

          {/* User segment line */}
          <Polyline
            positions={routeCoords.slice(startIdx, endIdx + 1)}
            pathOptions={{ color: "hsl(25,100%,50%)", weight: 5 }}
          />

          {/* All stops */}
          {allStops.map((stop, i) => {
            const isUserStart = i === startIdx;
            const isUserEnd = i === endIdx;
            const isTerminal = i === 0 || i === allStops.length - 1;

            return (
              <CircleMarker
                key={stop.id}
                center={[stop.lat, stop.lng]}
                radius={isUserStart || isUserEnd ? 8 : isTerminal ? 6 : 4}
                pathOptions={{
                  fillColor: isUserStart || isUserEnd ? "hsl(25,100%,50%)" : isTerminal ? "#666" : "#ccc",
                  fillOpacity: 1,
                  color: isUserStart || isUserEnd ? "hsl(25,100%,40%)" : "#999",
                  weight: 2,
                }}
              >
                <Popup>{stop.name}</Popup>
              </CircleMarker>
            );
          })}

          {/* Bus marker */}
          {busPosition && (
            <Marker position={busPosition} icon={createBusIcon()}>
              <Popup>Bus {route.busNumber}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Bottom Sheet */}
      <div className="relative z-[1000] -mt-6 rounded-t-3xl bg-background px-5 pt-6 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        <AnimatePresence mode="wait">
          <motion.div
            key={trackingState}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-center"
          >
            <p className="text-sm font-medium text-muted-foreground">{getStatusText()}</p>
            {getEtaLabel() && (
              <p className="mt-1 text-5xl font-black text-foreground tracking-tight">
                {getEtaLabel()}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {trackingState === "idle" ? (
          <button
            onClick={startTracking}
            className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary font-semibold text-primary-foreground shadow-lg transition-transform active:scale-[0.97]"
          >
            <Navigation className="h-5 w-5" />
            Track Bus
          </button>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-accent px-4 py-3">
            <BusIcon className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                {currentStopIdx < allStops.length
                  ? `Near ${allStops[Math.min(currentStopIdx, allStops.length - 1)].name}`
                  : "Journey complete"}
              </p>
            </div>
            <span className="text-xs font-semibold text-primary">LIVE</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LiveTracking;
