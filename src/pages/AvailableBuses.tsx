import { useMemo } from "react";
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

  const routes = useMemo(() => {
    const found = findRoutes(from, to);
    // Attach stable arrival times and sort by them
    const withArrival = found.map((route) => ({
      route,
      arrivalMin: getArrivalTime(route.id),
      segment: getRouteSegment(route, from, to),
    }));
    withArrival.sort((a, b) => a.arrivalMin - b.arrivalMin);
    return withArrival;
  }, [from, to]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-[100dvh] flex-col bg-background"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Available Buses</h1>
          <p className="text-xs text-muted-foreground truncate max-w-[250px]">
            {from} → {to}
          </p>
        </div>
      </div>

      {/* Bus list */}
      <div className="flex-1 px-4 pt-4 pb-6 space-y-3">
        {routes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BusIcon className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-semibold text-foreground">No buses found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try different stops or check back later
            </p>
          </div>
        ) : (
          routes.map(({ route, arrivalMin, segment }, i) => (
            <motion.button
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate(
                  `/track?routeId=${route.id}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&arrival=${arrivalMin}`
                )
              }
              className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              {/* Bus Number */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent">
                <span className="text-xl font-bold text-primary">{route.busNumber}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary text-sm">
                    Arriving in {arrivalMin} min
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground truncate">
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
