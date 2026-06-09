"use client";

import { useEffect, useState } from "react";
import { useMounted } from "@/hooks/useMounted";

interface ProgressBarProps {
  progress: number;
  label?: string;
  animated?: boolean;
}

export function ProgressBar({
  progress,
  label,
  animated = true,
}: ProgressBarProps) {
  const mounted = useMounted();
  const [width, setWidth] = useState(progress);

  useEffect(() => {
    if (!mounted || !animated) {
      setWidth(progress);
      return;
    }
    setWidth(0);
    const timer = setTimeout(() => setWidth(progress), 120);
    return () => clearTimeout(timer);
  }, [progress, animated, mounted]);

  return (
    <div className="w-full">
      {label && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-fk-navy/60">{label}</span>
          <span className="font-semibold text-fk-primary">{progress}%</span>
        </div>
      )}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-fk-primary/15">
        <div
          className="progress-shine relative h-full rounded-full bg-gradient-to-r from-fk-primary via-fk-secondary to-fk-primary transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
