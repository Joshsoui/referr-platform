"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";

const EASE = [0.22, 1, 0.36, 1] as const;

function ComingSoonPhone() {
  return (
    <div className="vision-phone coming-soon-phone mx-auto">
      <div className="vision-phone-frame">
        <div className="vision-phone-notch" aria-hidden />
        <div className="vision-phone-screen coming-soon-phone-screen">
          <div className="flex items-center justify-between px-0.5 pb-3 pt-0.5">
            <BrandLogo href={null} height={15} />
            <span className="text-[10px] font-medium text-fk-navy/30">9:41</span>
          </div>

          <p className="text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
            Challenges
          </p>
          <p className="mt-1 text-left text-[16px] font-bold tracking-tight text-fk-navy">
            Wie ken jij vandaag?
          </p>
          <p className="mt-0.5 text-left text-[11px] text-fk-navy/40">
            Ontdek een rol en introduceer iemand
          </p>

          <div className="mt-3 space-y-2 text-left">
            <div className="rounded-xl border border-fk-primary/15 bg-gradient-to-br from-fk-white to-fk-primary-muted/50 p-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wide text-fk-primary">
                  Nieuw
                </p>
                <p className="text-[12px] font-bold text-fk-navy">€ 1.500</p>
              </div>
              <p className="mt-1.5 text-[13px] font-semibold text-fk-navy">
                Senior Financieel Medewerker
              </p>
              <p className="mt-0.5 text-[11px] text-fk-navy/45">
                Almere · 32–40 uur
              </p>
              <p className="mt-2 text-[10px] font-medium text-fk-navy/50">
                Jouw missie: ken jij iemand die past?
              </p>
              <p className="mt-3 inline-flex rounded-full bg-fk-primary px-3 py-1.5 text-[10px] font-semibold text-white">
                Ik ken iemand
              </p>
            </div>

            <div className="rounded-xl border border-fk-navy/[0.06] bg-fk-white p-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wide text-fk-navy/35">
                  Populair
                </p>
                <p className="text-[12px] font-bold text-fk-navy">€ 1.250</p>
              </div>
              <p className="mt-1.5 text-[13px] font-semibold text-fk-navy">
                Logistiek Teamleider
              </p>
              <p className="mt-0.5 text-[11px] text-fk-navy/45">
                Utrecht · 40 uur
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-fk-primary/10 bg-fk-primary-muted/30 p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-fk-primary">
              Beloning vrijgespeeld
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              <span className="brand-wordmark">€ 1.500</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComingSoonExperience() {
  const reduced = useReducedMotion();

  return (
    <div className="landing-surface relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-light-glow coming-soon-atmosphere" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-14 sm:px-8 sm:py-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:py-20">
        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary"
          >
            Coming soon
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.08, ease: EASE }}
            className="mt-7 flex justify-center lg:justify-start"
          >
            <Image
              src="/brand/referr-logo.png"
              alt="referr"
              width={837}
              height={286}
              quality={100}
              priority
              className="brand-logo-mark h-auto w-[min(78vw,22rem)] object-contain sm:w-[24rem]"
            />
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
            className="mx-auto mt-7 max-w-md text-lg font-medium leading-relaxed tracking-[-0.02em] text-fk-navy/55 sm:text-xl lg:mx-0"
          >
            Ken iemand.{" "}
            <span className="brand-wordmark font-bold">Maak het verschil.</span>
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
            className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-fk-navy/40 sm:text-base lg:mx-0"
          >
            Challenges, introducties en beloningen — binnenkort live.
          </motion.p>
        </div>

        <motion.div
          className="relative mt-14 flex w-full justify-center lg:mt-0"
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.28, ease: EASE }}
        >
          <div className="vision-phone-glow coming-soon-phone-glow" aria-hidden />
          <ComingSoonPhone />
        </motion.div>
      </main>
    </div>
  );
}
