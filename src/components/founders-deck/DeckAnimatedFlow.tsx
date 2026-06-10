"use client";

import { useEffect, useRef, useState } from "react";
import { FlowArrow, FlowItem } from "@/components/founders-deck/DeckParts";

interface FlowStep {
  label: string;
  highlight?: boolean;
}

export function DeckAnimatedFlow({ steps }: { steps: FlowStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let index = 0;
        interval = setInterval(() => {
          index += 1;
          setActiveCount(index);
          if (index >= steps.length && interval) {
            clearInterval(interval);
          }
        }, 220);

        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [steps.length]);

  return (
    <div ref={ref} className="mx-auto max-w-md">
      {steps.map((step, i) => (
        <div key={step.label}>
          <div
            className={`transition-all duration-500 ${
              i < activeCount
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-95 opacity-0"
            }`}
          >
            <FlowItem label={step.label} highlight={step.highlight} />
          </div>
          {i < steps.length - 1 && (
            <div
              className={`transition-opacity duration-300 ${
                i < activeCount - 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <FlowArrow />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
