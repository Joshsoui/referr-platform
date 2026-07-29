"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEMO_CHALLENGE,
  formatInvestorEuro,
  PRODUCT_FLOW_STEPS,
} from "@/lib/investors/investorsData";
import {
  BrowserFrame,
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

const STATUS_STEPS = [
  "Gestart",
  "Introductie",
  "Kennismaking",
  "Plaatsing",
  "Beloning",
];

export function ProductFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepTextRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduced = useReducedMotion();

  const syncStep = useCallback((index: number) => {
    setActiveStep(index);
    if (stepTextRef.current) {
      stepTextRef.current.textContent = PRODUCT_FLOW_STEPS[index] ?? "";
    }
  }, []);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 20%",
        end: "bottom 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          const index = Math.min(
            PRODUCT_FLOW_STEPS.length - 1,
            Math.floor(self.progress * PRODUCT_FLOW_STEPS.length)
          );
          syncStep(index);
          if (progressRef.current) {
            const fill = (index + 1) / PRODUCT_FLOW_STEPS.length;
            progressRef.current.style.transform = `scaleX(${fill})`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, syncStep]);

  useEffect(() => {
    if (!reduced) return;
    syncStep(PRODUCT_FLOW_STEPS.length - 1);
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(1)";
    }
  }, [reduced, syncStep]);

  return (
    <InvestorSectionShell
      id="product-flow"
      variant="muted"
      wide
      label="De oplossing"
    >
      <div ref={sectionRef}>
        <InvestorHeadline>
          Van vacature
          <br />
          <span className="brand-wordmark">naar challenge.</span>
        </InvestorHeadline>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <BrowserFrame>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-fk-primary-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fk-primary">
                Challenge
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                Finance
              </span>
            </div>

            <h3 className="text-xl font-bold text-fk-navy sm:text-2xl">
              {DEMO_CHALLENGE.title}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-fk-navy/55">
              <MapPin size={14} className="shrink-0" />
              {DEMO_CHALLENGE.location} · {DEMO_CHALLENGE.hours}
            </p>

            <div className="mt-5 rounded-xl bg-fk-light px-4 py-3">
              <p className="text-xs font-semibold uppercase text-fk-navy/45">
                Beloning tot
              </p>
              <p className="mt-0.5 text-2xl font-extrabold text-amber-700">
                {formatInvestorEuro(DEMO_CHALLENGE.reward)}
              </p>
            </div>

            <div className="mt-6">
              <div className="relative h-1.5 overflow-hidden rounded-full bg-fk-navy/8">
                <div
                  ref={progressRef}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-fk-secondary to-fk-primary"
                  style={{ transform: "scaleX(0.14)" }}
                />
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-2">
                {STATUS_STEPS.map((step, index) => {
                  const reached = index <= Math.min(activeStep, STATUS_STEPS.length - 1);
                  return (
                    <div
                      key={step}
                      className={`flex flex-col items-center gap-1 text-[10px] font-semibold sm:text-xs ${
                        reached ? "text-fk-primary" : "text-fk-navy/35"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                          reached
                            ? "border-fk-primary bg-fk-primary-muted"
                            : "border-fk-navy/15 bg-fk-white"
                        }`}
                      >
                        {reached ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span className="max-w-[4.5rem] text-center leading-tight">
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </BrowserFrame>

          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fk-primary">
              Scroll door de flow
            </p>
            <p
              ref={stepTextRef}
              className="mt-4 min-h-[4.5rem] text-xl font-semibold leading-snug text-fk-navy sm:text-2xl"
            >
              {PRODUCT_FLOW_STEPS[0]}
            </p>
            <ol className="mt-8 space-y-3" aria-label="Productstappen">
              {PRODUCT_FLOW_STEPS.map((step, index) => (
                <li
                  key={step}
                  className={`border-l-2 pl-4 text-sm transition-colors ${
                    index === activeStep
                      ? "border-fk-primary font-semibold text-fk-navy"
                      : index < activeStep
                        ? "border-fk-primary/40 text-fk-navy/60"
                        : "border-fk-navy/10 text-fk-navy/40"
                  }`}
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </InvestorSectionShell>
  );
}
