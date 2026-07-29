"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { INVESTOR_META } from "@/lib/investors/investorsData";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

export function InvestorHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      if (metaRef.current) {
        gsap.from(metaRef.current, {
          autoAlpha: 0,
          y: 16,
          delay: 1.2,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (labelRef.current) {
        gsap.from(labelRef.current, {
          autoAlpha: 0,
          delay: 0.3,
          duration: 0.6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToCase = () => {
    document.getElementById("investment-thesis")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92vh] flex-col items-center justify-center bg-fk-white px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-24 lg:px-8"
    >
      <p
        ref={labelRef}
        className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-primary"
      >
        REFERR INVESTORS
      </p>

      <h1 className="mt-8 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-fk-navy sm:text-6xl lg:text-7xl">
        Recruitment heeft
        <br />
        geen groter zoekteam nodig.
        <br />
        <span className="brand-wordmark">Het heeft een groter netwerk nodig.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base font-medium text-fk-navy/50 sm:text-lg">
        Referr activeert de mensen die talent al kennen.
      </p>

      <div
        ref={metaRef}
        className="mt-10 space-y-1 text-sm font-medium text-fk-navy/40"
      >
        <p>Investeerderspresentatie</p>
        <p>Versie {INVESTOR_META.version}</p>
        <p className="mt-3 inline-flex rounded-full border border-fk-primary/15 bg-fk-primary-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
          {INVESTOR_META.confidentialLabel}
        </p>
      </div>

      <div className="mt-12">
        <Button type="button" onClick={scrollToCase}>
          Bekijk de investeringscase
        </Button>
      </div>

      <p className="mt-16 flex items-center gap-1 text-xs text-fk-navy/30">
        Scroll
        <ChevronDown size={14} className="animate-bounce" aria-hidden />
      </p>
    </section>
  );
}
