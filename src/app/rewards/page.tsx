"use client";

import {
  Coins,
  Gift,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { RewardRules } from "@/components/RewardRules";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { formatCurrency } from "@/lib/xp";

const PILLARS = [
  {
    hash: "XP",
    label: "Activiteit",
    icon: Zap,
    color: "from-fk-primary to-blue-600",
  },
  {
    hash: "Finderz Score",
    label: "Kwaliteit",
    icon: TrendingUp,
    color: "from-fk-secondary to-teal-600",
  },
  {
    hash: "Levels",
    label: "Privileges",
    icon: Star,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    hash: "Cash",
    label: "Resultaat",
    icon: Coins,
    color: "from-emerald-500 to-emerald-700",
  },
];

export default function RewardsPage() {
  const { xp, scoutScore, rewards } = useScout();
  const animatedXp = useAnimatedNumber(xp);
  const animatedCash = useAnimatedNumber(rewards.cashEarned);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <Card variant="highlight" className="mb-10 overflow-hidden border-0 p-0">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fk-white/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fk-white/5 blur-2xl" />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fk-white/20 bg-fk-white/10 px-3 py-1 text-xs font-semibold text-fk-white/90">
                  <Gift size={14} />
                  Beloningsmodel
                </div>
                <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                  Verdienen binnen het Finderz Network
                </h1>
                <p className="mt-4 max-w-2xl text-base text-fk-white/90 sm:text-lg">
                  XP, Finderz Score en cash zijn bewust gescheiden. Zo beloon je
                  activiteit én kwaliteit — cash alleen bij echte matches.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <Zap size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xs text-fk-white/60">Jouw XP</p>
                    <p className="text-xl font-extrabold tabular-nums">
                      {animatedXp.toLocaleString("nl-NL")}
                    </p>
                  </div>
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <TrendingUp size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xs text-fk-white/60">Finderz Score</p>
                    <p className="text-xl font-extrabold tabular-nums">
                      {scoutScore}/100
                    </p>
                  </div>
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <Coins size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xs text-fk-white/60">Verdiend</p>
                    <p className="text-xl font-extrabold">
                      {formatCurrency(animatedCash)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <Sparkles size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xs text-fk-white/60">In behandeling</p>
                    <p className="text-xl font-extrabold">
                      {formatCurrency(rewards.cashPending)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((item, i) => (
              <Card
                key={item.hash}
                hover
                className="group text-center transition-all duration-300"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-fk-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <item.icon size={26} />
                </div>
                <p className="text-lg font-extrabold text-fk-navy">{item.hash}</p>
                <p className="mt-1 text-sm text-fk-navy/55">{item.label}</p>
              </Card>
            ))}
          </div>
        </FadeIn>

        <RewardRules />

        <FadeIn delay={200}>
          <Card
            variant="highlight"
            className="mt-10 border-0 text-center"
          >
            <p className="text-lg font-bold sm:text-xl">
              Klaar om beloningen te verdienen?
            </p>
            <p className="mt-2 text-sm text-fk-white/80">
              Tip talent. Bouw reputatie. Maak impact.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/aandragen" variant="inverse">
                Tip Talent
              </Button>
              <Button href="/levels" variant="on-dark">
                Bekijk levels
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
