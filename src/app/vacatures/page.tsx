"use client";

import { useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChallengeCard } from "@/components/VacancyCard";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { CURRENT_USER } from "@/lib/mock-data";

export default function VacaturesPage() {
  const { vacancies, candidates } = useScout();
  const [sector, setSector] = useState("");
  const [region, setRegion] = useState("");

  const openVacancies = vacancies
    .filter((vacancy) => vacancy.status === "open")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const sectors = useMemo(
    () => [...new Set(openVacancies.map((v) => v.sector))].sort(),
    [openVacancies]
  );
  const regions = useMemo(
    () => [...new Set(openVacancies.map((v) => v.location))].sort(),
    [openVacancies]
  );

  const filtered = openVacancies.filter((v) => {
    if (sector && v.sector !== sector) return false;
    if (region && v.location !== region) return false;
    return true;
  });

  const mySectors = new Set(
    candidates
      .filter((c) => c.referredBy === CURRENT_USER)
      .map((c) => c.sector)
  );

  const newestIds = new Set(openVacancies.slice(0, 2).map((v) => v.id));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl brand-gradient-bg text-fk-white shadow-md">
              <Compass size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-fk-navy">
                Ontdek challenges
              </h1>
              <p className="mt-1 font-medium text-fk-navy/55">
                Misschien ken jij precies de persoon die hier het verschil kan
                maken.
              </p>
              <p className="mt-1 text-sm text-fk-navy/45">
                {filtered.length} open
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={40}>
          <Card className="mb-8 border-fk-primary/10 p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                  Vakgebied
                </span>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-xl border border-fk-primary/15 bg-fk-light px-3 py-2.5 text-sm outline-none focus:border-fk-primary"
                >
                  <option value="">Alle</option>
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                  Regio
                </span>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full rounded-xl border border-fk-primary/15 bg-fk-light px-3 py-2.5 text-sm outline-none focus:border-fk-primary"
                >
                  <option value="">Alle</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <div className="rounded-xl border border-fk-primary/10 bg-fk-light/60 px-3 py-2.5 sm:col-span-2 lg:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                  Tip
                </p>
                <p className="mt-1 text-sm text-fk-navy/65">
                  Elke challenge is gekoppeld aan een echte rol. Jij introduceert
                  iemand — je solliciteert niet zelf.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>

        {filtered.length === 0 ? (
          <FadeIn delay={80}>
            <Card className="border-fk-primary/15 py-12 text-center">
              <Compass size={28} className="mx-auto mb-3 text-fk-primary" />
              <h2 className="text-lg font-bold text-fk-navy">
                Geen challenges gevonden
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-fk-navy/60">
                Pas je filters aan of kom later terug voor nieuwe challenges.
              </p>
            </Card>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((vacancy, index) => {
              const intros = candidates.filter(
                (c) => c.vacancyId === vacancy.id
              ).length;
              return (
                <FadeIn key={vacancy.id} delay={80 + index * 40}>
                  <ChallengeCard
                    vacancy={vacancy}
                    label={
                      newestIds.has(vacancy.id)
                        ? "Nieuwe challenge"
                        : mySectors.has(vacancy.sector)
                          ? "Populair"
                          : "Nieuwe challenge"
                    }
                    mission={vacancy.description}
                    hours="32–40 uur"
                    activeIntroductions={intros > 0 ? intros : undefined}
                  />
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
