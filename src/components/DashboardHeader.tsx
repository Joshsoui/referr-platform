"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { getGreeting } from "@/lib/activityMoments";

interface DashboardHeaderProps {
  userName: string;
  xp?: number;
  sinceLastVisit?: string[];
  hasVisitedBefore?: boolean;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const firstName = userName.split(" ")[0];
  const greeting = getGreeting();

  return (
    <div className="mb-8">
      <FadeIn>
        <Card className="overflow-hidden border-fk-primary/15 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary-muted/40 p-5 sm:p-6">
          <h1 className="text-2xl font-bold tracking-tight text-fk-navy sm:text-3xl">
            {greeting}, {firstName}
          </h1>
          <p className="mt-1 text-base font-medium text-fk-navy/70">
            Wie kun jij vandaag verder helpen?
          </p>
          <p className="mt-2 max-w-xl text-sm text-fk-navy/50">
            Ontdek nieuwe challenges of bekijk de voortgang van je actieve
            introducties.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/vacatures"
              className="inline-flex items-center gap-2 rounded-xl brand-gradient-bg px-4 py-2.5 text-sm font-semibold text-fk-white shadow-sm transition hover:brightness-105"
            >
              Ontdek challenges
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/aandragen"
              className="inline-flex items-center gap-2 rounded-xl border border-fk-navy/10 bg-fk-white px-4 py-2.5 text-sm font-semibold text-fk-navy transition hover:border-fk-primary/20"
            >
              Bekijk mijn tips
            </Link>
          </div>
        </Card>
      </FadeIn>
    </div>
  );
}
