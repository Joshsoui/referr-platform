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
import { ReferralLinkCard } from "@/components/ReferralLinkCard";
import { WkBonusBanner } from "@/components/WkBonusBanner";
import { XpProgressHero } from "@/components/XpProgressHero";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { CHALLENGES } from "@/lib/mockChallenges";
import { formatCurrency } from "@/lib/xp";

export default function DashboardPage() {
  const { currentUser, xp, xpPulse, stats, referralProfile } = useScout();
  const animatedCandidates = useAnimatedNumber(stats.candidatesReferred);
  const animatedPlacements = useAnimatedNumber(stats.successfulPlacements);
  const activeChallenges = CHALLENGES.filter((c) => c.status === "active").slice(
    0,
    3
  );

  const statCards = [
    {
      icon: Users,
      label: "Kandidaten aangedragen",
      value: animatedCandidates.toString(),
      delay: 200,
    },
    {
      icon: Target,
      label: "Succesvol geplaatst",
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
        <FadeIn delay={100}>
          <div className="mb-6">
            <p className="text-sm font-medium text-fk-navy/50">Welkom terug</p>
            <h1 className="mt-1 text-3xl font-extrabold text-fk-navy sm:text-4xl">
              {currentUser}
            </h1>
          </div>
        </FadeIn>

        <ReferralLinkCard profile={referralProfile} />

        <FadeIn delay={120}>
          <XpProgressHero xp={xp} xpPulse={xpPulse} />
        </FadeIn>

        <FadeIn delay={140}>
          <WkBonusBanner />
        </FadeIn>

        <FadeIn delay={160}>
          <Card
            variant="glass"
            className="mb-8 border-fk-primary/20"
            hover
          >
            <p className="text-center text-lg font-bold leading-snug text-fk-primary sm:text-xl">
              &ldquo;Wat als wij niet 5 recruiters hebben die zoeken, maar 500
              scouts die signaleren?&rdquo;
            </p>
          </Card>
        </FadeIn>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <FadeIn key={stat.label} delay={stat.delay}>
              <Card hover className="h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-fk-primary-muted text-fk-primary transition-transform duration-300 hover:scale-110">
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
                  Actieve Challenges
                </h2>
                <p className="text-sm text-fk-navy/55">
                  ⚽ WK Scout League 2026
                </p>
              </div>
              <Link
                href="/challenges"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-fk-primary transition-colors hover:text-fk-navy"
              >
                Bekijk alle challenges
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
            <BadgeGrid compact />
          </Card>
        </FadeIn>

        <FadeIn delay={560}>
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-fk-navy">
                Scout Activiteiten
              </h2>
              <p className="text-sm text-fk-navy/55">
                Live updates van de community
              </p>
            </div>
            <ActivityFeed limit={5} />
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
