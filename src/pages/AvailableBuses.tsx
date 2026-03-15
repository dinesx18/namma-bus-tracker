import { useMemo, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import BusIcon from "@/components/BusIcon";
import { findRoutes, getRouteSegment, getArrivalTime } from "@/data/busData";

const AvailableBuses = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const routes = useMemo(() => {
    const found = findRoutes(from, to);
    const byId = new Map<string, { route: (typeof found)[number]; arrivalMin: number; segment: NonNullable<ReturnType<typeof getRouteSegment>> }>();

    found.forEach((route) => {
      const segment = getRouteSegment(route, from, to);
      if (!segment) return;

      byId.set(route.id, {
        route,
        arrivalMin: getArrivalTime(route.id),
        segment,
      });
    });

    return Array.from(byId.values()).sort(
      (a, b) => a.arrivalMin - b.arrivalMin || a.route.busNumber.localeCompare(b.route.busNumber),
    );
  }, [from, to]);

  const handleSelectRoute = useCallback(
    (routeId: string, arrivalMin: number) => {
      if (selectedRouteId) return;

      setSelectedRouteId(routeId);
      navigate(`/track?routeId=${routeId}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&arrival=${arrivalMin}`);
    },
    [navigate, from, to, selectedRouteId],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-[100dvh] flex-col bg-background"
    >
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Available Buses</h1>
          <p className="max-w-[250px] truncate text-xs text-muted-foreground">
            {from} → {to}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 px-4 pt-4 pb-6">
        {routes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BusIcon className="mb-4 h-16 w-16 text-muted-foreground/30" />
            <p className="text-lg font-semibold text-foreground">No buses found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try different stops or check back later</p>
          </div>
        ) : (
          routes.map(({ route, arrivalMin, segment }, i) => (
            <motion.button
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              whileTap={{ scale: 0.98 }}
              disabled={Boolean(selectedRouteId)}
              onClick={() => handleSelectRoute(route.id, arrivalMin)}
              className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)] disabled:opacity-60"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent">
                <span className="text-xl font-bold text-primary">{route.busNumber}</span>
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-primary">Arriving in {arrivalMin} min</span>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {route.from} → {route.to}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {segment.travelTime} min travel
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {segment.userStops.length} stops
                  </span>
                </div>
              </div>

              <BusIcon className="h-6 w-6 shrink-0 text-primary/30" />
            </motion.button>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AvailableBuses;
