import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPinned, Navigation } from "lucide-react";
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
        return "Press Track Bus to begin live tracking";
      case "moving-to-user":
        return `Bus is moving to ${from}`;
      case "reached-user":
        return "Bus Reached Your Location";
      case "moving-to-dest":
        return `Bus is moving to ${to}`;
      case "reached-dest":
        return "Bus Reached Your Destination";
      case "moving-to-end":
        return `Bus is continuing to ${route.to}`;
      case "completed":
        return "Trip completed at route terminal";
      default:
        return "";
    }
  }, [trackingState, from, to, route.to]);

  const etaCardLabel = useMemo(() => {
    if (trackingState === "moving-to-user") return `${eta} min to pickup`;
    if (trackingState === "moving-to-dest") return `${eta} min to destination`;
    if (trackingState === "moving-to-end") return `${eta} min to terminal`;
    if (trackingState === "reached-user") return "Reached pickup";
    if (trackingState === "reached-dest") return "Reached destination";
    return "";
  }, [trackingState, eta]);

  const markerEtaLabel = useMemo(() => {
    if (trackingState === "moving-to-user") return `${eta} min`;
    if (trackingState === "moving-to-dest") return `${eta} min`;
    if (trackingState === "moving-to-end") return `${eta} min`;
    return "";
  }, [trackingState, eta]);

  const nearbyStop = route.stops[Math.min(currentStopIdx, route.stops.length - 1)]?.name;

  const liveChipLabel = useMemo(() => {
    if (!hasStarted) return "READY";
    if (trackingState === "completed") return "DONE";
    return "LIVE";
  }, [hasStarted, trackingState]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-muted/30">
      <header className="relative z-[1000] flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/95 shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:bg-accent"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-between rounded-2xl bg-background/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-primary">Bus {route.busNumber}</p>
            <p className="truncate text-xs text-muted-foreground">
              {route.from} → {route.to}
            </p>
          </div>
          <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">{liveChipLabel}</span>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden px-2 pb-2">
        <div className="h-full overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
          <LiveRouteMap
            stops={route.stops}
            startIdx={segment.startIdx}
            endIdx={segment.endIdx}
            busPosition={busPosition}
            etaLabel={markerEtaLabel}
            showBus={hasStarted}
          />
        </div>

        <section className="pointer-events-none absolute inset-x-4 bottom-4 z-[1000] rounded-3xl border border-border bg-background/95 p-4 shadow-[var(--shadow-elevated)] backdrop-blur">
          <div className="pointer-events-auto space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{statusText}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {nearbyStop ? `Current stop: ${nearbyStop}` : "Waiting for tracking to start"}
                </p>
              </div>
              {etaCardLabel && <span className="shrink-0 text-sm font-black text-primary">{etaCardLabel}</span>}
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-accent p-2">
              <div className="rounded-xl bg-background px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Pickup</p>
                <p className="truncate text-xs font-semibold text-foreground">{from}</p>
              </div>
              <div className="rounded-xl bg-background px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Destination</p>
                <p className="truncate text-xs font-semibold text-foreground">{to}</p>
              </div>
            </div>

            {trackingState === "idle" ? (
              <Button onClick={startTracking} className="h-12 w-full rounded-2xl text-sm font-semibold" aria-label="Track Bus">
                <Navigation className="h-5 w-5" />
                Track Bus
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)}
                  className="h-11 rounded-xl"
                >
                  Exit Tracking
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/route?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)}
                  className="h-11 rounded-xl"
                >
                  <MapPinned className="h-4 w-4" />
                  Change Route
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
              <BusIcon className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">
                Route path includes start terminal, intermediate stops, your pickup, your destination, and final terminal.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
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
