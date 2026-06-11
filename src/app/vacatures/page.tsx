"use client";

import { Briefcase } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { VacancyCard } from "@/components/VacancyCard";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { useScout } from "@/context/ScoutContext";

export default function VacaturesPage() {
  const { vacancies } = useScout();
  const openVacancies = vacancies.filter((vacancy) => vacancy.status === "open");

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <Briefcase size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">
                Vacatures
                <GradientText
                  as="span"
                  className="mt-1 block text-xl sm:text-2xl"
                >
                  Hoe hoger de difficulty, hoe hoger de beloning.
                </GradientText>
              </h1>
              <p className="text-fk-navy/60">
                Openstaande rollen — beloning hangt af van difficulty
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <Card className="mb-8 border-fk-primary/15 bg-fk-primary-muted/30 px-4 py-3 text-sm text-fk-navy/70">
            🟢 Easy · 🟣 Hard · 🔴 Expert — hoe hoger de difficulty, hoe hoger
            Match Reward en Keeper Bonus.
          </Card>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {openVacancies.map((vacancy, index) => (
            <FadeIn key={vacancy.id} delay={80 + index * 60}>
              <VacancyCard vacancy={vacancy} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
