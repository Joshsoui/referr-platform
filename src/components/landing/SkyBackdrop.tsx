"use client";

import Image from "next/image";
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
        x: Math.max(-1, Math.min(1, x)) * 14,
        y: Math.max(-1, Math.min(1, y)) * 8,
      };
    };

    const onMouseMove = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) onPointer(e.touches[0].clientX, e.touches[0].clientY);
    };

    const tick = () => {
      setOffset((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.05,
        y: prev.y + (target.current.y - prev.y) * 0.05,
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

  const parallax = reduced
    ? undefined
    : {
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.08)`,
      };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="cs-sky-photo" style={parallax}>
        <Image
          src="/images/coming-soon-sky.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="cs-sky-photo-img object-cover object-center"
        />
      </div>

      <div className="cs-sky-brand-tint" />
      <div className="cs-sky-brand-wash" />
      <div className="cs-sky-brand-glow" />
      <div className="cs-sky-depth" />
    </div>
  );
}
