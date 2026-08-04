"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Lock } from "lucide-react";
import Image from "next/image";
import { BrandLogo } from "@/components/brand/BrandLogo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function InlineBrand({ height = 14 }: { height?: number }) {
  return (
    <Image
      src="/brand/referr-logo.svg"
      alt="referr"
      height={height}
      width={Math.round(height * 3.75)}
      unoptimized
      className="brand-logo-mark inline-block h-[1em] w-auto object-contain align-baseline"
      style={{ height: `${height}px`, width: "auto" }}
    />
  );
}

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  "Gestart",
  "Introductie",
  "Kennismaking",
  "Plaatsing",
  "Beloning",
] as const;

const UPDATES = [
  "Introductie ontvangen",
  "Werkgever heeft het profiel bekeken",
  "Kennismaking gepland voor donderdag",
  "Mike is uitgenodigd voor een tweede gesprek",
  "Mike start op 1 september",
] as const;

function formatEuro(value: number) {
  return `€ ${Math.round(value).toLocaleString("nl-NL")}`;
}

function ReducedHero() {
  return (
    <section className="relative isolate overflow-hidden bg-fk-white px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
      <div className="hero-light-glow" aria-hidden />
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <BrandLogo height={30} priority />
          <Link
            href="/inloggen"
            className="text-sm font-medium text-fk-navy/40 transition-colors hover:text-fk-navy"
          >
            Inloggen
          </Link>
        </div>
        <div className="mt-16 text-center sm:mt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
            Iedereen kent talent
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] text-fk-navy sm:text-6xl lg:text-7xl">
            Ken jij de juiste persoon?
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base font-medium text-fk-navy/45 sm:text-lg">
            Ontdek challenges, introduceer iemand uit je netwerk en volg wat
            jouw introductie in beweging zet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/vacatures" className="landing-btn-primary">
              Ontdek challenges
              <ArrowRight size={16} />
            </Link>
            <Link href="/#hoe-het-werkt" className="landing-btn-ghost inline-flex items-center gap-1.5">
              Zo werkt <InlineBrand height={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroScrollStory() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const introCopyRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const contextRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);
  const scene6Ref = useRef<HTMLDivElement>(null);

  const progressFillRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<HTMLParagraphElement>(null);
  const rewardAmountRef = useRef<HTMLSpanElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(media.matches);
      setReady(true);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion) return;
    if (!rootRef.current || !pinRef.current) return;

    const root = rootRef.current;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    // Extra panels for each progress checkpoint → calmer reading
    const scrollLength = isMobile ? "+=1100%" : "+=1200%";

    const ctx = gsap.context(() => {
      type Panel = {
        el: HTMLElement | null;
        kind: "intro" | "scene" | "progress" | "reward";
        /** 0–5 for progress checkpoints (STEPS length) */
        progressStep?: number;
      };

      const progressPanels: Panel[] = STEPS.map((_, step) => ({
        el: scene4Ref.current,
        kind: "progress" as const,
        progressStep: step,
      }));

      const panels: Panel[] = [
        { el: introCopyRef.current, kind: "intro" },
        { el: contextRef.current, kind: "scene" },
        { el: scene1Ref.current, kind: "scene" },
        { el: scene2Ref.current, kind: "scene" },
        { el: scene3Ref.current, kind: "scene" },
        ...progressPanels,
        { el: scene5Ref.current, kind: "scene" },
        { el: scene6Ref.current, kind: "reward" },
      ];
      const panelCount = panels.length;
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

      const uniqueEls = new Set(
        panels.map((p) => p.el).filter(Boolean) as HTMLElement[]
      );
      uniqueEls.forEach((el) => {
        const isIntro = el === introCopyRef.current;
        gsap.set(el, { autoAlpha: isIntro ? 1 : 0, y: isIntro ? 0 : 16 });
      });
      gsap.set(glowRef.current, { opacity: 0.6, scale: 1 });
      gsap.set(progressFillRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(scrollHintRef.current, { autoAlpha: 1 });
      if (rewardAmountRef.current) {
        rewardAmountRef.current.textContent = formatEuro(0);
      }

      let activeIndex = 0;

      const setProgressCheckpoint = (stepIndex: number) => {
        const activeCount = stepIndex + 1;
        const fill = activeCount / steps.length;
        const fullyDone = stepIndex >= steps.length - 1;

        steps.forEach((step, index) => {
          const reached = index < activeCount;
          const done = index < activeCount - 1 || fullyDone;
          const current = index === stepIndex && !fullyDone;
          step.classList.toggle("is-reached", reached);
          step.classList.toggle("is-done", done);
          step.classList.toggle("is-current", current);
        });

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${fill})`;
        }

        if (updateRef.current) {
          const text = UPDATES[Math.min(stepIndex, UPDATES.length - 1)] ?? "";
          updateRef.current.textContent = text;
          updateRef.current.style.opacity = text ? "1" : "0";
        }
      };

      const showPanel = (index: number) => {
        if (index === activeIndex) return;
        const prev = panels[activeIndex];
        const next = panels[index];

        // Switching between progress checkpoints keeps the same element visible
        const sameEl = prev?.el && next?.el && prev.el === next.el;

        if (!sameEl) {
          if (prev?.el) {
            gsap.to(prev.el, {
              autoAlpha: 0,
              y: -12,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (next?.el) {
            gsap.fromTo(
              next.el,
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          }
        } else if (next?.el) {
          gsap.set(next.el, { autoAlpha: 1, y: 0 });
        }

        gsap.to(scrollHintRef.current, {
          autoAlpha: index === 0 ? 1 : 0,
          duration: 0.2,
          overwrite: "auto",
        });

        const isReward = next?.kind === "reward";
        const isLate = index >= panelCount - 2;
        gsap.to(glowRef.current, {
          opacity: index === 0 ? 0.6 : isReward ? 1 : 0.85,
          scale: index === 0 ? 1 : isLate ? 1.1 : 1.05,
          duration: 0.35,
          overwrite: "auto",
        });

        if (next?.kind === "progress" && typeof next.progressStep === "number") {
          setProgressCheckpoint(next.progressStep);
        }

        if (next?.kind === "reward" && rewardAmountRef.current) {
          // Always land on the challenge reward: € 1.500
          const obj = { value: 0 };
          gsap.to(obj, {
            value: 1500,
            duration: 0.9,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => {
              if (rewardAmountRef.current) {
                rewardAmountRef.current.textContent = formatEuro(obj.value);
              }
            },
            onComplete: () => {
              if (rewardAmountRef.current) {
                rewardAmountRef.current.textContent = formatEuro(1500);
              }
            },
          });
        }

        activeIndex = index;
      };

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: scrollLength,
        pin: pinRef.current,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (panelCount - 1),
          duration: { min: 0.12, max: isMobile ? 0.28 : 0.35 },
          delay: 0.04,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const raw = self.progress * (panelCount - 1);
          const index = Math.min(
            panelCount - 1,
            Math.max(0, Math.round(raw))
          );
          showPanel(index);
        },
        onSnapComplete: (self) => {
          const index = Math.min(
            panelCount - 1,
            Math.max(0, Math.round(self.progress * (panelCount - 1)))
          );
          if (panels[index]?.kind === "reward" && rewardAmountRef.current) {
            rewardAmountRef.current.textContent = formatEuro(1500);
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  if (!ready) {
    return (
      <section className="relative isolate min-h-[100vh] bg-fk-white">
        <div className="hero-light-glow" aria-hidden />
      </section>
    );
  }

  if (reducedMotion) return <ReducedHero />;

  return (
    <section ref={rootRef} className="hero-scroll-root relative isolate">
      <div ref={pinRef} className="relative min-h-[100svh] overflow-hidden bg-fk-white">
        <div ref={glowRef} className="hero-light-glow" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col px-4 pb-6 pt-8 sm:px-6 sm:pt-10">
          <div className="flex items-center justify-between">
            <BrandLogo height={30} priority />
            <Link
              href="/inloggen"
              className="text-sm font-medium text-fk-navy/40 transition-colors hover:text-fk-navy"
            >
              Inloggen
            </Link>
          </div>

          {/* Intro copy */}
          <div
            ref={introCopyRef}
            className="mt-auto flex flex-col items-center pb-4 text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary sm:text-xs">
              Iedereen kent talent
            </p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-fk-navy sm:text-6xl lg:text-7xl">
              Ken jij de juiste persoon?
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-fk-navy/45 sm:text-lg">
              Ontdek challenges, introduceer iemand uit je netwerk en volg wat
              jouw introductie in beweging zet.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/vacatures" className="landing-btn-primary group">
                Ontdek challenges
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <Link href="/#hoe-het-werkt" className="landing-btn-ghost inline-flex items-center gap-1.5">
                Zo werkt <InlineBrand height={13} />
              </Link>
            </div>
          </div>

          {/* Scenes — absolutely positioned, fade in/out */}
          <div className="hero-scenes pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
            {/* Context intro */}
            <div ref={contextRef} className="hero-scene">
              <p className="hero-scene-label flex items-center justify-center gap-1.5">Zo werkt <InlineBrand height={12} /></p>
              <h2 className="hero-scene-title-light mt-3">
                Van challenge tot beloning in 5 stappen
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base font-medium text-fk-navy/45 sm:text-lg">
                Scroll mee en zie hoe een introductie uit jouw netwerk leidt tot
                een echte beloning.
              </p>
            </div>

            {/* Scene 1 */}
            <div ref={scene1Ref} className="hero-scene">
              <p className="hero-scene-label">Nieuwe challenge</p>
              <h2 className="hero-scene-title-light">
                Senior Financieel Medewerker
              </h2>
              <p className="hero-scene-sub-light">Almere · 32–40 uur</p>
              <div className="mx-auto mt-7 grid max-w-sm grid-cols-3 gap-2.5 sm:mt-9 sm:gap-3">
                {[
                  ["Beloning", "€ 1.500"],
                  ["Deadline", "Nog 18 dagen"],
                  ["Introducties", "3 actief"],
                ].map(([label, value]) => (
                  <div key={label} className="hero-light-card text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-fk-navy/35 sm:text-[11px]">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-fk-navy sm:text-base">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-7 inline-block rounded-full border border-fk-primary/30 bg-fk-primary-muted/60 px-5 py-2.5 text-sm font-bold text-fk-primary">
                Bekijk challenge
              </p>
            </div>

            {/* Scene 2 */}
            <div ref={scene2Ref} className="hero-scene">
              <p className="hero-scene-label">Jouw missie</p>
              <h2 className="hero-scene-title-light">
                Wie in jouw netwerk past bij deze rol?
              </h2>
              <div className="mx-auto mt-7 max-w-sm space-y-2.5 sm:mt-9">
                {[
                  "Wie heeft ervaring in finance?",
                  "Wie woont in of rond Almere?",
                  "Wie staat mogelijk open voor iets nieuws?",
                ].map((q) => (
                  <div key={q} className="hero-light-card text-left">
                    <p className="text-sm font-medium text-fk-navy/70 sm:text-[15px]">{q}</p>
                  </div>
                ))}
              </div>
              <p className="mt-7 inline-block rounded-full border border-fk-primary/30 bg-fk-primary-muted/60 px-5 py-2.5 text-sm font-bold text-fk-primary">
                Ik ken iemand
              </p>
            </div>

            {/* Scene 3 */}
            <div ref={scene3Ref} className="hero-scene">
              <p className="hero-scene-label">Challenge gestart</p>
              <h2 className="hero-scene-title-light">
                Joshua introduceerde Mike Jansen
              </h2>
              <p className="hero-scene-sub-light">Vandaag, 10:42</p>
              <div className="hero-light-card mx-auto mt-7 max-w-xs sm:mt-9">
                <div className="flex items-center gap-3">
                  <div className="hero-avatar hero-avatar--sm">MJ</div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-fk-navy">
                      Mike Jansen
                    </p>
                    <p className="text-xs text-fk-navy/45">
                      Introductie ontvangen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scene 4 */}
            <div ref={scene4Ref} className="hero-scene">
              <p className="hero-scene-label">Voortgang</p>
              <h2 className="hero-scene-title-light">Mike Jansen</h2>
              <p className="hero-scene-sub-light">Senior Financieel Medewerker</p>
              <div className="mx-auto mt-7 max-w-md sm:mt-9">
                <div className="hero-scroll-rail-track-light" aria-hidden>
                  <div ref={progressFillRef} className="hero-scroll-rail-fill" />
                </div>
                <div className="hero-scroll-rail mt-4">
                  {STEPS.map((step, index) => (
                    <div
                      key={step}
                      ref={(node) => {
                        stepRefs.current[index] = node;
                      }}
                      className="hero-scroll-rail-item-light"
                    >
                      <span className="hero-scroll-rail-dot-light">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <p
                  ref={updateRef}
                  className="mt-4 text-center text-sm font-medium text-fk-navy/50 transition-opacity duration-200"
                />
              </div>
            </div>

            {/* Scene 5 */}
            <div ref={scene5Ref} className="hero-scene">
              <p className="hero-scene-label">Nog één stap</p>
              <h2 className="hero-scene-title-light">
                Start kandidaat bevestigen
              </h2>
              <div className="hero-light-card mx-auto mt-7 max-w-xs sm:mt-9">
                <div className="flex items-center justify-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-fk-navy/5 text-fk-navy/35">
                    <Lock size={18} />
                  </span>
                  <div className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fk-navy/35">
                      Beloning
                    </p>
                    <p className="text-2xl font-bold text-fk-navy/25">€ ••••</p>
                    <p className="text-xs text-fk-navy/40">
                      Wordt vrijgegeven na de start
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scene 6 */}
            <div ref={scene6Ref} className="hero-scene">
              <p className="hero-scene-label">Challenge voltooid</p>
              <h2 className="hero-scene-title-light">
                Mike start op 1 september
              </h2>
              <div className="mx-auto mt-7 max-w-xs sm:mt-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
                  Beloning vrijgespeeld
                </p>
                <p className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl">
                  <span ref={rewardAmountRef} className="brand-wordmark">
                    € 0
                  </span>
                </p>
                <p className="mt-3 text-sm font-medium text-fk-navy/40">
                  Beschikbaar voor uitbetaling
                </p>
              </div>
              <p className="mt-10 text-base font-medium text-fk-navy/45 sm:text-lg">
                Eén goede introductie. Een nieuwe baan. Een echte beloning.
              </p>
            </div>
          </div>

          <p
            ref={scrollHintRef}
            className="hero-scroll-hint mt-auto flex items-center justify-center gap-1.5 pb-2 pt-4 text-[12px] font-medium text-fk-navy/30"
          >
            Scroll om te ontdekken
            <ChevronDown size={14} className="hero-scroll-hint-icon" />
          </p>
        </div>
      </div>
    </section>
  );
}
