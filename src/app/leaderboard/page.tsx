"use client";

import { Crown, Medal, Sparkles, Trophy, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useScout } from "@/context/ScoutContext";
import {
  LEADERBOARD_MONTHLY,
  LEADERBOARD_WK_LEAGUE,
} from "@/lib/mock-data";
import { formatCurrency, getLevelForXp } from "@/lib/xp";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import type { LeaderboardTab } from "@/types/gamification";
import type { Scout } from "@/types";

const TABS: { id: LeaderboardTab; label: string }[] = [
  { id: "month", label: "Deze maand" },
  { id: "wk-league", label: "WK Finderz League" },
  { id: "all-time", label: "All-time" },
];

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
  maxXp,
}: {
  scout: Scout;
  index: number;
  pulseRank: boolean;
  maxXp: number;
}) {
  const animatedXp = useAnimatedNumber(scout.xp, 600);
  const xpShare = maxXp > 0 ? Math.round((scout.xp / maxXp) * 100) : 0;

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
            <p className="text-xs text-fk-primary">{getLevelForXp(scout.xp).name}</p>
            {scout.isCurrentUser && (
              <span className="ml-2 rounded-full bg-fk-primary px-2 py-0.5 text-xs font-bold text-fk-white">
                Jij
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="min-w-[140px]">
          <span className="mb-1.5 inline-flex items-center gap-1 font-bold text-fk-primary tabular-nums">
            <Zap size={14} className="text-fk-secondary" />
            {animatedXp.toLocaleString("nl-NL")} XP
          </span>
          <ProgressBar progress={xpShare} animated={false} />
        </div>
      </td>
      <td className="px-6 py-4 text-fk-navy/70">{scout.placements}</td>
      <td className="px-6 py-4 text-fk-navy/70">{scout.keepers ?? 0}</td>
      <td className="px-6 py-4 text-fk-navy/70">
        {formatCurrency(scout.reward)}
      </td>
    </tr>
  );
}

function PodiumCard({
  scout,
  config,
  maxXp,
}: {
  scout: Scout;
  config: (typeof PODIUM_CONFIG)[number];
  maxXp: number;
}) {
  const animatedXp = useAnimatedNumber(scout.xp, 800);
  const xpShare = maxXp > 0 ? Math.round((scout.xp / maxXp) * 100) : 0;
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
          {animatedXp.toLocaleString("nl-NL")} XP
        </p>
        <div className="mt-2 w-full px-1">
          <ProgressBar progress={xpShare} animated={false} />
        </div>
      </div>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-fk-navy/45">
        #{scout.rank}
      </p>
    </div>
  );
}

export default function LeaderboardPage() {
  const { leaderboard: liveLeaderboard, xpPulse } = useScout();
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("all-time");
  const [tabKey, setTabKey] = useState(0);

  const leaderboard: Scout[] =
    activeTab === "month"
      ? LEADERBOARD_MONTHLY
      : activeTab === "wk-league"
        ? LEADERBOARD_WK_LEAGUE
        : liveLeaderboard;

  const maxXp = Math.max(...leaderboard.map((s) => s.xp), 1);
  const currentUserEntry = leaderboard.find((s) => s.isCurrentUser);
  const leaderXp = leaderboard[0]?.xp ?? maxXp;

  const prevRank = useRef(
    leaderboard.find((s) => s.isCurrentUser)?.rank ?? 7
  );
  const currentRank =
    leaderboard.find((s) => s.isCurrentUser)?.rank ?? 7;
  const rankChanged = currentRank !== prevRank.current;

  useEffect(() => {
    prevRank.current = currentRank;
  }, [currentRank, xpPulse, activeTab]);

  const handleTabChange = (tab: LeaderboardTab) => {
    setActiveTab(tab);
    setTabKey((k) => k + 1);
  };

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
                🏆 Finderz League
              </h1>
              <p className="text-fk-navy/60">
                Zie welke Finders de meeste impact maken binnen het Finderz Network
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={50}>
          <p className="mb-6 rounded-xl border border-fk-primary/10 bg-fk-primary-muted px-4 py-3 text-sm font-medium text-fk-navy/70">
            Seizoenrankings geven iedere Finder opnieuw kans om bovenaan te
            eindigen.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-6 flex gap-1 rounded-xl border border-fk-primary/10 bg-fk-light p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "scale-[1.02] bg-fk-primary text-fk-white shadow-md"
                    : "text-fk-navy/60 hover:bg-fk-white/80 hover:text-fk-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <div key={tabKey}>
          <FadeIn delay={100}>
            <div className="mb-6 grid grid-cols-3 items-end gap-3 sm:gap-4">
              {PODIUM_CONFIG.map((config) => {
                const scout = leaderboard.find((s) => s.rank === config.rank);
                if (!scout) return null;
                return (
                  <PodiumCard
                    key={`${activeTab}-${scout.name}`}
                    scout={scout}
                    config={config}
                    maxXp={maxXp}
                  />
                );
              })}
            </div>
          </FadeIn>

          {currentUserEntry && currentUserEntry.rank > 3 && (
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
                      {currentUserEntry.xp.toLocaleString("nl-NL")} XP
                    </p>
                    <p className="text-xs text-fk-navy/50">
                      Nog {Math.max(0, leaderXp - currentUserEntry.xp).toLocaleString("nl-NL")} XP tot #1
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
                      <th className="px-6 py-4 font-semibold text-fk-navy/60">Finder</th>
                      <th className="px-6 py-4 font-semibold text-fk-navy/60">XP</th>
                      <th className="px-6 py-4 font-semibold text-fk-navy/60">Matches</th>
                      <th className="px-6 py-4 font-semibold text-fk-navy/60">Keeperz gemaakt</th>
                      <th className="px-6 py-4 font-semibold text-fk-navy/60">Beloning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((scout, i) => (
                      <ScoutRow
                        key={`${activeTab}-${scout.name}`}
                        scout={scout}
                        index={i}
                        pulseRank={!!scout.isCurrentUser && rankChanged}
                        maxXp={maxXp}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-fk-primary/10 sm:hidden">
                {leaderboard.map((scout, i) => (
                  <div
                    key={`${activeTab}-${scout.name}-mobile`}
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
                        {scout.xp.toLocaleString("nl-NL")} XP
                      </span>
                    </div>
                    <ProgressBar
                      progress={Math.round((scout.xp / maxXp) * 100)}
                      animated={false}
                    />
                    <div className="mt-2 flex gap-4 text-sm text-fk-navy/60">
                      <span>{scout.placements} matches</span>
                      <span>{scout.keepers ?? 0} Keeperz</span>
                      <span>{formatCurrency(scout.reward)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
