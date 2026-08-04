"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Bookmark, MapPin, Share2 } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChallengeShareModal } from "@/components/challenges/ChallengeShareModal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import type { Vacancy } from "@/types/vacancy";

const COMPLETION_STEPS = [
  "Tip iemand",
  "Wij nemen contact op",
  "Volg de voortgang",
  "Kandidaat start",
  "Reward wordt vrijgegeven",
];

export function VacancyDetailClient({ vacancy }: { vacancy: Vacancy }) {
  const [shareOpen, setShareOpen] = useState(false);
  const rewards = getDifficultyRewards(vacancy.difficulty);
  const missionPoints = [
    `Past bij ${vacancy.sector.toLowerCase()}`,
    `Beschikbaar in of rond ${vacancy.location}`,
    vacancy.description.length > 120
      ? `${vacancy.description.slice(0, 110).trim()}…`
      : vacancy.description,
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link
            href="/vacatures"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fk-primary hover:text-fk-navy"
          >
            <ArrowLeft size={16} />
            Terug naar challenges
          </Link>

          <Card className="mb-6 border-fk-primary/15">
            <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
              Challenge
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-fk-navy">
              {vacancy.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-fk-navy/70">
              Ken jij iemand die past bij deze rol? Tip diegene direct en volg de
              voortgang in referr.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-fk-navy/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {vacancy.location}
              </span>
              <span>32–40 uur</span>
              <span>{vacancy.sector}</span>
              <span className="font-semibold text-amber-700">
                Reward: {formatCurrency(rewards.total)}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/aandragen?vacancy=${vacancy.id}`}>Tip iemand</Button>
              <Button variant="secondary" onClick={() => setShareOpen(true)}>
                <Share2 size={16} />
                Deel challenge
              </Button>
              <Button href="/vacatures" variant="secondary">
                <Bookmark size={16} />
                Meer challenges
              </Button>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={60}>
          <Card className="mb-6 border-fk-primary/10">
            <h2 className="text-lg font-bold text-fk-navy">Jouw missie</h2>
            <p className="mt-1 text-sm text-fk-navy/55">
              Wie in jouw netwerk past bij deze rol?
            </p>
            <ul className="mt-4 space-y-2.5">
              {missionPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-fk-navy/75"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fk-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>

        <FadeIn delay={90}>
          <Card className="mb-6 border-fk-primary/10">
            <h2 className="mb-3 text-lg font-bold text-fk-navy">Over de functie</h2>
            <p className="text-sm leading-relaxed text-fk-navy/75">{vacancy.description}</p>
          </Card>
        </FadeIn>

        <FadeIn delay={110}>
          <Card className="mb-6 border-fk-primary/10">
            <h2 className="mb-4 text-lg font-bold text-fk-navy">
              Zo werkt deze challenge
            </h2>
            <ol className="space-y-3">
              {COMPLETION_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fk-primary/10 text-xs font-bold text-fk-primary">
                    {index + 1}
                  </span>
                  <span className="pt-1 font-medium text-fk-navy/80">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </FadeIn>
      </div>
      <ChallengeShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        vacancy={vacancy}
      />
    </div>
  );
}
