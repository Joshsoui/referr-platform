"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { INVESTOR_LINKS } from "@/lib/investors/investorsData";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

export function InvestorClosing() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !logoRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.from(logoRef.current!, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-fk-navy px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="landing-dark-glow landing-dark-glow--cta" aria-hidden />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="text-balance text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-fk-white sm:text-5xl">
          Wij bouwen geen betere database.
          <br />
          <span className="brand-wordmark">
            Wij bouwen een betere manier om mensen te vinden.
          </span>
        </h2>

        <div ref={logoRef} className="mt-10 flex justify-center">
          <BrandLogo href={null} height={36} invertOnDark />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={INVESTOR_LINKS.meeting} className="landing-btn-on-dark group">
            Plan een gesprek
            <ArrowRight
              size={16}
              className="ml-1 inline transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          <Link href={INVESTOR_LINKS.product} className="landing-btn-on-dark-ghost">
            Bekijk het product
          </Link>
          <Link
            href={INVESTOR_LINKS.vision}
            className="inline-flex items-center px-4 py-3 text-sm font-semibold text-white/45 transition-colors hover:text-white"
          >
            Vision
          </Link>
        </div>
      </div>
    </section>
  );
}
