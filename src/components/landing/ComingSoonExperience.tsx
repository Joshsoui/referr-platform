"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="coming-soon-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Opening curtain */}
        <motion.div
          className="coming-soon-curtain absolute inset-0"
          initial={reduced ? false : { opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.2, delay: 0.15, ease: EASE }}
        />

        {/* Central light bloom */}
        <motion.div
          className="coming-soon-bloom absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
          initial={reduced ? false : { opacity: 0, scale: 0.15 }}
          animate={{ opacity: [0, 0.95, 0.35], scale: [0.15, 1.05, 1.55] }}
          transition={{ duration: 2.6, delay: 0.1, times: [0, 0.4, 1], ease: EASE }}
        />

        {/* Expanding ring */}
        <motion.div
          className="coming-soon-ring absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
          initial={reduced ? false : { opacity: 0.8, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.6 }}
          transition={{ duration: 2, delay: 0.7, ease: EASE }}
        />

        <div className="coming-soon-aurora coming-soon-aurora--a" />
        <div className="coming-soon-aurora coming-soon-aurora--b" />
        <div className="coming-soon-aurora coming-soon-aurora--c" />
        <div className="coming-soon-vignette absolute inset-0" />
        <div className="coming-soon-grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          className="coming-soon-logo-wrap"
          initial={
            reduced
              ? false
              : { opacity: 0, scale: 1.28, filter: "blur(28px)", y: 18 }
          }
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 2, delay: 0.85, ease: EASE }}
        >
          <div
            className="coming-soon-logo-glow coming-soon-logo-glow--core"
            aria-hidden
          />
          <div
            className="coming-soon-logo-glow coming-soon-logo-glow--halo"
            aria-hidden
          />

          <div className="coming-soon-logo-stage">
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark coming-soon-logo h-auto w-[min(88vw,36rem)] object-contain"
            />
            <motion.span
              className="coming-soon-sheen"
              aria-hidden
              initial={reduced ? false : { x: "-140%", opacity: 0 }}
              animate={{
                x: ["-140%", "140%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.6,
                delay: 2.35,
                ease: EASE,
                times: [0, 0.45, 1],
                repeat: Infinity,
                repeatDelay: 4.5,
              }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={
            reduced ? false : { opacity: 0, y: 16, filter: "blur(12px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 2.15, ease: EASE }}
          className="coming-soon-label mt-12 text-[11px] font-medium uppercase tracking-[0.46em] text-white/38 sm:text-xs"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={
            reduced ? false : { opacity: 0, y: 18, filter: "blur(12px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.25, delay: 2.4, ease: EASE }}
          className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-white/52 sm:text-base"
        >
          Ken iemand. Maak het verschil.
        </motion.p>
      </div>
    </div>
  );
}
