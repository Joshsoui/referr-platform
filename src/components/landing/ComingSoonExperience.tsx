"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DustAtmosphere } from "./DustAtmosphere";

const EASE = [0.22, 1, 0.36, 1] as const;

const line = {
  hidden: { opacity: 0, y: 36, filter: "blur(14px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: 0.35 + i * 0.14, ease: EASE },
  }),
};

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="cs-apple relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="cs-apple-base" />
        <div className="cs-apple-smoke cs-apple-smoke--a" />
        <div className="cs-apple-smoke cs-apple-smoke--b" />
        <div className="cs-apple-smoke cs-apple-smoke--c" />
        <div className="cs-apple-spotlight" />
        <div className="cs-apple-vignette" />
        <div className="cs-apple-grain" />
      </div>

      {!reduced && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <DustAtmosphere reduced={false} />
        </div>
      )}

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
          className="cs-apple-logo"
        >
          <Image
            src="/brand/referr-logo.png"
            alt="referr"
            width={837}
            height={286}
            quality={100}
            priority
            className="brand-logo-mark h-auto w-[4.5rem] object-contain opacity-90 sm:w-[5.25rem]"
          />
        </motion.div>

        <motion.h1
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
          className="cs-apple-headline mt-7 sm:mt-9"
          aria-label="Coming soon"
        >
          <motion.span
            custom={0}
            variants={reduced ? undefined : line}
            initial={reduced ? false : "hidden"}
            animate={reduced ? false : "show"}
            className="cs-apple-headline-line block"
          >
            Coming
          </motion.span>
          <motion.span
            custom={1}
            variants={reduced ? undefined : line}
            initial={reduced ? false : "hidden"}
            animate={reduced ? false : "show"}
            className="cs-apple-headline-line cs-apple-headline-accent block"
          >
            soon
          </motion.span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.75, ease: EASE }}
          className="mt-6 max-w-md text-[15px] font-medium leading-relaxed tracking-[-0.01em] text-white/48 sm:mt-8 sm:text-base"
        >
          Ken iemand.{" "}
          <span className="text-white/72">Maak het verschil.</span>
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, scaleX: 0.2 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: EASE }}
          className="cs-apple-shine mt-10 sm:mt-12"
          aria-hidden
        />
      </div>
    </div>
  );
}
