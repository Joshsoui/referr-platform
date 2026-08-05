"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SkyBackdrop } from "./SkyBackdrop";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="cs-apple relative flex min-h-[100dvh] flex-col overflow-hidden">
      <SkyBackdrop reduced={!!reduced} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-4 pt-12 sm:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.05, ease: EASE }}
          className="cs-editorial-logo mb-10 sm:mb-12"
        >
          <Image
            src="/brand/referr-logo.png"
            alt="referr"
            width={837}
            height={286}
            quality={100}
            priority
            className="brand-logo-mark h-auto w-[4rem] object-contain sm:w-[4.5rem]"
          />
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
          className="cs-editorial-hero max-w-3xl text-center text-balance"
        >
          <span className="block text-fk-navy">Ken iemand.</span>
          <span className="brand-wordmark block">Maak het verschil.</span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
          className="cs-editorial-kicker mt-8 sm:mt-10"
        >
          coming soon
        </motion.p>
      </div>

      <motion.footer
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
        className="relative z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center"
      >
        <a href="mailto:info@referr.nl" className="cs-editorial-email">
          info@referr.nl
        </a>
      </motion.footer>
    </div>
  );
}
