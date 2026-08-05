"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function HeroPhone() {
  return (
    <div className="cs-phone-wrap">
      <div className="vision-phone-glow cs-phone-glow" aria-hidden />
      <div className="vision-phone cs-phone">
        <div className="vision-phone-frame">
          <div className="vision-phone-notch" aria-hidden />
          <div className="cs-phone-screen">
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark cs-phone-logo h-auto w-[78%] max-w-[11rem] object-contain"
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
        <div className="hero-light-glow cs-atmosphere" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="w-full"
        >
          <HeroPhone />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-primary"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: EASE }}
          className="mt-3 max-w-xs text-[17px] font-medium leading-relaxed tracking-[-0.02em] text-fk-navy/55 sm:max-w-sm sm:text-lg"
        >
          Ken iemand.{" "}
          <span className="brand-wordmark font-bold">Maak het verschil.</span>
        </motion.p>
      </div>
    </div>
  );
}
