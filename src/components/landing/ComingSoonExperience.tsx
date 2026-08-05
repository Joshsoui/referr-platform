"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function PhotoPhone() {
  return (
    <div className="cs-photo-phone">
      <div className="cs-photo-shadow" aria-hidden />
      <Image
        src="/brand/iphone-mock.png"
        alt=""
        width={1024}
        height={1536}
        quality={95}
        priority
        className="cs-photo-device relative h-auto w-full select-none"
      />
      <div className="cs-photo-logo-slot">
        <Image
          src="/brand/referr-logo.png"
          alt="referr"
          width={837}
          height={286}
          quality={100}
          priority
          className="brand-logo-mark cs-photo-logo h-auto w-full object-contain"
        />
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

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center sm:max-w-lg">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE }}
          className="cs-photo-stage w-full"
        >
          <PhotoPhone />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
          className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-primary sm:mt-3"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mt-3 max-w-md text-lg font-medium leading-relaxed tracking-[-0.02em] text-fk-navy/55 sm:text-xl"
        >
          Ken iemand.{" "}
          <span className="brand-wordmark font-bold">Maak het verschil.</span>
        </motion.p>
      </div>
    </div>
  );
}
