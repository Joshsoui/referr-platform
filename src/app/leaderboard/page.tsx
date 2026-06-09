"use client";

import { Crown, Medal, Trophy, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { formatCurrency } from "@/lib/xp";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1)
    return <Crown size={18} className="text-amber-500 drop-shadow-sm" />;
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
}: {
  scout: ReturnType<typeof useScout>["leaderboard"][0];
  index: number;
  pulseRank: boolean;
}) {
  const animatedXp = useAnimatedNumber(scout.xp, 600);

  return (
    <tr
      className={`border-b border-fk-primary/5 transition-all duration-300 ${
        scout.isCurrentUser
          ? "bg-fk-primary/10 font-semibold shadow-inner"
          : "hover:bg-fk-light/50"
      } ${scout.isCurrentUser && pulseRank ? "animate-rank-bounce" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <RankIcon rank={scout.rank} />
          <span>{scout.rank}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-fk-navy">
        {scout.name}
        {scout.isCurrentUser && (
          <span className="ml-2 rounded-full bg-fk-primary px-2 py-0.5 text-xs font-bold text-fk-white">
            Jij
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 font-bold text-fk-primary tabular-nums">
          <Zap size={14} className="text-fk-secondary" />
          {animatedXp.toLocaleString("nl-NL")} XP
        </span>
      </td>
      <td className="px-6 py-4 text-fk-navy/70">{scout.placements}</td>
      <td className="px-6 py-4 text-fk-navy/70">
        {formatCurrency(scout.reward)}
      </td>
    </tr>
  );
}

export default function LeaderboardPage() {
  const { leaderboard, xpPulse } = useScout();
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
                Leaderboard
              </h1>
              <p className="text-fk-navy/60">Top scouts van Finderz Keeperz</p>
            </div>
          </div>
        </FadeIn>

        {/* Top 3 podium */}
        <FadeIn delay={100}>
          <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
            {[1, 0, 2].map((idx) => {
              const scout = leaderboard[idx];
              if (!scout) return null;
              const heights = ["h-28", "h-36", "h-24"];
              const orders = ["order-1", "order-0 sm:order-1", "order-2"];
              return (
                <div
                  key={scout.name}
                  className={`${orders[idx]} flex flex-col items-center`}
                >
                  <div
                    className={`w-full ${heights[idx]} flex flex-col items-center justify-end rounded-2xl border border-fk-primary/10 bg-gradient-to-t from-fk-primary/15 to-fk-white p-3 card-hover ${
                      scout.isCurrentUser ? "ring-2 ring-fk-primary" : ""
                    }`}
                  >
                    <RankIcon rank={scout.rank} />
                    <p className="mt-1 truncate text-center text-xs font-bold text-fk-navy sm:text-sm">
                      {scout.name.split(" ")[0]}
                    </p>
                    <p className="text-xs font-bold text-fk-primary">
                      {scout.xp.toLocaleString("nl-NL")} XP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <Card className="overflow-hidden p-0">
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-fk-primary/10 bg-fk-light">
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">#</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Scout</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">XP</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Plaatsingen</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Beloning</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((scout, i) => (
                    <ScoutRow
                      key={scout.name}
                      scout={scout}
                      index={i}
                      pulseRank={!!scout.isCurrentUser && rankChanged}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-fk-primary/10 sm:hidden">
              {leaderboard.map((scout, i) => (
                <div
                  key={scout.name}
                  className={`p-4 animate-fade-in-up ${
                    scout.isCurrentUser
                      ? "bg-fk-primary/10"
                      : ""
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
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
                  <div className="flex gap-4 text-sm text-fk-navy/60">
                    <span>{scout.placements} plaatsingen</span>
                    <span>{formatCurrency(scout.reward)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
