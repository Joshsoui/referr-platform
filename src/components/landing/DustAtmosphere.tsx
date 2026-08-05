"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  warm: boolean;
};

export function DustAtmosphere({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const spawn = () => {
      const area = w * h;
      const count = Math.min(Math.floor(area / 9000), 220);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.4 + 0.35,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.42 + 0.04,
        warm: Math.random() > 0.35,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const radius = p.r * 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        if (p.warm) {
          gradient.addColorStop(0, `rgba(255, 120, 80, ${p.opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 77, 89, ${p.opacity * 0.35})`);
        } else {
          gradient.addColorStop(0, `rgba(220, 225, 235, ${p.opacity * 0.55})`);
          gradient.addColorStop(0.5, `rgba(180, 190, 210, ${p.opacity * 0.15})`);
        }
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return <canvas ref={canvasRef} className="cs-dust-canvas" aria-hidden />;
}
