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
      src="/brand/referr-logo.png"
      alt="referr"
      height={height}
      width={Math.round(height * 3.75)}
      className="inline-block h-[1em] w-auto object-contain align-baseline"
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
    const scrollLength = isMobile ? "+=500%" : "+=600%";

    const ctx = gsap.context(() => {
      const scenes = [
        scene1Ref.current,
        scene2Ref.current,
        scene3Ref.current,
        scene4Ref.current,
        scene5Ref.current,
        scene6Ref.current,
      ];
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

      scenes.forEach((scene) => {
        if (scene) gsap.set(scene, { autoAlpha: 0, y: 40 });
      });
      gsap.set(contextRef.current, { autoAlpha: 0, y: 30 });
      gsap.set(glowRef.current, { opacity: 0.6, scale: 1 });
      gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: "left center" });

      const syncSteps = (progress: number) => {
        const t = Math.min(1, Math.max(0, (progress - 0.48) / 0.24));
        const activeCount = Math.min(steps.length, Math.floor(t * steps.length + 0.001) + 1);

        steps.forEach((step, index) => {
          const reached = index < activeCount;
          const done = index < activeCount - 1 || progress >= 0.75;
          const current = index === activeCount - 1 && progress < 0.75;
          step.classList.toggle("is-reached", reached || progress >= 0.75);
          step.classList.toggle("is-done", done || progress >= 0.75);
          step.classList.toggle("is-current", current);
        });

        if (progressFillRef.current) {
          const fill = progress >= 0.75 ? 1 : Math.min(1, Math.max(0, (progress - 0.48) / 0.27));
          progressFillRef.current.style.transform = `scaleX(${fill})`;
        }

        if (updateRef.current) {
          let text = "";
          if (progress >= 0.75) text = UPDATES[4];
          else if (activeCount >= 4) text = UPDATES[3];
          else if (activeCount >= 3) text = UPDATES[2];
          else if (activeCount >= 2) text = UPDATES[1];
          else if (progress >= 0.48) text = UPDATES[0];
          updateRef.current.textContent = text;
          updateRef.current.style.opacity = text ? "1" : "0";
        }

        if (rewardAmountRef.current) {
          const rewardT = Math.min(1, Math.max(0, (progress - 0.78) / 0.1));
          rewardAmountRef.current.textContent = formatEuro(rewardT * 1500);
        }
      };

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: scrollLength,
          pin: pinRef.current,
          scrub: isMobile ? 0.4 : 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncSteps(self.progress),
        },
      });

      // Fade intro
      tl.to(scrollHintRef.current, { autoAlpha: 0, duration: 0.03 }, 0)
        .to(introCopyRef.current, { autoAlpha: 0, y: -60, duration: 0.12 }, 0.02)
        .to(glowRef.current, { opacity: 0.8, scale: 1.05, duration: 0.12 }, 0.04);

      // Context intro
      tl.to(contextRef.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.08)
        .to(contextRef.current, { autoAlpha: 0, y: -20, duration: 0.06 }, 0.16);

      // Scene transitions
      tl.to(scene1Ref.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.19)
        .to(scene1Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.28);

      tl.to(scene2Ref.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.31)
        .to(scene2Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.40);

      tl.to(scene3Ref.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.43)
        .to(scene3Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.50);

      tl.to(scene4Ref.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.52)
        .to(glowRef.current, { opacity: 0.9, scale: 1.08, duration: 0.08 }, 0.52)
        .to(scene4Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.72);

      tl.to(scene5Ref.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.74)
        .to(glowRef.current, { opacity: 1, scale: 1.12, duration: 0.06 }, 0.74)
        .to(scene5Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.82);

      tl.to(scene6Ref.current, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.84)
        .to(glowRef.current, { opacity: 1, scale: 1.16, duration: 0.08 }, 0.84);

      tl.to(glowRef.current, { opacity: 0.6, scale: 1, duration: 0.08 }, 0.94);
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
