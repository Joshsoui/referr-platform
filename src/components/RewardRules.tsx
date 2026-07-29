"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  Banknote,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import {
  CASH_BONUS_NOTE,
  CASH_REWARDS,
  LEVEL_CASH_MULTIPLIERS,
  MAX_CASH_PER_CANDIDATE,
  XP_TIMELINE,
} from "@/lib/mockRewards";
import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { FAIR_USE_RULES } from "@/lib/mockQualityRules";
import { KEEPER_BONUS } from "@/lib/vacancyRewards";
import { formatCurrency, KEEPER_STATUS } from "@/lib/xp";

const TABS = [
  { id: "xp", label: "Voortgang", icon: TrendingUp },
  { id: "cash", label: "Beloningen", icon: Banknote },
  { id: "levels", label: "Reputatie", icon: Star },
  { id: "rules", label: "Regels", icon: Shield },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function RewardRules() {
  const [activeTab, setActiveTab] = useState<TabId>("cash");

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
                  <h3 className="text-xl font-bold text-fk-navy">Voortgangstijdlijn</h3>
                  <p className="text-sm text-fk-navy/55">
                    Zo groeit je impact van introductie tot plaatsing
                  </p>
                </div>
              </div>

              <div className="relative pl-8">
                <div
                  className="absolute bottom-4 left-3 top-4 w-0.5 rounded-full bg-fk-primary/15"
                  aria-hidden
                />
                <div className="space-y-0">
                  {XP_TIMELINE.map((item, i) => (
                    <div
                      key={item.action}
                      className={`relative pb-6 ${item.highlight ? "last:pb-0" : ""}`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div
                        className={`absolute -left-5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs ${
                          item.highlight
                            ? "border-amber-400 bg-amber-50 shadow-md shadow-amber-200/50"
                            : "border-fk-primary/30 bg-fk-white"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div
                        className={`rounded-xl border px-4 py-3.5 transition-all duration-300 ${
                          item.highlight
                            ? "border-amber-200 bg-gradient-to-r from-amber-50 to-fk-white shadow-sm"
                            : "border-transparent bg-fk-light hover:border-fk-primary/15 hover:bg-fk-primary/5"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-fk-navy">
                              {item.action}
                            </p>
                            {item.isBonus && (
                              <span className="mt-1 inline-block rounded-full bg-fk-secondary/15 px-2 py-0.5 text-xs font-bold text-fk-secondary">
                                Bonus bij sterke introductie
                              </span>
                            )}
                            {item.highlight && (
                              <p className="mt-1 text-xs text-fk-navy/55">
                                {KEEPER_STATUS.description} Cash via{" "}
                                {KEEPER_BONUS.title} — afhankelijk van de vacature.
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <span
                              className={`font-extrabold ${item.highlight ? "text-amber-700" : "text-fk-primary"}`}
                            >
                              Stap {i + 1}
                            </span>
                            {item.highlight && (
                              <p className="mt-0.5 text-sm font-bold text-amber-700">
                                Cash via {KEEPER_BONUS.title}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-fk-white to-amber-50/50 p-5">
                <p className="text-lg font-extrabold text-fk-navy">
                  {KEEPER_BONUS.title}
                </p>
                <p className="mt-2 text-sm text-fk-navy/70">
                  {KEEPER_BONUS.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-bold text-fk-white">
                    Cash afhankelijk van vacature
                  </span>
                </div>
              </div>
            </Card>
          </FadeIn>
        )}

        {activeTab === "cash" && (
          <FadeIn>
            <Card hover className="overflow-hidden border-emerald-200/50">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-fk-white shadow-md">
                  <Banknote size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">Cash-beloningen</h3>
                  <p className="text-sm text-fk-navy/55">
                    Alleen bij echt resultaat — geen geld voor alleen een introductie
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {CASH_REWARDS.map((item, i) => (
                  <div
                    key={item.action}
                    className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition-all duration-300 hover:shadow-sm ${
                      item.highlight
                        ? "border-amber-200 bg-gradient-to-r from-amber-50 to-fk-white"
                        : "border-transparent bg-emerald-50/80 hover:border-emerald-200"
                    }`}
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className={item.highlight ? "font-semibold text-amber-900" : "text-fk-navy"}>
                      {item.action}
                      {item.note && (
                        <span className="ml-1 text-fk-navy/45">({item.note})</span>
                      )}
                    </span>
                    <span
                      className={`font-extrabold ${
                        item.highlight
                          ? "text-2xl text-amber-700"
                          : "text-lg text-emerald-700"
                      }`}
                    >
                      {item.cash === null
                        ? "Per vacature"
                        : item.cash === 0
                          ? "€0"
                          : formatCurrency(item.cash)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-fk-primary/10 to-emerald-50 px-5 py-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                  Maximaal per kandidaat (Specialist)
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
            <Card hover className="mb-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-fk-white shadow-md">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">Reputatiebonus</h3>
                  <p className="text-sm text-fk-navy/55">
                    Hogere reputatie = hogere cash-multipliers
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
              <p className="mt-6 rounded-xl border border-fk-primary/15 bg-fk-primary-muted px-4 py-3 text-sm font-medium text-fk-navy/75">
                {CASH_BONUS_NOTE}
              </p>
            </Card>

            <Card hover>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
                  <Star size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fk-navy">Reputatievoordelen</h3>
                  <p className="text-sm text-fk-navy/55">
                    Wat je ontgrendelt per reputatiestap
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {LEVEL_DEFINITIONS.map((level) => (
                  <div
                    key={level.id}
                    className="rounded-xl border border-fk-primary/10 bg-fk-light p-4 transition-all hover:border-fk-primary/20 hover:shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{level.icon}</span>
                      <div>
                        <p className="font-bold text-fk-navy">
                          {level.name}
                        </p>
                        <p className="text-xs text-fk-navy/50">{level.tagline}</p>
                      </div>
                    </div>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {level.privileges.map((priv) => (
                        <li
                          key={priv}
                          className="flex items-center gap-2 text-sm text-fk-navy/75"
                        >
                          <Award size={14} className="shrink-0 text-fk-primary" />
                          {priv}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-fk-navy/55">
                Netwerkleider? Bekijk de{" "}
                <Link
                  href="/hall-of-fame"
                  className="font-semibold text-fk-primary hover:text-fk-navy"
                >
                  Community Champions
                </Link>
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
                    Zo houden we referr betrouwbaar
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
