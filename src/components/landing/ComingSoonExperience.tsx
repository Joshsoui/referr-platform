"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="coming-soon-surface relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="coming-soon-aurora coming-soon-aurora--a" />
        <div className="coming-soon-aurora coming-soon-aurora--b" />
        <div className="coming-soon-aurora coming-soon-aurora--c" />
        <div className="coming-soon-vignette absolute inset-0" />
        <div className="coming-soon-grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          className="coming-soon-logo-wrap"
          initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <div className="coming-soon-logo-glow coming-soon-logo-glow--core" aria-hidden />
          <div className="coming-soon-logo-glow coming-soon-logo-glow--halo" aria-hidden />
          <Image
            src="/brand/referr-logo.png"
            alt="referr"
            width={837}
            height={286}
            quality={100}
            priority
            className="brand-logo-mark coming-soon-logo h-auto w-[min(86vw,32rem)] object-contain"
          />
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: EASE }}
          className="mt-10 text-[11px] font-medium uppercase tracking-[0.42em] text-white/40 sm:text-xs"
        >
          Coming soon
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: EASE }}
          className="mt-4 max-w-sm text-[15px] font-medium leading-relaxed text-white/55 sm:text-base"
        >
          Ken iemand. Maak het verschil.
        </motion.p>
      </div>
    </div>
  );
}
