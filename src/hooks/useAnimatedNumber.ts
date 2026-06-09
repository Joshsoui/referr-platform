"use client";

import { useEffect, useRef, useState } from "react";
import { useMounted } from "@/hooks/useMounted";

export function useAnimatedNumber(
  target: number,
  duration = 800,
  enabled = true
): number {
  const mounted = useMounted();
  const [display, setDisplay] = useState(target);
  const prevTarget = useRef(target);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!mounted || !enabled) {
      setDisplay(target);
      prevTarget.current = target;
      return;
    }

    const from = prevTarget.current;
    const to = target;
    if (from === to) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        prevTarget.current = to;
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled, mounted]);

  return display;
}
