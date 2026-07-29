"use client";

import Link from "next/link";
import { Award, Crown, Layers } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { NetworkImpact } from "@/components/NetworkImpact";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { useScout } from "@/context/ScoutContext";
import {
  buildPersonalMoments,
  getNetworkImpact,
} from "@/lib/activityMoments";
import { CURRENT_USER } from "@/lib/mock-data";
import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { SCOUT_BADGES } from "@/lib/mockBadges";
import { getLevelForXp } from "@/lib/xp";

export default function LevelsPage() {
  const { xp, candidates, rewards } = useScout();
  const myReferrals = candidates.filter(
    (candidate) => candidate.referredBy === CURRENT_USER
  );
  const successfulHires = myReferrals.filter(
    (candidate) =>
      candidate.status === "geplaatst" ||
      candidate.status === "proeftijd_gehaald"
  );
  const earnedBadges = SCOUT_BADGES.filter((badge) => badge.earned);
  const currentLevel = getLevelForXp(xp);
  const currentDef = LEVEL_DEFINITIONS.find((l) => l.name === currentLevel.name);
  const impact = getNetworkImpact(myReferrals, rewards.cashEarned);
  const moments = buildPersonalMoments(myReferrals).slice(0, 6);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">
                Profiel
                <GradientText as="span" className="mt-1 block text-xl sm:text-2xl">
                  Jouw reputatie en track record
                </GradientText>
              </h1>
              <p className="text-fk-navy/60">
                Wat jouw introducties in beweging zetten — en wat je hebt bereikt
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <Card
            variant="highlight"
            className="mb-8 overflow-hidden border-0 p-0"
          >
            <div className="relative p-6 sm:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fk-white/10 blur-2xl" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 animate-pulse-glow items-center justify-center rounded-2xl border-2 border-fk-white/30 bg-fk-white/15 text-4xl backdrop-blur-sm">
                    {currentDef?.icon ?? "💎"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-fk-white/70">
                      Reputatie
                    </p>
                    <h2 className="text-2xl font-extrabold sm:text-3xl">
                      {currentLevel.name}
                    </h2>
                    <p className="mt-0.5 text-fk-white/80">{currentDef?.tagline}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:text-right">
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <Award size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xl font-extrabold tabular-nums">
                      {earnedBadges.length}
                    </p>
                    <p className="text-xs text-fk-white/70">Mijlpalen</p>
                  </div>
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <Crown size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xl font-extrabold tabular-nums">
                      {successfulHires.length}
                    </p>
                    <p className="text-xs text-fk-white/70">Plaatsingen</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={100}>
          <NetworkImpact impact={impact} />
        </FadeIn>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeIn delay={140}>
            <ActivityTimeline
              moments={moments}
              title="Recente momenten"
              subtitle="Voortgang op jouw introducties"
              emptyTitle="Nog geen track record"
              emptyBody="Zodra je iemand aandragen, zie je hier gesprekken, plaatsingen en beloningen."
            />
          </FadeIn>

          <FadeIn delay={180}>
            <Card className="border-fk-primary/15">
              <div className="mb-5 flex items-center gap-2">
                <Award size={18} className="text-fk-primary" />
                <div>
                  <h2 className="text-xl font-bold text-fk-navy">Mijlpalen</h2>
                  <p className="text-sm text-fk-navy/55">
                    Erkenning voor echte voortgang
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {earnedBadges.length === 0 ? (
                  <p className="rounded-xl border border-fk-primary/10 bg-fk-light/40 p-4 text-sm text-fk-navy/60">
                    Nog geen mijlpalen. Je eerste introductie is een goed begin.
                  </p>
                ) : (
                  earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="rounded-xl border border-fk-primary/10 bg-fk-light/40 p-4 transition-colors duration-300 hover:bg-fk-white"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fk-primary-muted text-xl">
                          {badge.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-fk-navy">{badge.name}</p>
                          <p className="mt-1 text-sm text-fk-navy/60">
                            {badge.description}
                          </p>
                          <p className="mt-2 text-sm text-fk-primary">
                            {badge.meaning}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={220}>
          <Card className="mb-8 border-fk-primary/15">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-fk-secondary">
              Reputatiepad
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LEVEL_DEFINITIONS.map((level) => {
                const active = level.name === currentLevel.name;
                return (
                  <div
                    key={level.id}
                    className={`rounded-xl border p-4 transition-all duration-300 ${
                      active
                        ? "border-fk-primary bg-fk-primary/5 shadow-sm"
                        : "border-fk-primary/10 bg-fk-white hover:border-fk-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fk-primary-muted text-lg">
                        {level.icon}
                      </div>
                      <div>
                        <p className="font-bold text-fk-navy">
                          {level.name}
                          {active && (
                            <span className="ml-2 text-xs font-semibold text-fk-primary">
                              Jij
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-fk-navy/60">{level.tagline}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </FadeIn>

        <p className="text-center text-sm text-fk-navy/55">
          Bekijk ook de{" "}
          <Link
            href="/leaderboard"
            className="font-semibold text-fk-primary hover:text-fk-navy"
          >
            ranglijst
          </Link>{" "}
          of leer meer over{" "}
          <Link
            href="/rewards"
            className="font-semibold text-fk-primary hover:text-fk-navy"
          >
            beloningen
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
