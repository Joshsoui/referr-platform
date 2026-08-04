"use client";

import { motion, useReducedMotion } from "framer-motion";

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="coming-soon-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="coming-soon-wash absolute inset-0" />
        <div className="coming-soon-orb coming-soon-orb--a" />
        <div className="coming-soon-orb coming-soon-orb--b" />
        <div className="coming-soon-orb coming-soon-orb--c" />
        <div className="coming-soon-orb coming-soon-orb--d" />
        <div className="coming-soon-flare absolute inset-0" />
        <div className="coming-soon-mesh absolute inset-0" />
        <div className="coming-soon-grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.82, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="coming-soon-logo-wrap"
        >
          <div className="coming-soon-logo-glow" aria-hidden />
          <h1 className="coming-soon-wordmark" aria-label="referr">
            <span className="coming-soon-wordmark-text">referr</span>
            <span className="coming-soon-wordmark-sheen" aria-hidden />
          </h1>
          <div className="coming-soon-underline" aria-hidden>
            <span className="coming-soon-underline-core" />
            <span className="coming-soon-underline-spark" />
          </div>
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="coming-soon-label mt-11 text-[11px] font-semibold uppercase tracking-[0.32em] text-fk-navy/50 sm:text-xs"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-md text-base font-medium leading-relaxed text-fk-navy/60 sm:text-lg"
        >
          Ken iemand. Maak het verschil.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="coming-soon-pulse mt-14 h-1.5 w-1.5 rounded-full bg-fk-primary"
          aria-hidden
        />
      </div>
    </div>
  );
}
