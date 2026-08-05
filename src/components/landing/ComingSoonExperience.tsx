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

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-4 pt-14 sm:px-8">
        <div className="cs-editorial-hero w-full max-w-5xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="cs-editorial-word cs-editorial-word--left"
          >
            Coming
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="cs-editorial-logo"
          >
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark h-auto w-[3.75rem] object-contain sm:w-[4.25rem]"
            />
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="cs-editorial-word cs-editorial-word--right"
          >
            soon
          </motion.p>
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="cs-editorial-tagline mt-8 max-w-sm text-center sm:mt-10 sm:max-w-md"
        >
          Ken iemand.{" "}
          <span className="brand-wordmark font-bold">Maak het verschil.</span>
        </motion.p>
      </div>

      <motion.footer
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        className="relative z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center"
      >
        <a
          href="mailto:info@referr.nl"
          className="cs-editorial-email"
        >
          info@referr.nl
        </a>
      </motion.footer>
    </div>
  );
}
