"use client";

import {
  ArrowDown,
  ArrowRight,
  Award,
  Briefcase,
  Coins,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  WHY_SCOUT_LEVEL_LADDER,
  WHY_SCOUT_SPECIALIST_BADGES,
  WHY_SCOUT_SUCCESS_STORIES,
} from "@/lib/mockWhyScout";
import { formatCurrency } from "@/lib/xp";

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-extrabold text-fk-navy sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-fk-navy/60">{subtitle}</p>
      )}
    </div>
  );
}

export default function WhyScoutPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <FadeIn>
          <PageHero
            className="mb-16"
            overline="Finderz Keeperz Scout Engine"
            title="Waarom Scout worden?"
            subtitle="Iedereen kent wel iemand die beter op zijn plek zou zitten. Met Scout Engine help je talent vooruit én bouw je aan je eigen reputatie."
          />
        </FadeIn>

        {/* Section 1 */}
        <section className="mb-16">
          <SectionTitle
            title="Help mensen vooruit"
            subtitle="Iemand uit jouw netwerk kan dankzij jou de volgende stap zetten."
          />
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4">
            {["Persoon", "Nieuwe baan", "Groei"].map((step, i) => (
              <FadeIn key={step} delay={i * 100}>
                <div className="flex flex-col items-center sm:flex-row">
                  <div className="flex h-24 w-36 flex-col items-center justify-center rounded-2xl border border-fk-primary/15 bg-gradient-to-br from-fk-white to-fk-primary/5 shadow-sm">
                    <Users size={24} className="mb-2 text-fk-primary" />
                    <span className="text-sm font-bold text-fk-navy">{step}</span>
                  </div>
                  {i < 2 && (
                    <ArrowRight className="my-2 rotate-90 text-fk-primary/40 sm:mx-3 sm:rotate-0" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <SectionTitle
            title="Verdien beloningen"
            subtitle="Bij succesvolle matches ontvang je XP, badges en geldelijke beloningen."
          />
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4">
            {[
              { label: "XP", icon: Zap },
              { label: "Level", icon: Star },
              { label: "Bonus", icon: Coins },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 100}>
                <div className="flex flex-col items-center sm:flex-row">
                  <div className="flex h-24 w-36 flex-col items-center justify-center rounded-2xl border border-fk-primary/15 bg-fk-white shadow-sm">
                    <item.icon size={24} className="mb-2 text-fk-primary" />
                    <span className="text-sm font-bold text-fk-navy">
                      {item.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <ArrowRight className="my-2 rotate-90 text-fk-primary/40 sm:mx-3 sm:rotate-0" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-16">
          <SectionTitle
            title="Bouw jouw reputatie"
            subtitle="Word bekend als Talent Spotter, Specialist of Elite Scout."
          />
          <div className="mx-auto flex max-w-xs flex-col items-center">
            {WHY_SCOUT_LEVEL_LADDER.map((level, i) => (
              <div key={level} className="flex flex-col items-center">
                <FadeIn delay={i * 80}>
                  <div
                    className={`w-56 rounded-xl border px-4 py-3 text-center text-sm font-bold ${
                      level === "Elite Scout"
                        ? "border-fk-primary bg-fk-primary text-fk-white shadow-md"
                        : "border-fk-primary/15 bg-fk-white text-fk-navy"
                    }`}
                  >
                    {level}
                  </div>
                </FadeIn>
                {i < WHY_SCOUT_LEVEL_LADDER.length - 1 && (
                  <ArrowDown size={18} className="my-2 text-fk-primary/40" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-16">
          <SectionTitle title="Word specialist" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {WHY_SCOUT_SPECIALIST_BADGES.map((badge, i) => (
              <FadeIn key={badge.name} delay={i * 60}>
                <Card
                  hover
                  className="flex flex-col items-center py-6 text-center"
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="mt-3 text-xs font-bold text-fk-navy">
                    {badge.name}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-16">
          <SectionTitle
            title="Waarom werkt dit?"
            subtitle="Iedereen kent talent. Maar bijna niemand wordt beloond voor het herkennen ervan. Scout Engine maakt jouw netwerk zichtbaar."
          />
          <div className="mx-auto flex max-w-xs flex-col items-center">
            {["Jouw netwerk", "Talent", "Finderz Keeperz", "Nieuwe baan"].map(
              (step, i) => (
                <div key={step}>
                  <FadeIn delay={i * 80}>
                    <div className="w-56 rounded-xl border border-fk-primary/15 bg-gradient-to-r from-fk-primary/5 to-fk-white px-4 py-3 text-center text-sm font-semibold text-fk-navy">
                      {step}
                    </div>
                  </FadeIn>
                  {i < 3 && (
                    <ArrowDown size={18} className="mx-auto my-2 text-fk-primary/40" />
                  )}
                </div>
              )
            )}
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-16">
          <SectionTitle title="Hoe verdien ik?" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                hash: "XP",
                label: "Activiteit",
                icon: Zap,
                color: "text-fk-primary",
              },
              {
                hash: "Scout Score",
                label: "Kwaliteit",
                icon: TrendingUp,
                color: "text-fk-secondary",
              },
              {
                hash: "Levels",
                label: "Privileges",
                icon: Star,
                color: "text-indigo-600",
              },
              {
                hash: "Cash",
                label: "Resultaat",
                icon: Coins,
                color: "text-emerald-600",
              },
            ].map((item, i) => (
              <FadeIn key={item.hash} delay={i * 80}>
                <Card hover className="text-center">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-fk-primary/10 ${item.color}`}
                  >
                    <item.icon size={26} />
                  </div>
                  <p className="text-lg font-extrabold text-fk-navy">
                    {item.hash}
                  </p>
                  <p className="mt-1 text-sm text-fk-navy/55">{item.label}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-16">
          <SectionTitle title="Succesverhalen" />
          <div className="grid gap-4 sm:grid-cols-3">
            {WHY_SCOUT_SUCCESS_STORIES.map((story, i) => (
              <FadeIn key={story.name} delay={i * 100}>
                <Card
                  hover
                  className={
                    story.isCurrentUser
                      ? "border-2 border-fk-primary ring-2 ring-fk-primary/10"
                      : ""
                  }
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-fk-primary-muted text-lg font-bold text-fk-primary">
                    {story.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <h3 className="font-bold text-fk-navy">{story.name}</h3>
                  <p className="text-sm font-semibold text-fk-primary">
                    {story.level}
                  </p>
                  <div className="mt-4 space-y-1 text-sm text-fk-navy/60">
                    <p className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      {story.placements} plaatsingen
                    </p>
                    <p className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <Award size={14} />
                      {formatCurrency(story.earned)} verdiend
                    </p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 8 CTA */}
        <FadeIn>
          <PageHero
            heading="h2"
            title="Klaar om jouw eerste kandidaat aan te dragen?"
            className="text-center"
          >
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/dashboard" variant="inverse">
                Word Scout
              </Button>
              <Button href="/aandragen" variant="on-dark">
                Draag kandidaat aan
              </Button>
              <Button href="/challenges" variant="on-dark-outline">
                Bekijk WK Scout League
              </Button>
            </div>
          </PageHero>
        </FadeIn>
      </div>
    </div>
  );
}
