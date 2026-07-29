"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Bookmark, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";

const COMPLETION_STEPS = [
  "Introduceer iemand",
  "Wij nemen contact op",
  "Volg de voortgang",
  "Kandidaat start",
  "Beloning wordt vrijgegeven",
];

export default function VacatureDetailPage() {
  const params = useParams();
  const vacancyId = params.id as string;
  const { vacancies } = useScout();
  const vacancy = vacancies.find((item) => item.id === vacancyId);

  if (!vacancy) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-lg font-semibold text-fk-navy">
          Challenge niet gevonden.
        </p>
        <Link href="/vacatures" className="mt-4 inline-block text-fk-primary">
          Terug naar challenges
        </Link>
      </div>
    );
  }

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
              Vind de volgende {vacancy.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-fk-navy/70">
              Ken jij iemand die past bij deze rol? Jouw missie: introduceer
              iemand die volgens jou het verschil kan maken.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-fk-navy/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {vacancy.location}
              </span>
              <span>32–40 uur</span>
              <span>{vacancy.sector}</span>
              <span className="font-semibold text-amber-700">
                Beloning: {formatCurrency(rewards.total)}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/aandragen?vacancy=${vacancy.id}`}>
                Ik ken iemand
              </Button>
              <Button href="/vacatures" variant="secondary">
                <Bookmark size={16} />
                Bewaar challenge
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
            <h2 className="mb-3 text-lg font-bold text-fk-navy">
              Over de functie
            </h2>
            <p className="text-sm leading-relaxed text-fk-navy/75">
              {vacancy.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-fk-light px-4 py-3">
                <p className="text-xs font-semibold uppercase text-fk-navy/45">
                  Locatie
                </p>
                <p className="mt-1 text-sm font-medium text-fk-navy">
                  {vacancy.location}
                </p>
              </div>
              <div className="rounded-xl bg-fk-light px-4 py-3">
                <p className="text-xs font-semibold uppercase text-fk-navy/45">
                  Vakgebied
                </p>
                <p className="mt-1 text-sm font-medium text-fk-navy">
                  {vacancy.sector}
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={110}>
          <Card className="mb-6 border-fk-primary/10">
            <h2 className="mb-4 text-lg font-bold text-fk-navy">
              Zo voltooi je deze challenge
            </h2>
            <ol className="space-y-3">
              {COMPLETION_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fk-primary/10 text-xs font-bold text-fk-primary">
                    {index + 1}
                  </span>
                  <span className="pt-1 font-medium text-fk-navy/80">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
        </FadeIn>

        <FadeIn delay={130}>
          <Card className="mb-6 border-amber-200/70 bg-gradient-to-br from-amber-50/80 via-fk-white to-fk-white">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800/70">
              Beloning bij succesvolle plaatsing
            </p>
            <p className="mt-2 text-3xl font-extrabold text-amber-800">
              {formatCurrency(rewards.total)}
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-fk-navy/65">
              Wordt beschikbaar nadat de kandidaat daadwerkelijk is gestart en
              aan de voorwaarden is voldaan. Dit is geen gegarandeerd bedrag
              zolang de challenge loopt.
            </p>
            <Link
              href="/voorwaarden"
              className="mt-3 inline-block text-sm font-semibold text-fk-primary hover:text-fk-navy"
            >
              Bekijk voorwaarden
            </Link>
          </Card>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-wrap gap-3">
            <Button href={`/aandragen?vacancy=${vacancy.id}`}>
              Ik ken iemand
            </Button>
            <Button href="/aandragen" variant="secondary">
              Mijn introducties
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
