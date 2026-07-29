"use client";

import { Crown, Medal, Sparkles, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { useScout } from "@/context/ScoutContext";
import { formatCurrency } from "@/lib/xp";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import type { Scout } from "@/types";

const PODIUM_CONFIG = [
  { visualOrder: 1, rank: 2, height: "h-32 sm:h-36", delay: "0.12s", medal: "🥈" },
  { visualOrder: 0, rank: 1, height: "h-40 sm:h-48", delay: "0s", medal: "🥇" },
  { visualOrder: 2, rank: 3, height: "h-28 sm:h-32", delay: "0.2s", medal: "🥉" },
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <Crown
        size={18}
        className="animate-crown-shine text-amber-500 drop-shadow-sm"
      />
    );
  if (rank === 2) return <Medal size={18} className="text-slate-400" />;
  if (rank === 3) return <Medal size={18} className="text-amber-700" />;
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center text-xs font-bold text-fk-navy/40">
      {rank}
    </span>
  );
}

function ScoutRow({
  scout,
  index,
  pulseRank,
  gapToNext,
}: {
  scout: Scout;
  index: number;
  pulseRank: boolean;
  gapToNext: number | null;
}) {
  const animatedReward = useAnimatedNumber(scout.reward, 600);

  return (
    <tr
      className={`animate-tab-content-in border-b border-fk-primary/5 transition-all duration-300 ${
        scout.isCurrentUser
          ? "bg-fk-primary/10 font-semibold shadow-inner"
          : "hover:bg-fk-light/50"
      } ${scout.isCurrentUser && pulseRank ? "animate-rank-bounce" : ""}`}
      style={{ animationDelay: `${index * 70 + 120}ms` }}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <RankIcon rank={scout.rank} />
          <span>{scout.rank}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              scout.isCurrentUser
                ? "bg-fk-primary text-fk-white"
                : "bg-fk-primary-muted text-fk-primary"
            }`}
          >
            {getInitials(scout.name)}
          </div>
          <div>
            <span className="text-fk-navy">{scout.name}</span>
            {scout.isCurrentUser && (
              <span className="ml-2 inline-block rounded-full bg-fk-primary px-2 py-0.5 text-xs font-bold text-fk-white">
                Jij
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-fk-navy/70">{scout.placements}</td>
      <td className="px-6 py-4 text-fk-navy/70">
        {formatCurrency(animatedReward)}
      </td>
      <td className="px-6 py-4 text-fk-navy/70">
        {gapToNext === null ? "Leider" : `${gapToNext} plaatsing${gapToNext === 1 ? "" : "en"}`}
      </td>
    </tr>
  );
}

function PodiumCard({
  scout,
  config,
}: {
  scout: Scout;
  config: (typeof PODIUM_CONFIG)[number];
}) {
  const animatedReward = useAnimatedNumber(scout.reward, 800);
  const isFirst = scout.rank === 1;

  return (
    <div
      className={`animate-podium-rise flex flex-col items-center ${
        config.visualOrder === 0 ? "order-0 sm:order-1" : config.visualOrder === 1 ? "order-1" : "order-2"
      }`}
      style={{ animationDelay: config.delay }}
    >
      <div
        className={`relative w-full ${config.height} flex flex-col items-center justify-end overflow-hidden rounded-2xl border border-fk-primary/10 bg-gradient-to-t from-fk-primary/20 via-fk-white to-fk-white p-4 card-hover ${
          scout.isCurrentUser ? "ring-2 ring-fk-primary" : ""
        } ${isFirst ? "animate-pulse-glow shadow-lg" : "shadow-md"}`}
      >
        {isFirst && (
          <Sparkles
            size={16}
            className="absolute right-3 top-3 text-amber-400 opacity-80"
          />
        )}
        <span className="mb-2 text-2xl" aria-hidden>
          {config.medal}
        </span>
        <div
          className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full text-sm font-extrabold ${
            isFirst
              ? "bg-gradient-to-br from-amber-400 to-amber-600 text-fk-white"
              : "bg-fk-primary-muted text-fk-primary"
          }`}
        >
          {getInitials(scout.name)}
        </div>
        <p className="truncate text-center text-sm font-bold text-fk-navy">
          {scout.name.split(" ")[0]}
        </p>
        <p className="mt-0.5 text-xs font-bold text-fk-primary tabular-nums">
          {scout.placements} plaatsingen
        </p>
        <p className="mt-1 text-xs text-fk-navy/55">
          {formatCurrency(animatedReward)}
        </p>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-fk-navy/45">
        #{scout.rank}
      </p>
    </div>
  );
}

export default function LeaderboardPage() {
  const { leaderboard: liveLeaderboard, xpPulse } = useScout();
  const leaderboard = liveLeaderboard;
  const currentUserEntry = leaderboard.find((s) => s.isCurrentUser);
  const nextPosition =
    currentUserEntry && currentUserEntry.rank > 1
      ? leaderboard.find((s) => s.rank === currentUserEntry.rank - 1)
      : null;
  const gapToNext =
    currentUserEntry && nextPosition
      ? Math.max(0, nextPosition.placements - currentUserEntry.placements)
      : null;

  const prevRank = useRef(
    leaderboard.find((s) => s.isCurrentUser)?.rank ?? 7
  );
  const currentRank =
    leaderboard.find((s) => s.isCurrentUser)?.rank ?? 7;
  const rankChanged = currentRank !== prevRank.current;

  useEffect(() => {
    prevRank.current = currentRank;
  }, [currentRank, xpPulse]);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <Trophy size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">
                Ranglijst
                <GradientText as="span" className="mt-1 block text-xl sm:text-2xl">
                  Wie zet de meeste plaatsingen om?
                </GradientText>
              </h1>
              <p className="text-fk-navy/60">
                Eén overzicht van positie, plaatsingen en verdiende beloningen.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={50}>
          <p className="mb-6 rounded-xl border border-fk-primary/10 bg-fk-primary-muted px-4 py-3 text-sm font-medium text-fk-navy/70">
            <span className="font-semibold text-fk-navy">Wat beweegt er:</span>{" "}
            {currentUserEntry
              ? gapToNext === null
                ? "Jij staat bovenaan — behoud je plek met nieuwe plaatsingen."
                : `Nog ${gapToNext} plaatsing${gapToNext === 1 ? "" : "en"} tot plek #${currentUserEntry.rank - 1}.`
              : "De ranglijst draait om succesvolle plaatsingen en verdiende beloningen."}
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-6 grid grid-cols-3 items-end gap-3 sm:gap-4">
            {PODIUM_CONFIG.map((config) => {
              const scout = leaderboard.find((s) => s.rank === config.rank);
              if (!scout) return null;
              return (
                <PodiumCard key={scout.name} scout={scout} config={config} />
              );
            })}
          </div>
        </FadeIn>

        {currentUserEntry && (
          <FadeIn delay={150}>
            <Card className="mb-6 border-fk-primary/25 bg-gradient-to-r from-fk-primary/10 to-fk-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-fk-primary text-sm font-bold text-fk-white">
                    {getInitials(currentUserEntry.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-fk-navy/55">
                      Jouw positie
                    </p>
                    <p className="font-extrabold text-fk-navy">
                      #{currentUserEntry.rank} · {currentUserEntry.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-extrabold text-fk-primary tabular-nums">
                    {currentUserEntry.placements} plaatsingen
                  </p>
                  <p className="text-xs text-fk-navy/50">
                    {gapToNext === null
                      ? "Jij staat bovenaan"
                      : `${gapToNext} plaatsing${gapToNext === 1 ? "" : "en"} tot de volgende plek`}
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        )}

        <FadeIn delay={200}>
          <Card className="overflow-hidden p-0">
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-fk-primary/10 bg-fk-light">
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">#</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Naam</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Plaatsingen</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Beloning</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Tot volgende</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((scout, i) => {
                    const nextScout =
                      scout.rank > 1
                        ? leaderboard.find((entry) => entry.rank === scout.rank - 1)
                        : null;
                    const nextGap = nextScout
                      ? Math.max(0, nextScout.placements - scout.placements)
                      : null;

                    return (
                      <ScoutRow
                        key={scout.name}
                        scout={scout}
                        index={i}
                        pulseRank={!!scout.isCurrentUser && rankChanged}
                        gapToNext={nextGap}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-fk-primary/10 sm:hidden">
              {leaderboard.map((scout, i) => {
                const nextScout =
                  scout.rank > 1
                    ? leaderboard.find((entry) => entry.rank === scout.rank - 1)
                    : null;
                const nextGap = nextScout
                  ? Math.max(0, nextScout.placements - scout.placements)
                  : null;

                return (
                  <div
                    key={`${scout.name}-mobile`}
                    className={`animate-tab-content-in p-4 ${
                      scout.isCurrentUser ? "bg-fk-primary/10" : ""
                    }`}
                    style={{ animationDelay: `${i * 70 + 120}ms` }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RankIcon rank={scout.rank} />
                        <span className="font-bold text-fk-navy">{scout.name}</span>
                        {scout.isCurrentUser && (
                          <span className="rounded-full bg-fk-primary px-2 py-0.5 text-xs font-bold text-fk-white">
                            Jij
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-fk-primary">
                        {scout.placements} plaatsingen
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-fk-navy/60">
                      <span>{formatCurrency(scout.reward)}</span>
                      <span>
                        {nextGap === null
                          ? "Leider"
                          : `${nextGap} plaatsing${nextGap === 1 ? "" : "en"} tot volgende`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-8 text-center text-sm text-fk-navy/55">
            Topbijdragers blijven zichtbaar bij de{" "}
            <a
              href="/hall-of-fame"
              className="font-semibold text-fk-primary hover:text-fk-navy"
            >
              Community Champions
            </a>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
