"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface DeckCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function DeckCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: DeckCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const display = useAnimatedNumber(value, 1200, enabled);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display.toLocaleString("nl-NL")}
      {suffix}
    </span>
  );
}
