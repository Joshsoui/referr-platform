"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="coming-soon-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="coming-soon-glow" />
        <div className="coming-soon-orb coming-soon-orb--left" />
        <div className="coming-soon-orb coming-soon-orb--right" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary"
        >
          Coming soon
        </motion.p>

        <motion.div
          className="coming-soon-mark mt-9 sm:mt-11"
          initial={reduced ? false : { opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.08, ease: EASE }}
        >
          <div className="coming-soon-mark-glow" aria-hidden />
          <Image
            src="/brand/referr-logo.png"
            alt="referr"
            width={837}
            height={286}
            quality={100}
            priority
            className="brand-logo-mark coming-soon-hero-logo relative h-auto w-[min(84vw,32rem)] object-contain"
          />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.35, ease: EASE }}
          className="mt-10 max-w-md text-lg font-medium leading-relaxed tracking-[-0.02em] text-fk-navy/55 sm:mt-12 sm:text-xl"
        >
          Ken iemand.{" "}
          <span className="brand-wordmark font-bold">Maak het verschil.</span>
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="coming-soon-wait mt-14"
          aria-hidden
        >
          <span className="coming-soon-wait-bar" />
        </motion.div>
      </div>
    </div>
  );
}
