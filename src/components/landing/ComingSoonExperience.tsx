"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function AdPhone() {
  return (
    <div className="cs-phone" aria-label="referr">
      <div className="cs-phone-shadow" aria-hidden />
      <div className="cs-phone-body">
        <div className="cs-phone-side cs-phone-side--left" aria-hidden />
        <div className="cs-phone-side cs-phone-side--right" aria-hidden />
        <div className="cs-phone-bezel">
          <div className="cs-phone-island" aria-hidden>
            <span className="cs-phone-island-camera" />
          </div>
          <div className="cs-phone-screen">
            <div className="cs-phone-screen-wash" aria-hidden />
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark cs-phone-logo relative h-auto w-[68%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="landing-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="cs-studio-light" />
        <div className="cs-studio-floor" />
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 48, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.35, ease: EASE }}
          className="cs-phone-stage"
        >
          <AdPhone />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
          className="mt-12 text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-primary sm:mt-14"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          className="mt-4 max-w-md text-lg font-medium leading-relaxed tracking-[-0.02em] text-fk-navy/55 sm:text-xl"
        >
          Ken iemand.{" "}
          <span className="brand-wordmark font-bold">Maak het verschil.</span>
        </motion.p>
      </div>
    </div>
  );
}
