"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const payoffLine = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, delay: 0.3 + i * 0.12, ease: EASE },
  }),
};

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="cs-apple relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="cs-sky-base" />
        <div className="cs-sky-cloud cs-sky-cloud--a" />
        <div className="cs-sky-cloud cs-sky-cloud--b" />
        <div className="cs-sky-cloud cs-sky-cloud--c" />
        <div className="cs-sky-brand-glow" />
        <div className="cs-sky-brand-glow cs-sky-brand-glow--warm" />
        <div className="cs-sky-flare cs-sky-flare--left" />
        <div className="cs-sky-flare cs-sky-flare--right" />
        <div className="cs-sky-depth" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-16 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.05, ease: EASE }}
          className="cs-apple-logo"
        >
          <Image
            src="/brand/referr-logo.png"
            alt="referr"
            width={837}
            height={286}
            quality={100}
            priority
            className="brand-logo-mark h-auto w-[4.25rem] object-contain sm:w-[4.75rem]"
          />
        </motion.div>

        <motion.h1
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
          className="cs-apple-payoff mt-8 max-w-lg text-balance sm:mt-10 sm:max-w-2xl"
        >
          <motion.span
            custom={0}
            variants={reduced ? undefined : payoffLine}
            initial={reduced ? false : "hidden"}
            animate={reduced ? false : "show"}
            className="block text-white"
          >
            Ken iemand.
          </motion.span>
          <motion.span
            custom={1}
            variants={reduced ? undefined : payoffLine}
            initial={reduced ? false : "hidden"}
            animate={reduced ? false : "show"}
            className="brand-wordmark block"
          >
            Maak het verschil.
          </motion.span>
        </motion.h1>
      </div>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
        className="cs-apple-kicker relative z-10 pb-[max(1.75rem,env(safe-area-inset-bottom))] text-center"
      >
        coming soon
      </motion.p>
    </div>
  );
}
