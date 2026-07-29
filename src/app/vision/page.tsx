"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PublicHeader } from "@/components/landing/PublicHeader";
import { PublicFooter } from "@/components/landing/PublicFooter";
import Image from "next/image";

function InlineLogo({ height = 28, className = "" }: { height?: number; className?: string }) {
  const width = Math.round(height * 3.75);
  return (
    <Image
      src="/brand/referr-logo.png"
      alt="referr"
      height={height}
      width={width}
      className={`inline-block h-[1em] w-auto object-contain align-baseline ${className}`}
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

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function StorySection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={ref}
      className={`relative px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

function FlowSteps({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>(".flow-step");
    const lines = ref.current.querySelectorAll<HTMLElement>(".flow-line");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          items.forEach((item, i) => {
            const t = i / (steps.length - 1);
            const active = progress >= t;
            item.style.color = active ? "#ff4d59" : "";
            item.style.opacity = active ? "1" : "0.45";
          });
          lines.forEach((line, i) => {
            const t = (i + 0.5) / (steps.length - 1);
            const active = progress >= t;
            line.style.background = active
              ? "linear-gradient(180deg, #ff4d59, #ff9a3c)"
              : "";
            line.style.opacity = active ? "1" : "0.12";
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, steps.length]);

  return (
    <div ref={ref} className="mx-auto mt-14 flex max-w-[180px] flex-col items-center">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <span className="flow-step text-sm font-semibold text-fk-navy/45 transition-colors duration-300">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="flow-line my-2 h-8 w-px bg-fk-navy/10 transition-all duration-300" />
          )}
        </div>
      ))}
    </div>
  );
}

function WordReveal({ words }: { words: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".word-item");
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced, words]);

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mt-16"
    >
      {words.map((word) => (
        <span
          key={word}
          className="word-item text-lg font-medium text-fk-navy/50 sm:text-xl"
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function SplitReveal({
  first,
  second,
}: {
  first: React.ReactNode;
  second: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current || !secondRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(secondRef.current!, { autoAlpha: 0, y: 50 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 30%",
        onEnter: () => {
          gsap.to(secondRef.current!, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(secondRef.current!, {
            autoAlpha: 0,
            y: 50,
            duration: 0.5,
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className="min-h-[70vh] flex flex-col items-center justify-center py-24 sm:py-32">
      <div>{first}</div>
      <div ref={secondRef} className="mt-8 sm:mt-12">
        {second}
      </div>
    </div>
  );
}

function MiniChallenge() {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-fk-navy/[0.06] bg-white p-5 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fk-primary">
        Nieuwe challenge
      </p>
      <h3 className="mt-2 text-lg font-bold text-fk-navy">
        Senior Financieel Medewerker
      </h3>
      <p className="mt-1 text-sm text-fk-navy/45">Almere · 32–40 uur</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Beloning", "€ 1.500"],
          ["Deadline", "18 dagen"],
          ["Status", "3 actief"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-fk-navy/[0.04] bg-fk-navy/[0.015] px-2.5 py-2 text-center"
          >
            <p className="text-[9px] font-semibold uppercase tracking-wide text-fk-navy/35">
              {label}
            </p>
            <p className="mt-0.5 text-xs font-bold text-fk-navy">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniProgress() {
  return (
    <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-fk-navy/[0.06] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4d59] to-[#ff9a3c] text-[10px] font-bold text-white">
          MJ
        </div>
        <div>
          <p className="text-sm font-semibold text-fk-navy">Mike Jansen</p>
          <p className="text-xs text-fk-navy/40">In gesprek</p>
        </div>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-fk-navy/[0.05]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ff4d59] via-[#ff7a30] to-[#ffaa20]"
          style={{ width: "70%" }}
        />
      </div>
      <div className="mt-2.5 grid grid-cols-5 gap-1">
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-1">
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[8px] ${
                i < 3
                  ? "bg-gradient-to-br from-[#ff4d59] to-[#ff9a3c] text-white"
                  : "border border-fk-navy/10 bg-white"
              }`}
            >
              {i < 3 && <Check size={8} strokeWidth={3} />}
            </span>
            <span className="text-[9px] font-medium text-fk-navy/40">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniReward() {
  return (
    <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-fk-primary/10 bg-fk-primary-muted/30 p-5 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-fk-primary">
        Beloning vrijgespeeld
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight">
        <span className="brand-wordmark">€ 1.500</span>
      </p>
      <p className="mt-1.5 text-xs font-medium text-fk-navy/40">
        Beschikbaar voor uitbetaling
      </p>
    </div>
  );
}

export default function VisionPage() {
  return (
    <div className="landing-surface min-h-screen overflow-x-hidden bg-fk-white">
      <PublicHeader />

      {/* Section 1 — Hero */}
      <section className="flex min-h-[100svh] flex-col items-center justify-center px-4 pt-20 text-center">
        <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
          <InlineLogo height={14} className="opacity-80" /> vision
        </p>
        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-fk-navy sm:text-6xl lg:text-[5.5rem]">
          Recruitment verandert.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-[1.6] text-fk-navy/40 sm:text-2xl sm:leading-[1.5]">
          Niet omdat mensen stoppen met zoeken.
          <br />
          Maar omdat talent niet meer zit te wachten op vacatures.
        </p>
        <p className="mx-auto mt-9 max-w-lg text-base font-medium text-fk-navy/30 sm:text-lg">
          Wij geloven dat de manier waarop mensen elkaar vinden fundamenteel
          gaat veranderen.
        </p>
      </section>

      {/* Section 2 — Traditional flow */}
      <StorySection className="py-28 sm:py-36">
        <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-fk-navy sm:text-5xl">
          De meeste bedrijven...
          <br />
          <span className="text-fk-navy/35">
            zoeken nog steeds op dezelfde manier.
          </span>
        </h2>
        <FlowSteps steps={["Vacature", "Recruiter", "Kandidaat", "Aangenomen"]} />
        <p className="mt-14 text-base font-medium text-fk-navy/40 sm:text-lg">
          Dit proces bestaat al tientallen jaren.
          <br />
          Maar de wereld is veranderd.
        </p>
      </StorySection>

      {/* Section 3 — Gevonden */}
      <StorySection className="py-28 sm:py-36">
        <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-fk-navy sm:text-5xl lg:text-6xl">
          De beste kandidaten...
          <br />
          solliciteren vaak niet.
        </h2>
        <p className="mt-6 text-3xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          <span className="text-fk-navy/35">Ze worden</span>{" "}
          <span className="brand-wordmark">gevonden.</span>
        </p>
      </StorySection>

      {/* Section 4 — Iedereen kent talent */}
      <StorySection className="py-28 sm:py-36 text-center">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-fk-navy sm:text-5xl">
          Iedereen kent talent.
        </h2>
        <p className="mt-4 text-xl font-medium text-fk-navy/40 sm:text-2xl">
          Iedereen kent wel iemand.
        </p>
        <WordReveal
          words={[
            "Een oud-collega.",
            "Een buurman.",
            "Een vriend.",
            "Een studiegenoot.",
            "Een familielid.",
          ]}
        />
      </StorySection>

      {/* Section 5 — Cinematic moment */}
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-28 text-center sm:py-36">
        <SplitReveal
          first={
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-fk-navy sm:text-5xl lg:text-6xl">
              Waarom zoeken
              <br />
              met drie recruiters...
            </h2>
          }
          second={
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              <span className="brand-wordmark">...als duizenden mensen</span>
              <br />
              <span className="brand-wordmark">kunnen helpen?</span>
            </h2>
          }
        />
      </section>

      {/* Section 6 — Herkennen */}
      <StorySection className="py-28 sm:py-36">
        <h2 className="text-3xl font-bold leading-tight tracking-[-0.03em] text-fk-navy sm:text-5xl">
          Recruitment draait
          <br />
          niet alleen om zoeken.
        </h2>
        <p className="mt-5 text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
          <span className="brand-wordmark">Het draait om herkennen.</span>
        </p>
        <div className="mt-12 space-y-3 text-base font-medium text-fk-navy/40 sm:text-lg">
          <p>Mensen herkennen talent.</p>
          <p>Dat is iets wat geen vacaturebank kan.</p>
          <p>Dat is iets wat AI alleen ook niet kan.</p>
        </div>
      </StorySection>

      {/* Section 7 — Interface */}
      <StorySection className="py-28 sm:py-36 text-center">
        <MiniChallenge />
        <MiniProgress />
        <MiniReward />
      </StorySection>

      {/* Section 8 — Niet vervangen */}
      <StorySection className="py-28 sm:py-36">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-fk-navy sm:text-5xl">
          <InlineLogo height={38} className="sm:h-[48px] mr-1 -mt-1" /> vervangt recruiters niet.
        </h2>
        <div className="mt-10 space-y-3 text-base font-medium text-fk-navy/40 sm:text-lg">
          <p><InlineLogo height={16} className="mr-0.5 -mt-0.5" /> geeft recruiters duizenden extra ogen.</p>
          <p>Iedereen kan talent herkennen.</p>
          <p>Recruiters zorgen voor de juiste match.</p>
          <p>Samen werkt dat beter.</p>
        </div>
      </StorySection>

      {/* Section 9 — Enormous type */}
      <StorySection className="flex min-h-[70vh] items-center py-28 sm:py-36">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-fk-navy sm:text-5xl lg:text-[4.5rem]">
          Wij geloven niet
          <br />
          in méér recruiters.
          <br />
          <br />
          <span className="brand-wordmark">
            Wij geloven
            <br />
            in méér mensen
            <br />
            die talent herkennen.
          </span>
        </h2>
      </StorySection>

      {/* Section 10 — Market context */}
      <StorySection className="py-28 sm:py-36">
        <div className="space-y-5 text-base font-medium leading-relaxed text-fk-navy/50 sm:text-lg">
          <p>
            Er bestaan al jaren vormen van crowdsourced recruitment.
          </p>
          <p>
            Maar vaak blijft het beperkt tot het verzamelen van referrals.
          </p>
          <p className="text-fk-navy/70">
            <InlineLogo height={16} className="mr-0.5 -mt-0.5" /> gaat een stap verder.
          </p>
          <p className="text-fk-navy">
            Wij maken van iedere vacature een challenge.
          </p>
          <p>Iedere introductie is transparant.</p>
          <p>Iedere stap is zichtbaar.</p>
          <p>Iedere succesvolle plaatsing wordt beloond.</p>
        </div>
      </StorySection>

      {/* Section 11 — Product mockups */}
      <StorySection className="py-28 sm:py-36 text-center">
        <div className="space-y-5">
          <MiniChallenge />
          <MiniProgress />
          <MiniReward />
        </div>
      </StorySection>

      {/* Section 12 — Three lines */}
      <StorySection className="py-28 text-center sm:py-36">
        <div className="space-y-4 text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
          <p className="text-fk-navy">Een betere match.</p>
          <p className="text-fk-navy">Een sterker netwerk.</p>
          <p className="brand-wordmark">Een gedeelde beloning.</p>
        </div>
      </StorySection>

      {/* Section 13 — Emotional peak */}
      <section className="px-4 py-28 text-center sm:py-36">
        <div className="mx-auto max-w-4xl">
          <SplitReveal
            first={
              <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-fk-navy sm:text-5xl lg:text-6xl">
                Wij bouwen
                <br />
                geen betere
                <br />
                recruitmentsoftware.
              </h2>
            }
            second={
              <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                <span className="brand-wordmark">
                  Wij bouwen
                  <br />
                  een nieuw
                  <br />
                  recruitmentmodel.
                </span>
              </h2>
            }
          />
        </div>
      </section>

      {/* Section 14 — Manifest */}
      <StorySection className="py-28 sm:py-36 text-center">
        <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
          <InlineLogo height={14} className="opacity-80" /> vision
        </p>
        <div className="mx-auto mt-10 max-w-xl space-y-5 text-base font-medium leading-relaxed text-fk-navy/60 sm:text-lg">
          <p>Wij geloven dat talent wordt ontdekt door mensen.</p>
          <p>Wij geloven dat ieder netwerk kansen bevat.</p>
          <p>Wij geloven dat recruitment transparanter kan.</p>
          <p>
            Wij geloven dat mensen beloond mogen worden wanneer zij iemand
            verder helpen.
          </p>
          <p>
            Wij geloven dat technologie mensen moet verbinden.
            <br />
            Niet vervangen.
          </p>
        </div>
        <p className="mt-12 flex items-center justify-center gap-2 text-2xl font-bold tracking-[-0.02em] text-fk-navy sm:text-3xl">
          Dit is <InlineLogo height={26} className="sm:h-[32px]" />
        </p>
      </StorySection>

      {/* Section 15 — Close */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-28 text-center sm:py-36">
        <BrandLogo href={null} height={40} />
        <p className="mt-8 text-xl font-bold tracking-[-0.02em] text-fk-navy sm:text-2xl">
          Iedereen kent talent.
        </p>
        <p className="mt-2 text-base font-medium text-fk-navy/40 sm:text-lg">
          Maak daar iets mee.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/vacatures" className="landing-btn-primary group">
            Ontdek challenges
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          <Link href="/account-aanmaken" className="landing-btn-ghost">
            Maak een account
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
