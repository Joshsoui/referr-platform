"use client";

import { useState } from "react";
import {
  Award,
  Coins,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import {
  CASH_REWARDS,
  LEVEL_CASH_MULTIPLIERS,
  MAX_CASH_PER_CANDIDATE,
  XP_REWARDS,
} from "@/lib/mockRewards";
import { FAIR_USE_RULES } from "@/lib/mockQualityRules";
import { formatCurrency } from "@/lib/xp";

const TABS = [
  { id: "xp", label: "XP", icon: Zap },
  { id: "cash", label: "Cash", icon: Coins },
  { id: "levels", label: "Levels", icon: Star },
  { id: "rules", label: "Regels", icon: Shield },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function RewardRules() {
  const [activeTab, setActiveTab] = useState<TabId>("xp");

  return (
    <div>
      <FadeIn delay={100}>
        <div className="mb-8 flex gap-1 overflow-x-auto rounded-xl border border-fk-primary/10 bg-fk-light p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "scale-[1.02] bg-fk-primary text-fk-white shadow-md"
                  : "text-fk-navy/60 hover:bg-fk-white hover:text-fk-navy"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      <div key={activeTab} className="animate-tab-content-in">
        {activeTab === "xp" && (
          <FadeIn>
            <Card hover className="overflow-hidden border-fk-primary/15">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">XP-beloningen</h3>
                  <p className="text-sm text-fk-navy/55">
                    Activiteit = progressie als Finder
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {XP_REWARDS.map((item, i) => (
                  <div
                    key={item.action}
                    className="group flex items-center justify-between rounded-xl border border-transparent bg-fk-light px-4 py-3.5 text-sm transition-all duration-300 hover:border-fk-primary/15 hover:bg-fk-primary/5 hover:shadow-sm"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="flex items-center gap-3 text-fk-navy">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-fk-primary/10 text-fk-primary transition-transform group-hover:scale-110">
                        <Zap size={14} />
                      </span>
                      {item.action}
                      {item.isBonus && (
                        <span className="rounded-full bg-fk-secondary/15 px-2 py-0.5 text-xs font-bold text-fk-secondary">
                          Bonus
                        </span>
                      )}
                    </span>
                    <span className="font-extrabold text-fk-primary">
                      +{item.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        )}

        {activeTab === "cash" && (
          <FadeIn>
            <Card hover className="overflow-hidden border-emerald-200/50">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-fk-white shadow-md">
                  <Coins size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">Cash-beloningen</h3>
                  <p className="text-sm text-fk-navy/55">
                    Alleen bij echt resultaat — geen geld voor alleen een naam
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {CASH_REWARDS.map((item, i) => (
                  <div
                    key={item.action}
                    className="group flex items-center justify-between rounded-xl border border-transparent bg-emerald-50/80 px-4 py-3.5 text-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-sm"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="text-fk-navy">
                      {item.action}
                      {item.note && (
                        <span className="ml-1 text-fk-navy/45">({item.note})</span>
                      )}
                    </span>
                    <span className="text-lg font-extrabold text-emerald-700">
                      {item.cash === 0 ? "€0" : formatCurrency(item.cash)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-fk-primary/10 to-emerald-50 px-5 py-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                  Maximaal per talent
                </p>
                <p className="mt-1 text-3xl font-extrabold text-fk-navy">
                  {formatCurrency(MAX_CASH_PER_CANDIDATE)}
                </p>
              </div>
            </Card>
          </FadeIn>
        )}

        {activeTab === "levels" && (
          <FadeIn>
            <Card hover>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-fk-white shadow-md">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">Level bonus</h3>
                  <p className="text-sm text-fk-navy/55">
                    Hogere levels = hogere cash-multipliers
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {LEVEL_CASH_MULTIPLIERS.map((item, i) => (
                  <div
                    key={item.level}
                    className="group flex items-center justify-between rounded-xl border border-fk-primary/10 bg-fk-white px-4 py-4 transition-all duration-300 hover:border-fk-primary/25 hover:shadow-md"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="flex items-center gap-3 font-semibold text-fk-navy">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fk-primary-muted text-sm font-bold text-fk-primary">
                        {i + 1}
                      </span>
                      {item.level}
                    </span>
                    <span className="rounded-full bg-fk-primary px-3 py-1 text-sm font-bold text-fk-white">
                      {item.bonus}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Cash wordt nooit automatisch uitgekeerd. Eerst &ldquo;in
                behandeling&rdquo;, daarna handmatig goedgekeurd door Finderz
                Keeperz.
              </p>
            </Card>
          </FadeIn>
        )}

        {activeTab === "rules" && (
          <FadeIn>
            <Card hover variant="glass">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-navy text-fk-white shadow-md">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">Eerlijk gebruik</h3>
                  <p className="text-sm text-fk-navy/55">
                    Zo houden we het Finderz Network betrouwbaar
                  </p>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {FAIR_USE_RULES.map((rule, i) => (
                  <li
                    key={rule}
                    className="flex items-start gap-3 rounded-xl border border-fk-primary/10 bg-fk-white px-4 py-3 text-sm text-fk-navy/75 transition-colors hover:border-fk-primary/20"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <Award size={16} className="mt-0.5 shrink-0 text-fk-primary" />
                    {rule}
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
