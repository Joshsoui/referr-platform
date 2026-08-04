"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useScout } from "@/context/ScoutContext";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

export function AttentionList() {
  const { candidates, vacancies } = useScout();

  const items = useMemo(() => {
    return candidates
      .filter(
        (item) =>
          item.referralApproval === "pending" ||
          item.cashStatus === "intake_in_behandeling" ||
          item.cashStatus === "plaatsing_in_behandeling"
      )
      .slice(0, 6)
      .map((candidate) => {
        const vacancy = vacancies.find((item) => item.id === candidate.vacancyId);
        const detail =
          candidate.referralApproval === "pending"
            ? "Wacht op beoordeling"
            : "Uitbetaling in behandeling";
        return {
          id: candidate.id,
          name: candidate.name,
          challengeTitle: vacancy?.title ?? candidate.role,
          detail,
          href: `/recruitment/introducties/${candidate.id}`,
        };
      });
  }, [candidates, vacancies]);

  return (
    <section>
      <div className="mb-4">
        <SectionLabel>Aandacht</SectionLabel>
        <SectionTitle>Wat vraagt actie</SectionTitle>
      </div>
      <MotionCard className="!p-0 overflow-hidden">
        {items.length === 0 ? (
          <p className="px-5 py-4 text-sm text-fk-navy/55">Geen open aandachtspunten.</p>
        ) : (
          <ul className="divide-y divide-fk-navy/[0.05]">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-5 py-4 transition hover:bg-fk-light/40"
                >
                  <p className="font-medium text-fk-navy">{item.name}</p>
                  <p className="mt-0.5 text-sm text-fk-navy/55">{item.challengeTitle}</p>
                  <p className="mt-1 text-xs text-fk-navy/40">{item.detail}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </MotionCard>
    </section>
  );
}
