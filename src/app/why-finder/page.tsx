"use client";

import {
  ArrowDown,
  ArrowRight,
  Banknote,
  Star,
  TrendingUp,
  Users,
  UserPlus,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import {
  WHY_FINDER_LEVEL_LADDER,
  WHY_FINDER_SPECIALIST_BADGES,
} from "@/lib/mockWhyFinder";

function SectionTitle({
  title,
  accent,
  subtitle,
}: {
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-extrabold text-fk-navy sm:text-3xl">
        {title}
        {accent && (
          <GradientText as="span" className="mt-2 block text-xl sm:text-2xl">
            {accent}
          </GradientText>
        )}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-fk-navy/60">{subtitle}</p>
      )}
    </div>
  );
}

export default function WhyFinderPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <PageHero
            className="mb-16"
            overline="referr"
            title="Hoe werkt referr?"
            accent="Zichtbaar maken loont."
            subtitle="Iedereen kent iemand. Niet iedereen doet er iets mee. referr helpt jou om goede mensen uit je netwerk zichtbaar te maken."
          />
        </FadeIn>

        <section className="mb-16">
          <SectionTitle
            title="Help iemand vooruit"
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

        <section className="mb-16">
          <SectionTitle
            title="Verdien beloningen"
            subtitle="Jouw beloning groeit mee met echte voortgang: bekeken, gesprek, plaatsing en uiteindelijke uitbetaling."
          />
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-4">
            {[
              { label: "Voortgang", icon: UserPlus },
              { label: "Reputatie", icon: Star },
              { label: "Beloning", icon: Banknote },
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

        <section className="mb-16">
          <SectionTitle
            title="Bouw reputatie op"
            subtitle="Sterke introducties zorgen voor vertrouwen, zichtbaarheid en erkenning binnen de community."
          />
          <div className="mx-auto flex max-w-xs flex-col items-center">
            {WHY_FINDER_LEVEL_LADDER.map((level, i) => (
              <div key={level} className="flex flex-col items-center">
                <FadeIn delay={i * 80}>
                  <div
                    className={`w-56 rounded-xl border px-4 py-3 text-center text-sm font-bold ${
                      level === "Topverbinder"
                        ? "border-fk-primary bg-fk-primary text-fk-white shadow-md"
                        : "border-fk-primary/15 bg-fk-white text-fk-navy"
                    }`}
                  >
                    {level}
                  </div>
                </FadeIn>
                {i < WHY_FINDER_LEVEL_LADDER.length - 1 && (
                  <ArrowDown size={18} className="my-2 text-fk-primary/40" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle title="Verdien erkenning" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {WHY_FINDER_SPECIALIST_BADGES.map((badge, i) => (
              <FadeIn key={badge.name} delay={i * 60}>
                <Card hover className="flex flex-col items-center py-6 text-center">
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="mt-3 text-xs font-bold text-fk-navy">
                    {badge.name}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionTitle
            title="Waarom werkt dit?"
            subtitle="De app draait om een simpele loop: iemand aandragen, de voortgang volgen en een beloning ontvangen bij resultaat."
          />
          <div className="mx-auto flex max-w-xs flex-col items-center">
            {["Jouw netwerk", "Kandidaat", "referr", "Nieuwe baan"].map(
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

        <section className="mb-16">
          <SectionTitle title="Hoe verdien ik?" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { hash: "Introductie", label: "Jij draagt iemand aan", icon: UserPlus },
              { hash: "Reputatie", label: "Sterke introducties bouwen vertrouwen op", icon: TrendingUp },
              { hash: "Profiel", label: "Je track record wordt zichtbaar", icon: Star },
              { hash: "Beloning", label: "Je verdient bij echte plaatsingen", icon: Banknote },
            ].map((item, i) => (
              <FadeIn key={item.hash} delay={i * 80}>
                <Card hover className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-fk-primary/10 text-fk-primary">
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

        <section className="mb-16">
          <FadeIn>
            <Card variant="glass" className="py-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fk-secondary">
                Merkverhaal
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-fk-navy sm:text-4xl">
                Iedereen kent iemand.
                <br />
                referr maakt de introductie.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-fk-navy/60">
                De beste mensen worden gevonden via mensen. Jouw netwerk heeft
                waarde.
              </p>
            </Card>
          </FadeIn>
        </section>

        <FadeIn>
          <PageHero
            heading="h2"
            title="Klaar om je eerste introductie te versturen?"
            className="text-center"
          >
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/aandragen" variant="inverse">
                Draag iemand aan
              </Button>
              <Button href="/dashboard" variant="on-dark">
                Naar overzicht
              </Button>
              <Button href="/leaderboard" variant="on-dark-outline">
                Bekijk ranglijst
              </Button>
            </div>
          </PageHero>
        </FadeIn>
      </div>
    </div>
  );
}
