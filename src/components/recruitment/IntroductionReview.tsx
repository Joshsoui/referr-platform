"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Building2, Mail, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  introStatusLabel,
  type IntroStatus,
} from "@/lib/recruitment/portalMockData";
import { usePortalIntroductions } from "@/lib/recruitment/PortalIntroContext";
import { SectionLabel } from "./MotionCard";

function statusVariant(
  status: IntroStatus
): "default" | "success" | "warning" | "info" {
  if (status === "nieuw") return "info";
  if (status === "goedgekeurd") return "success";
  if (status === "afgewezen") return "warning";
  return "default";
}

export function IntroductionReview({ id }: { id: string }) {
  const router = useRouter();
  const { introductions, reviewIntroduction, getReview } = usePortalIntroductions();
  const base = introductions.find((item) => item.id === id);
  const existingReview = getReview(id);

  const [note, setNote] = useState(existingReview?.note ?? "");
  const [submitted, setSubmitted] = useState(!!existingReview);
  const [decision, setDecision] = useState<
    "goedgekeurd" | "afgewezen" | "meer_info" | null
  >(existingReview?.decision ?? null);

  if (!base) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-fk-navy/60">Introductie niet gevonden.</p>
        <Link href="/recruitment" className="mt-4 inline-block text-sm font-semibold text-fk-primary">
          Terug naar dashboard
        </Link>
      </div>
    );
  }

  const status = existingReview?.status ?? base.status;

  function handleSubmit(next: "goedgekeurd" | "afgewezen" | "meer_info") {
    reviewIntroduction(id, next, note.trim() || undefined);
    setDecision(next);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-fk-white">
      <div className="border-b border-fk-navy/[0.06] bg-fk-white">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/recruitment#introducties"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fk-navy/50 transition hover:text-fk-navy"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <SectionLabel>Introductie beoordelen</SectionLabel>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-fk-navy sm:text-3xl">
              {base.candidateName}
            </h1>
            <p className="mt-1 text-sm text-fk-navy/50">{base.challengeTitle}</p>
          </div>
          <Badge variant={statusVariant(status)}>{introStatusLabel(status)}</Badge>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-fk-navy/[0.06] bg-fk-light/30 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
              Kandidaat
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-fk-navy">
              <User size={15} className="text-fk-navy/35" />
              {base.candidateName}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-fk-navy/55">
              <Mail size={15} className="text-fk-navy/35" />
              {base.candidateEmail}
            </p>
            <p className="mt-3 text-sm text-fk-navy/60">{base.experience}</p>
          </div>

          <div className="rounded-xl border border-fk-navy/[0.06] bg-fk-light/30 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
              Challenge
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-fk-navy">
              <Building2 size={15} className="text-fk-navy/35" />
              {base.company}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-fk-navy/55">
              <MapPin size={15} className="text-fk-navy/35" />
              {base.location}
            </p>
            <p className="mt-3 text-sm text-fk-navy/60">
              Geïntroduceerd op {base.date}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-fk-navy/[0.06] bg-fk-white p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
            referrer
          </p>
          <p className="mt-2 text-sm font-medium text-fk-navy">
            {base.referrerName}
          </p>
          <p className="text-sm text-fk-navy/50">{base.referrerEmail}</p>
        </div>

        <div className="mt-4 rounded-xl border border-fk-navy/[0.06] bg-fk-white p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
            Motivatie referrer
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fk-navy/75">
            {base.motivation}
          </p>
        </div>

        {!submitted ? (
          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-fk-navy">
                Interne notitie (optioneel)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Bijv. sterke match op ervaring, intake inplannen…"
                className="mt-2 w-full resize-none rounded-xl border border-fk-navy/10 bg-fk-white px-3.5 py-2.5 text-sm text-fk-navy outline-none transition focus:border-fk-primary/40 focus:ring-2 focus:ring-fk-primary/10"
              />
            </label>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                onClick={() => handleSubmit("goedgekeurd")}
                className="!rounded-lg"
              >
                Goedkeuren
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit("meer_info")}
                className="!rounded-lg"
              >
                Meer info nodig
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleSubmit("afgewezen")}
                className="!rounded-lg"
              >
                Afkeuren
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-fk-navy/[0.06] bg-fk-light/40 p-5">
            <p className="text-sm font-semibold text-fk-navy">
              {decision === "goedgekeurd" && "Introductie goedgekeurd."}
              {decision === "afgewezen" && "Introductie afgekeurd."}
              {decision === "meer_info" && "Status bijgewerkt: meer informatie nodig."}
            </p>
            {note ? (
              <p className="mt-2 text-sm text-fk-navy/60">Notitie: {note}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button href="/recruitment#introducties" className="!rounded-lg">
                Terug naar dashboard
              </Button>
              {decision === "goedgekeurd" ? (
                <Button
                  variant="outline"
                  className="!rounded-lg"
                  onClick={() => router.push("/recruitment")}
                >
                  Volgende introductie
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
