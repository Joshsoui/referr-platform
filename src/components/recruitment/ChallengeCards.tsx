"use client";

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  challengeStatusLabel,
  formatEuro,
  PORTAL_CHALLENGES,
  type PortalChallenge,
} from "@/lib/recruitment/portalMockData";
import { SectionLabel, SectionTitle, MotionCard } from "./MotionCard";

function statusVariant(
  status: PortalChallenge["status"]
): "default" | "success" | "warning" | "info" {
  if (status === "sluit_binnenkort") return "warning";
  if (status === "actief") return "info";
  return "default";
}

export function ChallengeCards() {
  return (
    <section>
      <div className="mb-4">
        <SectionLabel>Challenges</SectionLabel>
        <SectionTitle>Mijn actieve challenges</SectionTitle>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PORTAL_CHALLENGES.map((challenge) => (
          <MotionCard key={challenge.id} className="flex flex-col !p-5">
            <div className="flex items-start justify-between gap-2">
              <Badge variant={statusVariant(challenge.status)}>
                {challengeStatusLabel(challenge.status)}
              </Badge>
              <p className="text-sm font-medium text-fk-navy/70">
                {formatEuro(challenge.reward)}
              </p>
            </div>

            <h3 className="mt-3 text-lg font-bold leading-snug text-fk-navy">
              {challenge.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-fk-navy/55">
              {challenge.company}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-fk-navy/45">
              <MapPin size={14} className="shrink-0" />
              {challenge.location}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fk-navy/45">
              <span>
                <strong className="text-fk-navy">{challenge.introductions}</strong>{" "}
                introducties
              </span>
              <span>Laatste activiteit: {challenge.lastActivity}</span>
            </div>

            <div className="mt-5">
              <Button
                href={challenge.href}
                variant="outline"
                className="!w-full !rounded-lg !py-2.5 text-xs"
              >
                Open challenge
              </Button>
            </div>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
