"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { HeroScrollStory } from "@/components/landing/HeroScrollStory";
import { ChallengeCard } from "@/components/VacancyCard";
import { INITIAL_VACANCIES } from "@/lib/mockVacancies";

const landingChallenges = INITIAL_VACANCIES.filter((v) => v.status === "open").slice(
  0,
  4
);

function InlineReferrLogo({ height = 14 }: { height?: number }) {
  return (
    <Image
      src="/brand/referr-logo.png"
      alt="referr"
      height={height}
      width={Math.round(height * 3.75)}
      className="brand-logo-mark inline-block w-auto object-contain object-left"
      style={{ height: `${height}px`, width: "auto" }}
    />
  );
}

export function LandingExperience() {
  return (
    <div className="landing-surface overflow-x-hidden">
      <HeroScrollStory />

      <HowItWorks />

      <section className="px-4 pb-20 pt-4 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
                Actuele challenges
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-fk-navy sm:text-4xl">
                Misschien ken jij precies de juiste persoon
              </h2>
              <p className="mt-3 text-base font-medium text-fk-navy/45 sm:text-lg">
                Elke challenge is een echte vacature. Introduceer de juiste
                persoon en ontvang direct een beloning bij plaatsing.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5">
            {landingChallenges.map((vacancy, index) => (
              <Reveal key={vacancy.id} delay={index * 80}>
                <ChallengeCard
                  vacancy={vacancy}
                  label={index === 0 ? "Nieuwe challenge" : "Populair"}
                  mission={vacancy.description}
                  hours="32–40 uur"
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <Link href="/vacatures" className="landing-btn-primary group inline-flex">
                Ontdek alle challenges
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-fk-navy px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <div className="landing-dark-glow landing-dark-glow--cta" aria-hidden />
        <Reveal>
          <h2 className="relative text-3xl font-bold tracking-[-0.04em] text-fk-white sm:text-5xl">
            Wie ken jij?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base font-medium text-white/45 sm:text-lg">
            Ontdek challenges of maak je account aan.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/vacatures" className="landing-btn-on-dark group">
              Ontdek challenges
              <ArrowRight
                size={16}
                className="ml-1 inline transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/account-aanmaken"
              className="landing-btn-on-dark-ghost"
            >
              Maak account aan
            </Link>
          </div>
          <div className="relative mt-6 flex justify-center">
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            >
              <InlineReferrLogo height={15} />
              <span className="tracking-wide">vision</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
