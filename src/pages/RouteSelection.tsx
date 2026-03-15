import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowLeft } from "lucide-react";
import BusIcon from "@/components/BusIcon";
import { searchStops } from "@/data/busData";

const StopSelector = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => searchStops(query), [query]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2 rounded-xl bg-muted px-4 shadow-[0_0_0_1px_hsl(var(--foreground)/0.06)]">
        <input
          className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            if (!e.target.value) onChange("");
          }}
          onFocus={() => setOpen(true)}
        />
        <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-xl border border-border bg-background shadow-[var(--shadow-elevated)]">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">No stops found</div>
          ) : (
            filtered.map((stop) => (
              <button
                key={stop.id}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-accent"
                onClick={() => {
                  onChange(stop.name);
                  setQuery(stop.name);
                  setOpen(false);
                }}
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-balance text-foreground">{stop.name}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const RouteSelection = () => {
  const navigate = useNavigate();
  const [startStop, setStartStop] = useState("");
  const [endStop, setEndStop] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const canSearch = startStop && endStop && startStop !== endStop;

  const handleSearch = () => {
    if (!canSearch || isSearching) return;
    setIsSearching(true);
    navigate(`/buses?from=${encodeURIComponent(startStop)}&to=${encodeURIComponent(endStop)}`);
  };

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
          onClick={() => navigate("/")}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Where is your bus?</h1>
      </div>

      <div className="flex-1 px-5 pt-6">
        <div className="relative flex flex-col gap-6">
          <div className="absolute left-[7px] top-[52px] h-[calc(100%-72px)] w-px border-l-2 border-dashed border-primary/30" />

          <div className="relative">
            <div className="absolute -left-[1px] top-[42px] z-10 h-4 w-4 rounded-full border-[3px] border-primary bg-background" />
            <div className="ml-6">
              <StopSelector
                label="Start Destination"
                value={startStop}
                onChange={setStartStop}
                placeholder="Choose starting stop"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[1px] top-[42px] z-10 h-4 w-4 rounded-full bg-primary" />
            <div className="ml-6">
              <StopSelector
                label="End Destination"
                value={endStop}
                onChange={setEndStop}
                placeholder="Choose ending stop"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-background px-5 py-4 pb-safe">
        <button
          onClick={handleSearch}
          disabled={!canSearch || isSearching}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary font-semibold text-primary-foreground shadow-lg transition-all active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
        >
          <Search className="h-5 w-5" />
          Search Buses
          <BusIcon className="h-5 w-5 text-primary-foreground" />
        </button>
      </div>
    </motion.div>
  );
};

export default RouteSelection;
