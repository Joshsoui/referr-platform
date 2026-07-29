"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  introStatusLabel,
  type IntroStatus,
} from "@/lib/recruitment/portalMockData";
import { usePortalIntroductions } from "@/lib/recruitment/PortalIntroContext";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

function statusVariant(
  status: IntroStatus
): "default" | "success" | "warning" | "info" {
  if (status === "nieuw") return "info";
  if (status === "goedgekeurd") return "success";
  if (status === "afgewezen") return "warning";
  return "default";
}

export function IntroductionsTable() {
  const { introductions } = usePortalIntroductions();

  return (
    <section id="introducties">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <SectionLabel>Prioriteit</SectionLabel>
          <SectionTitle>Nieuwe introducties</SectionTitle>
        </div>
        <Link
          href="/recruitment/introducties/in-1"
          className="text-sm font-medium text-fk-navy/50 transition hover:text-fk-navy"
        >
          Alles bekijken
        </Link>
      </div>

      <MotionCard className="!p-0 overflow-hidden">
        <ul className="divide-y divide-fk-navy/[0.05]">
          {introductions.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-3 px-5 py-4 transition hover:bg-fk-light/40 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <Link href={item.href} className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-fk-navy">{item.candidateName}</p>
                  <Badge variant={statusVariant(item.status)}>
                    {introStatusLabel(item.status)}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-sm text-fk-navy/55">
                  {item.challengeTitle}
                </p>
                <p className="mt-0.5 text-xs text-fk-navy/40">
                  Via {item.referrerName} · {item.date}
                </p>
              </Link>
              <Button
                href={item.href}
                variant="outline"
                className="!rounded-lg !px-4 !py-2 text-xs sm:shrink-0"
              >
                Beoordelen
              </Button>
            </li>
          ))}
        </ul>
      </MotionCard>
    </section>
  );
}
