"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin, Share2 } from "lucide-react";
import { ChallengeShareModal } from "@/components/challenges/ChallengeShareModal";
import { Card } from "@/components/ui/Card";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import type { Vacancy } from "@/types/vacancy";

interface ChallengeCardProps {
  vacancy: Vacancy;
  label?: "Nieuwe challenge" | "Populair" | "Sluit binnenkort";
  mission?: string;
  hours?: string;
  activeIntroductions?: number;
  daysLeft?: number;
}

export function ChallengeCard({
  vacancy,
  label = "Nieuwe challenge",
  mission,
  hours,
  activeIntroductions,
  daysLeft,
}: ChallengeCardProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const rewards = getDifficultyRewards(vacancy.difficulty);
  const missionText =
    mission ??
    `Vind iemand die past bij ${vacancy.title.toLowerCase()}.`;

  return (
    <Card
      hover
      className="flex h-full flex-col border-fk-primary/10 transition-all duration-300"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-fk-primary-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fk-primary">
          {label}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
          {vacancy.sector}
        </span>
      </div>

      <h3 className="text-lg font-bold text-fk-navy">{vacancy.title}</h3>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-fk-navy/55">
        <MapPin size={14} className="shrink-0" />
        {vacancy.location}
        {hours ? ` · ${hours}` : ""}
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-fk-navy/70">
        <span className="font-semibold text-fk-navy">Jouw missie: </span>
        {missionText}
      </p>

      <div className="mt-4 rounded-xl bg-fk-light px-3 py-2.5 text-sm">
        <p className="text-xs font-semibold uppercase text-fk-navy/45">
          Beloning
        </p>
        <p className="mt-0.5 text-base font-extrabold text-amber-700">
          {formatCurrency(rewards.total)}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-fk-navy/50">
          {typeof daysLeft === "number" ? (
            <span>Nog {daysLeft} dagen</span>
          ) : null}
          {typeof activeIntroductions === "number" &&
          activeIntroductions > 0 ? (
            <span>{activeIntroductions} introducties actief</span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/aandragen?vacancy=${vacancy.id}`}
          className="inline-flex items-center gap-1 rounded-lg bg-fk-primary px-3 py-2 text-sm font-semibold text-fk-white transition hover:brightness-105"
        >
          Tip iemand
        </Link>
        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="inline-flex items-center gap-1 rounded-lg border border-fk-primary/20 px-3 py-2 text-sm font-semibold text-fk-navy transition hover:border-fk-primary/35"
        >
          <Share2 size={14} />
          Deel challenge
        </button>
        <Link
          href={`/vacatures/${vacancy.id}`}
          className="inline-flex items-center gap-1 px-1 py-2 text-sm font-semibold text-fk-primary hover:text-fk-navy"
        >
          Bekijk
          <ArrowRight size={14} />
        </Link>
      </div>
      <ChallengeShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        vacancy={vacancy}
      />
    </Card>
  );
}

/** @deprecated Prefer ChallengeCard — kept for admin/compat */
export function VacancyCard({
  vacancy,
  isNew = false,
  matchesNetwork = false,
}: {
  vacancy: Vacancy;
  isNew?: boolean;
  matchesNetwork?: boolean;
}) {
  return (
    <ChallengeCard
      vacancy={vacancy}
      label={isNew ? "Nieuwe challenge" : matchesNetwork ? "Populair" : "Nieuwe challenge"}
      mission={vacancy.description}
    />
  );
}

export function VacancyCardCompact({
  vacancy,
}: {
  vacancy: Vacancy;
  isNew?: boolean;
  matchesNetwork?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-medium text-fk-navy">{vacancy.title}</span>
      <span className="text-xs font-semibold text-fk-primary">Challenge</span>
    </div>
  );
}
