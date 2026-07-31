"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
          delay: 1.1,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (labelRef.current) {
        gsap.from(labelRef.current, {
          autoAlpha: 0,
          delay: 0.25,
          duration: 0.6,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const scrollToCase = () => {
    document.getElementById("problem")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-fk-white px-4 pb-14 pt-20 text-center sm:px-6 sm:pt-24 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,77,89,0.12),transparent_55%)]"
        aria-hidden
      />

      <p
        ref={labelRef}
        className="relative flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-primary"
      >
        <BrandLogo href={null} height={14} className="opacity-90" />
        investors
      </p>

      <h1 className="relative mt-8 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-fk-navy sm:text-6xl lg:text-7xl">
        Recruitment heeft
        <br />
        geen groter zoekteam nodig.
        <br />
        <span className="brand-wordmark">Het heeft een groter netwerk nodig.</span>
      </h1>

      <p className="relative mx-auto mt-6 max-w-lg text-base font-medium text-fk-navy/50 sm:text-lg">
        referr activeert de mensen die talent al kennen.
      </p>

      <div
        ref={metaRef}
        className="relative mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-fk-navy/40"
      >
        <span>Versie {INVESTOR_META.version}</span>
        <span className="h-1 w-1 rounded-full bg-fk-navy/20" aria-hidden />
        <span className="inline-flex rounded-full border border-fk-primary/15 bg-fk-primary-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
          {INVESTOR_META.confidentialLabel}
        </span>
      </div>

      <div className="relative mt-10">
        <Button type="button" onClick={scrollToCase}>
          Bekijk de investeringscase
        </Button>
      </div>

      <p className="relative mt-14 flex items-center gap-1 text-xs text-fk-navy/30">
        Scroll
        <ChevronDown size={14} className="animate-bounce" aria-hidden />
      </p>
    </section>
  );
}
