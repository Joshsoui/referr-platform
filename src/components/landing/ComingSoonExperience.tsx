"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="coming-soon-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      {/* Organic animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="coming-soon-wash absolute inset-0" />
        <div className="coming-soon-orb coming-soon-orb--a" />
        <div className="coming-soon-orb coming-soon-orb--b" />
        <div className="coming-soon-orb coming-soon-orb--c" />
        <div className="coming-soon-mesh absolute inset-0" />
        <div className="coming-soon-grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.88, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="coming-soon-logo-wrap"
        >
          <Image
            src="/brand/referr-logo.png"
            alt="referr"
            width={837}
            height={286}
            quality={100}
            priority
            className="brand-logo-mark coming-soon-logo h-auto w-[min(88vw,34rem)] object-contain"
          />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="coming-soon-label mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-navy/45 sm:text-xs"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-md text-base font-medium leading-relaxed text-fk-navy/55 sm:text-lg"
        >
          Ken iemand. Maak het verschil.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="coming-soon-pulse mt-12 h-1.5 w-1.5 rounded-full bg-fk-primary"
          aria-hidden
        />
      </div>
    </div>
  );
}
