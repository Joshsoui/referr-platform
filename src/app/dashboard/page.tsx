"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FadeIn } from "@/components/animations/FadeIn";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ChallengeCard } from "@/components/VacancyCard";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { CURRENT_USER } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/xp";
import type { Candidate } from "@/types";

const LAST_VISIT_KEY = "referr-last-visit";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { currentUser, rewards, candidates, vacancies } = useScout();

  const displayName = session?.user?.firstName
    ? `${session.user.firstName} ${session.user.lastName ?? ""}`.trim()
    : currentUser;

  useEffect(() => {
    window.localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
  }, []);

  const myReferrals = candidates.filter((c) => c.referredBy === CURRENT_USER);
  const openVacancies = vacancies.filter((v) => v.status === "open");
  const successfulMatches = myReferrals.filter(
    (candidate) =>
      candidate.status === "geplaatst" || candidate.status === "proeftijd_gehaald"
  ).length;
  const personalStats = [
    { label: "Aantal tips", value: String(myReferrals.length) },
    { label: "Succesvolle matches", value: String(successfulMatches) },
    { label: "Totaal verdiend", value: formatCurrency(rewards.cashEarned) },
  ];

  const greetingSummary =
    openVacancies.length > 0
      ? `Er zijn ${openVacancies.length} challenges die je nu kunt delen.`
      : "Er staan nu even geen nieuwe challenges open.";

  const statusLabelMap: Record<Candidate["status"], string> = {
    nieuw: "Tip ontvangen",
    intake_gepland: "Wordt bekeken",
    voorgesteld: "In gesprek",
    geplaatst: "Aangenomen",
    proeftijd_gehaald: "Uitbetaald",
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <DashboardHeader userName={displayName} />

        {session?.user && !session.user.emailVerifiedAt && (
          <Card className="mb-6 border-amber-200 bg-amber-50/50 p-4">
            <p className="text-sm text-amber-950">
              Bevestig je e-mailadres om alle accountfuncties te gebruiken.{" "}
              <Link
                href="/email-bevestigen"
                className="font-semibold text-fk-primary underline"
              >
                Naar bevestiging
              </Link>
            </p>
          </Card>
        )}

        <FadeIn delay={40}>
          <Card className="mb-8 border-fk-primary/15">
            <h2 className="text-2xl font-bold text-fk-navy">
              {displayName.split(" ")[0]}, wat wil je nu doen?
            </h2>
            <p className="mt-2 text-sm text-fk-navy/65">{greetingSummary}</p>
            <Link
              href="/vacatures"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-fk-primary px-4 py-2.5 text-sm font-semibold text-fk-white"
            >
              Bekijk challenges
              <ArrowRight size={14} />
            </Link>
          </Card>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-fk-navy">
                Challenges voor jou
              </h2>
              <p className="mt-1 text-sm text-fk-navy/50">
                Kort overzicht van nieuwe en relevante challenges.
              </p>
            </div>
            <Link
              href="/vacatures"
              className="hidden text-sm font-semibold text-fk-primary sm:inline"
            >
              Alles bekijken
            </Link>
          </div>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {openVacancies.slice(0, 3).map((vacancy) => {
              const intros = candidates.filter(
                (c) => c.vacancyId === vacancy.id
              ).length;
              return (
                <ChallengeCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  mission={vacancy.description}
                  hours="32–40 uur"
                  activeIntroductions={intros > 0 ? intros : undefined}
                />
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <Card className="mb-6 border-fk-primary/12">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-fk-navy">Mijn referrals</h2>
              <Link href="/aandragen" className="text-sm font-semibold text-fk-primary">
                Alles bekijken
              </Link>
            </div>
            {myReferrals.length === 0 ? (
              <div className="rounded-xl border border-fk-primary/12 bg-fk-light/30 p-4">
                <p className="text-sm text-fk-navy/70">
                  Je hebt nog niemand getipt. Bekijk een challenge en denk aan
                  iemand uit je netwerk.
                </p>
                <Link
                  href="/vacatures"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-fk-primary"
                >
                  Bekijk challenges
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myReferrals.slice(0, 5).map((referral) => {
                  const vacancy = vacancies.find((item) => item.id === referral.vacancyId);
                  const status = statusLabelMap[referral.status];
                  return (
                    <div
                      key={referral.id}
                      className="rounded-xl border border-fk-primary/12 px-4 py-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-fk-navy">{referral.name}</p>
                        <span className="rounded-full bg-fk-primary-muted/60 px-2.5 py-0.5 text-xs font-semibold text-fk-primary">
                          {status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-fk-navy/60">
                        {vacancy?.title ?? "Challenge"} · update{" "}
                        {new Date(referral.createdAt).toLocaleDateString("nl-NL")}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="grid gap-3 sm:grid-cols-3">
            {personalStats.map((item) => (
              <Card key={item.label} className="border-fk-primary/10 px-4 py-3.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-bold tracking-tight text-fk-navy">
                  {item.value}
                </p>
              </Card>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
