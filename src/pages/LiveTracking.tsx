import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusIcon from "@/components/BusIcon";
import LiveRouteMap from "@/components/tracking/LiveRouteMap";
import { busRoutes, getRouteSegment } from "@/data/busData";
import type { BusRoute, RouteSegment } from "@/data/busData";
import { useBusTracking } from "@/hooks/useBusTracking";

interface LiveTrackingContentProps {
  route: BusRoute;
  segment: RouteSegment;
  from: string;
  to: string;
  arrivalMin: number;
}

const LiveTrackingContent = ({ route, segment, from, to, arrivalMin }: LiveTrackingContentProps) => {
  const navigate = useNavigate();

  const { trackingState, busPosition, currentStopIdx, eta, hasStarted, startTracking } = useBusTracking({
    route,
    startIdx: segment.startIdx,
    endIdx: segment.endIdx,
    initialArrivalMin: Number.isNaN(arrivalMin) ? 5 : arrivalMin,
  });

  const statusText = useMemo(() => {
    switch (trackingState) {
      case "idle":
        return "Tap Track Bus to start live movement";
      case "moving-to-user":
        return `Bus is heading to ${from}`;
      case "reached-user":
        return "🎉 Bus Reached Your Location";
      case "moving-to-dest":
        return `Bus is heading to ${to}`;
      case "reached-dest":
        return "🎉 Bus Reached Your Destination";
      case "moving-to-end":
        return `Bus is continuing to ${route.to}`;
      case "completed":
        return "Route ended at final stop";
      default:
        return "";
    }
  }, [trackingState, from, to, route.to]);

  const etaCardLabel = useMemo(() => {
    if (trackingState === "moving-to-user") return `${eta} min to your stop`;
    if (trackingState === "moving-to-dest") return `${eta} min to destination`;
    if (trackingState === "moving-to-end") return `${eta} min to final stop`;
    return "";
  }, [trackingState, eta]);

  const markerEtaLabel = useMemo(() => {
    if (trackingState === "moving-to-user") return `${eta} min`;
    if (trackingState === "moving-to-dest") return `${eta} min`;
    if (trackingState === "moving-to-end") return `${eta} min`;
    return "";
  }, [trackingState, eta]);

  const nearbyStop = route.stops[Math.min(currentStopIdx, route.stops.length - 1)]?.name;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-[100dvh] flex-col bg-background"
    >
      <div className="absolute inset-x-0 top-0 z-[1000] flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/90 shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="rounded-xl bg-background/90 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur">
          <p className="text-sm font-bold text-primary">Bus {route.busNumber}</p>
          <p className="text-xs text-muted-foreground">
            {route.from} → {route.to}
          </p>
        </div>
      </div>

      <div className="relative flex-1" style={{ minHeight: "70dvh" }}>
        <LiveRouteMap
          stops={route.stops}
          startIdx={segment.startIdx}
          endIdx={segment.endIdx}
          busPosition={busPosition}
          etaLabel={markerEtaLabel}
          showBus={hasStarted}
        />
      </div>

      <div className="relative z-[1000] -mt-8 rounded-t-3xl bg-background px-5 pt-6 pb-6 shadow-[0_-6px_24px_hsl(var(--foreground)/0.15)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        <AnimatePresence mode="wait">
          <motion.div
            key={trackingState}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-center"
          >
            <p className="text-sm font-medium text-muted-foreground">{statusText}</p>
            {etaCardLabel && (
              <p className="mt-1 text-4xl font-black tracking-tight text-foreground sm:text-5xl">{etaCardLabel}</p>
            )}
          </motion.div>
        </AnimatePresence>

        {trackingState === "idle" ? (
          <Button onClick={startTracking} className="mt-6 h-14 w-full rounded-2xl text-base font-semibold" aria-label="Track Bus">
            <Navigation className="h-5 w-5" />
            Track Bus
          </Button>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-accent px-4 py-3">
              <BusIcon className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{nearbyStop ? `Near ${nearbyStop}` : "Live tracking running"}</p>
              </div>
              <span className="text-xs font-semibold text-primary">LIVE</span>
            </div>

            <Button
              variant="secondary"
              onClick={() => navigate(`/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)}
              className="h-11 w-full rounded-xl"
            >
              Exit Tracking
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const LiveTracking = () => {
  const [params] = useSearchParams();

  const routeId = params.get("routeId") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const arrivalMin = Number.parseInt(params.get("arrival") || "5", 10);

  const route = useMemo(() => busRoutes.find((item) => item.id === routeId), [routeId]);
  const segment = useMemo(() => (route ? getRouteSegment(route, from, to) : null), [route, from, to]);

  if (!route || !segment) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background px-6">
        <p className="text-center text-sm text-muted-foreground">
          Invalid tracking link. Please go back and select your route again.
        </p>
      </div>
    );
  }

  return <LiveTrackingContent route={route} segment={segment} from={from} to={to} arrivalMin={arrivalMin} />;
};

export default LiveTracking;
