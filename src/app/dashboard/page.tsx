"use client";

import {
  ArrowRight,
  Euro,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { ActivityFeed } from "@/components/ActivityFeed";
import { BadgeGrid } from "@/components/BadgeGrid";
import { ChallengeCard } from "@/components/ChallengeCard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { EcosystemWidget } from "@/components/EcosystemWidget";
import { ReferralLinkCard } from "@/components/ReferralLinkCard";
import { RewardsWidget } from "@/components/RewardsWidget";
import { ScoutConfidenceScore } from "@/components/ScoutConfidenceScore";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { CURRENT_USER } from "@/lib/mock-data";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { getActiveMissions } from "@/lib/missions";
import { formatCurrency, KEEPER_STATUS } from "@/lib/xp";

export default function DashboardPage() {
  const {
    currentUser,
    xp,
    xpPulse,
    stats,
    referralProfile,
    rewards,
    scoutScore,
    candidates,
    challenges,
  } = useScout();
  const animatedCandidates = useAnimatedNumber(stats.candidatesReferred);
  const animatedPlacements = useAnimatedNumber(stats.successfulPlacements);
  const activeChallenges = getActiveMissions(challenges).slice(0, 3);
  const recentReferrals = candidates
    .filter((c) => c.referredBy === CURRENT_USER)
    .slice(0, 4);

  const statCards = [
    {
      icon: Users,
      label: "Talenten getipt",
      value: animatedCandidates.toString(),
      delay: 200,
    },
    {
      icon: Target,
      label: "Succesvolle matches",
      value: animatedPlacements.toString(),
      delay: 280,
    },
    {
      icon: Euro,
      label: "Verdiende beloning",
      value: formatCurrency(stats.totalReward),
      delay: 360,
    },
    {
      icon: Trophy,
      label: `Ranking ${stats.region}`,
      value: `#${stats.regionRank}`,
      delay: 440,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader
          userName={currentUser}
          xp={xp}
          scoutScore={scoutScore}
          regionRank={stats.regionRank}
          region={stats.region}
          xpPulse={xpPulse}
        />

        <FadeIn delay={120}>
          <EcosystemWidget xp={xp} scoutScore={scoutScore} rewards={rewards} />
        </FadeIn>

        <FadeIn delay={140}>
          <RewardsWidget xp={xp} rewards={rewards} />
        </FadeIn>

        <ReferralLinkCard profile={referralProfile} />

        {recentReferrals.length > 0 && (
          <FadeIn delay={200}>
            <Card className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-fk-navy">
                Recente talenttips
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {recentReferrals.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-3 rounded-xl border border-fk-primary/10 bg-fk-light/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-fk-navy">{c.name}</p>
                      <p className="text-sm text-fk-navy/55">
                        {c.sector} · {c.xpAwarded} XP
                      </p>
                    </div>
                    <ScoutConfidenceScore score={c.confidenceScore} size="sm" showBar={false} />
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        )}

        <FadeIn delay={140}>
          <Card className="mb-8 overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-fk-white to-amber-50/30">
            <div className="p-6 sm:p-8">
              <p className="text-xl font-extrabold text-fk-navy sm:text-2xl">
                {KEEPER_STATUS.title}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fk-navy/70">
                {KEEPER_STATUS.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-fk-primary px-3 py-1 text-sm font-bold text-fk-white">
                  +{KEEPER_STATUS.xpReward} XP
                </span>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-bold text-fk-white">
                  +{formatCurrency(KEEPER_STATUS.cashReward)}
                </span>
              </div>
            </div>
          </Card>
        </FadeIn>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <FadeIn key={stat.label} delay={stat.delay}>
              <Card
                hover
                className="group h-full border-fk-primary/10 transition-all duration-300 hover:border-fk-primary/25 hover:shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fk-primary/15 to-fk-secondary/10 text-fk-primary transition-transform duration-300 group-hover:scale-110">
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-extrabold text-fk-navy tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-fk-navy/55">{stat.label}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={480}>
          <Card className="mb-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-fk-navy">
                  Finderz Missions
                </h2>
                <p className="text-sm text-fk-navy/55">
                  ⚽ WK Finderz Mission 2026
                </p>
              </div>
              <Link
                href="/challenges"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-fk-primary transition-colors hover:text-fk-navy"
              >
                Bekijk alle missions
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  compact
                />
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={520}>
          <Card className="mb-8">
            <BadgeGrid detailed />
          </Card>
        </FadeIn>

        <FadeIn delay={560}>
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-fk-navy">
                Finderz Activiteiten
              </h2>
              <p className="text-sm text-fk-navy/55">
                Live updates uit het Finderz Network
              </p>
            </div>
            <ActivityFeed limit={5} />
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
