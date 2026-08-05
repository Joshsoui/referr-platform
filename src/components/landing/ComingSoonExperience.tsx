"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="cs-stage relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="cs-stage-glow" />
        <div className="cs-stage-floor" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-fk-primary"
        >
          Coming soon
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.2, ease: EASE }}
          className="cs-logo-hero mt-8 sm:mt-10"
        >
          <div className="cs-logo-hero-glow" aria-hidden />
          <div className="cs-logo-hero-stage">
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark cs-logo-hero-mark h-auto w-full object-contain"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.55, ease: EASE }}
          className="mt-10 max-w-lg text-balance text-[1.65rem] font-bold leading-[1.12] tracking-[-0.04em] text-fk-navy sm:mt-12 sm:max-w-xl sm:text-4xl"
        >
          Ken iemand.
          <br />
          <span className="brand-wordmark">Maak het verschil.</span>
        </motion.h1>
      </div>
    </div>
  );
}
