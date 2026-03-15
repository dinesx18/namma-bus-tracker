import { useCallback, useEffect, useRef, useState } from "react";
import type { BusRoute } from "@/data/busData";

export type TrackingState =
  | "idle"
  | "moving-to-user"
  | "reached-user"
  | "moving-to-dest"
  | "reached-dest"
  | "moving-to-end"
  | "completed";

interface UseBusTrackingOptions {
  route: BusRoute;
  startIdx: number;
  endIdx: number;
  initialArrivalMin: number;
}

const MOVEMENT_TICK_MS = 320;
const SEGMENT_STEP = 0.05;

const interpolate = (from: [number, number], to: [number, number], t: number): [number, number] => [
  from[0] + (to[0] - from[0]) * t,
  from[1] + (to[1] - from[1]) * t,
];

export function useBusTracking({ route, startIdx, endIdx, initialArrivalMin }: UseBusTrackingOptions) {
  const [trackingState, setTrackingState] = useState<TrackingState>("idle");
  const [busPosition, setBusPosition] = useState<[number, number] | null>(null);
  const [currentStopIdx, setCurrentStopIdx] = useState(0);
  const [eta, setEta] = useState(initialArrivalMin);
  const [hasStarted, setHasStarted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const stops = route.stops;
  const lastStopIdx = Math.max(stops.length - 1, 0);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
  }, []);

  const queueState = useCallback((nextState: TrackingState, delayMs: number) => {
    const timeoutId = setTimeout(() => setTrackingState(nextState), delayMs);
    timeoutRefs.current.push(timeoutId);
  }, []);

  const startTracking = useCallback(() => {
    if (stops.length < 2) return;

    clearTimers();
    setHasStarted(true);
    setCurrentStopIdx(0);
    setBusPosition([stops[0].lat, stops[0].lng]);
    setEta(initialArrivalMin);

    let idx = 0;
    let progress = 0;
    let reachedUser = startIdx === 0;
    let reachedDestination = false;

    if (startIdx === 0) {
      setTrackingState("reached-user");
      queueState("moving-to-dest", 1200);
    } else {
      setTrackingState("moving-to-user");
    }

    intervalRef.current = setInterval(() => {
      progress += SEGMENT_STEP;

      if (progress >= 1) {
        idx += 1;
        progress = 0;
        setCurrentStopIdx(idx);

        if (idx === startIdx && !reachedUser) {
          reachedUser = true;
          setTrackingState("reached-user");
          queueState("moving-to-dest", 1300);
        }

        if (idx === endIdx && !reachedDestination) {
          reachedDestination = true;
          setTrackingState("reached-dest");
          if (idx < lastStopIdx) {
            queueState("moving-to-end", 1500);
          } else {
            queueState("completed", 1500);
          }
        }

        if (idx >= lastStopIdx) {
          clearTimers();
          setCurrentStopIdx(lastStopIdx);
          setBusPosition([stops[lastStopIdx].lat, stops[lastStopIdx].lng]);
          setEta(0);

          if (endIdx < lastStopIdx) {
            setTrackingState("completed");
          }
          return;
        }
      }

      if (idx < lastStopIdx) {
        const fromCoord: [number, number] = [stops[idx].lat, stops[idx].lng];
        const toCoord: [number, number] = [stops[idx + 1].lat, stops[idx + 1].lng];
        setBusPosition(interpolate(fromCoord, toCoord, progress));
      }

      const totalSegments = Math.max(lastStopIdx, 1);
      const timePerSegment = route.totalTime / totalSegments;
      const currentProgress = Math.min(idx + progress, lastStopIdx);

      if (currentProgress < startIdx) {
        setEta(Math.max(0, Math.round((startIdx - currentProgress) * timePerSegment)));
      } else if (currentProgress < endIdx) {
        setEta(Math.max(0, Math.round((endIdx - currentProgress) * timePerSegment)));
      } else {
        setEta(Math.max(0, Math.round((lastStopIdx - currentProgress) * timePerSegment)));
      }
    }, MOVEMENT_TICK_MS);
  }, [clearTimers, endIdx, initialArrivalMin, lastStopIdx, queueState, route.totalTime, startIdx, stops]);

  useEffect(() => {
    clearTimers();
    setTrackingState("idle");
    setBusPosition(null);
    setCurrentStopIdx(0);
    setEta(initialArrivalMin);
    setHasStarted(false);

    return () => {
      clearTimers();
    };
  }, [clearTimers, route.id, startIdx, endIdx, initialArrivalMin]);

  return {
    trackingState,
    busPosition,
    currentStopIdx,
    eta,
    hasStarted,
    startTracking,
  };
}
