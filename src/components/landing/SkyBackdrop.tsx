"use client";

import { useEffect, useRef, useState } from "react";

type Offset = { x: number; y: number };

function useSkyParallax(reduced: boolean) {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const target = useRef<Offset>({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const onPointer = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      target.current = {
        x: Math.max(-1, Math.min(1, x)) * 18,
        y: Math.max(-1, Math.min(1, y)) * 10,
      };
    };

    const onMouseMove = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onPointer(e.touches[0].clientX, e.touches[0].clientY);
    };

    const tick = () => {
      setOffset((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.06,
        y: prev.y + (target.current.y - prev.y) * 0.06,
      }));
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  return offset;
}

type SkyBackdropProps = {
  reduced: boolean;
};

export function SkyBackdrop({ reduced }: SkyBackdropProps) {
  const offset = useSkyParallax(reduced);

  const layer = (depth: number) =>
    reduced
      ? undefined
      : {
          transform: `translate3d(${offset.x * depth}px, ${offset.y * depth}px, 0)`,
        };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="cs-sky-base" />
      <div className="cs-sky-zenith" />

      <div className="cs-sky-layer" style={layer(0.35)}>
        <div className="cs-cloud-cluster cs-cloud-cluster--high">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="cs-sky-layer" style={layer(0.55)}>
        <div className="cs-cloud-cluster cs-cloud-cluster--mid">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="cs-sky-layer" style={layer(0.2)}>
        <div className="cs-cloud-cluster cs-cloud-cluster--far">
          <span />
          <span />
        </div>
      </div>

      <div className="cs-sky-horizon" style={layer(0.15)}>
        <div className="cs-sky-horizon-warm" />
        <div className="cs-sky-horizon-glow" />
      </div>

      <div className="cs-sky-haze" />
      <div className="cs-sky-depth" />
    </div>
  );
}
