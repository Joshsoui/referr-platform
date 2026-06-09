"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useScout } from "@/context/ScoutContext";
import { useMounted } from "@/hooks/useMounted";

export function XpToast() {
  const mounted = useMounted();
  const { xpEvents } = useScout();
  const [visible, setVisible] = useState<typeof xpEvents>([]);

  useEffect(() => {
    if (xpEvents.length === 0) return;
    const latest = xpEvents[xpEvents.length - 1];
    setVisible((prev) => [...prev, latest]);

    const timer = setTimeout(() => {
      setVisible((prev) => prev.filter((e) => e.id !== latest.id));
    }, 2800);

    return () => clearTimeout(timer);
  }, [xpEvents]);

  if (!mounted || visible.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
      {visible.map((event, i) => (
        <div
          key={event.id}
          className="flex items-center gap-2 rounded-2xl border border-fk-secondary/30 bg-fk-navy px-5 py-3 shadow-xl"
          style={{
            animation: "slide-in-right 0.4s cubic-bezier(0.22,1,0.36,1) both, xp-float-up 2.8s ease-out forwards",
            animationDelay: `${i * 80}ms, ${i * 80}ms`,
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fk-primary/30">
            <Zap size={16} className="text-fk-secondary" />
          </div>
          <span className="text-lg font-extrabold text-fk-white">
            +{event.amount} XP
          </span>
        </div>
      ))}
    </div>
  );
}
