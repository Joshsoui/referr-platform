"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

function ParallaxLayer({
  x,
  y,
  className,
  strength = 1,
  children,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  className: string;
  strength?: number;
  children?: ReactNode;
}) {
  const px = useTransform(x, (v) => v * strength);
  const py = useTransform(y, (v) => v * strength);
  const transform = useMotionTemplate`translate3d(${px}px, ${py}px, 0)`;

  return (
    <motion.div aria-hidden className={className} style={{ transform }}>
      {children}
    </motion.div>
  );
}

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 40, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx * 28);
      rawY.set(ny * 18);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduced]);

  return (
    <div className="coming-soon-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="coming-soon-void absolute inset-0"
          initial={reduced ? false : { opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.9, delay: 0.1, ease: EASE }}
        />

        <motion.div
          className="coming-soon-bloom absolute left-1/2 top-[42%] h-[min(95vw,760px)] w-[min(95vw,760px)] -translate-x-1/2 -translate-y-1/2"
          initial={reduced ? false : { opacity: 0, scale: 0.18 }}
          animate={{ opacity: [0, 1, 0.5], scale: [0.18, 1.1, 1.5] }}
          transition={{ duration: 2.5, delay: 0.05, times: [0, 0.42, 1], ease: EASE }}
        />

        <motion.div
          className="coming-soon-shockwave absolute left-1/2 top-[42%] h-[min(72vw,540px)] w-[min(72vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={reduced ? false : { opacity: 0.75, scale: 0.12 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 1.85, delay: 0.55, ease: EASE }}
        />

        <div className="coming-soon-wash absolute inset-0" />
        <div className="coming-soon-flow absolute inset-0" />
        <ParallaxLayer x={x} y={y} strength={0.9} className="absolute inset-0">
          <div className="coming-soon-orb coming-soon-orb--a" />
          <div className="coming-soon-orb coming-soon-orb--b" />
          <div className="coming-soon-orb coming-soon-orb--c" />
          <div className="coming-soon-orb coming-soon-orb--d" />
        </ParallaxLayer>
        <div className="coming-soon-flare absolute inset-0" />
        <div className="coming-soon-rays absolute inset-0" />
        <div className="coming-soon-mesh absolute inset-0" />
        <div className="coming-soon-grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          className="coming-soon-logo-wrap"
          initial={reduced ? false : { opacity: 0, scale: 1.22, filter: "blur(22px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.7, delay: 0.7, ease: EASE }}
        >
          <motion.div
            className="coming-soon-logo-glow"
            aria-hidden
            initial={reduced ? false : { opacity: 0, scale: 0.35 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.95, ease: EASE }}
          />

          <div className="coming-soon-logo-stage">
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark coming-soon-logo h-auto w-[min(88vw,34rem)] object-contain"
            />
            <motion.span
              className="coming-soon-logo-sheen"
              aria-hidden
              initial={reduced ? false : { x: "-130%", opacity: 0 }}
              animate={{ x: ["-130%", "130%"], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.45,
                delay: 2.05,
                ease: EASE,
                times: [0, 0.45, 1],
              }}
            />
          </div>

          <motion.div
            className="coming-soon-underline"
            aria-hidden
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.75, ease: EASE }}
          >
            <span className="coming-soon-underline-core" />
            <span className="coming-soon-underline-spark" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 2.05, ease: EASE }}
          className="coming-soon-label mt-11 text-[11px] font-semibold uppercase tracking-[0.34em] text-fk-navy/50 sm:text-xs"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.15, delay: 2.3, ease: EASE }}
          className="mt-5 max-w-md text-base font-medium leading-relaxed text-fk-navy/60 sm:text-lg"
        >
          Ken iemand. Maak het verschil.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.7, ease: EASE }}
          className="coming-soon-pulse mt-14 h-1.5 w-1.5 rounded-full bg-fk-primary"
          aria-hidden
        />
      </div>
    </div>
  );
}
