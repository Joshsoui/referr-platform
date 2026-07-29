"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
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
      className="flex min-h-[70vh] flex-col items-center justify-center bg-fk-white px-4 py-28 text-center sm:px-6 lg:px-8"
    >
      <h2 className="max-w-3xl text-balance text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-fk-navy sm:text-5xl lg:text-6xl">
        Iedereen kent talent.
        <br />
        <span className="brand-wordmark">Referr maakt dat netwerk zichtbaar.</span>
      </h2>

      <div className="mx-auto mt-8 max-w-lg space-y-2 text-base font-medium text-fk-navy/55 sm:text-lg">
        <p>Wij bouwen geen betere database.</p>
        <p>Wij bouwen een betere manier om mensen te vinden.</p>
      </div>

      <div ref={logoRef} className="mt-12">
        <BrandLogo href={null} height={40} />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href={INVESTOR_LINKS.meeting}>Plan een gesprek</Button>
        <Link
          href={INVESTOR_LINKS.product}
          className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border-2 border-fk-primary/15 bg-fk-white px-6 py-3 text-sm font-semibold text-fk-primary transition-colors hover:bg-fk-primary-muted"
        >
          Bekijk het product
          <ArrowRight size={16} />
        </Link>
        <Link
          href={INVESTOR_LINKS.vision}
          className="btn-press inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-fk-navy/55 transition-colors hover:text-fk-navy"
        >
          Open Referr Vision
        </Link>
      </div>
    </section>
  );
}
