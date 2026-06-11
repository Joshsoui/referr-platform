import {
  ArrowRight,
  Gift,
  HelpCircle,
  Network,
  Search,
  UserPlus,
  UserSearch,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { FloatingOrbs } from "@/components/animations/FloatingOrbs";
import { LiveTicker } from "@/components/animations/LiveTicker";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";

const HERO_STATS = [
  { label: "XP", value: "10K+" },
  { label: "Finders", value: "300" },
  { label: "Matches", value: "∞" },
];

const steps = [
  {
    icon: Network,
    title: "Jij kent talent",
    description:
      "Iedereen in jouw netwerk kent iemand die beter op zijn plek zou zitten. Jij weet wie klaar is voor de volgende stap.",
    stagger: "stagger-1",
  },
  {
    icon: UserPlus,
    title: "Tip het talent",
    description:
      "Met één klik tip je talent via het Finderz Network. Simpel, snel en zonder gedoe.",
    stagger: "stagger-2",
  },
  {
    icon: Search,
    title: "Wij doen de rest",
    description:
      "Finderz Keeperz neemt het over: intake, matching, voordracht en plaatsing bij de juiste klant.",
    stagger: "stagger-3",
  },
  {
    icon: Gift,
    title: "Jij verdient beloning",
    description:
      "Bij elke mijlpaal verdien je XP, stijg je in level en ontvang je beloningen bij succesvolle matches.",
    stagger: "stagger-4",
  },
];

const xpMilestones = [
  { action: "Talent getipt", xp: 10 },
  { action: "Intake gepland", xp: 50 },
  { action: "Voorgesteld", xp: 100 },
  { action: "Succesvolle match", xp: 500 },
  { action: "Keeper-status", xp: 1000 },
];

export default function LandingPage() {
  return (
    <div>
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl animate-fade-in-up">
          <Card variant="highlight" className="overflow-hidden border-0 p-0 shadow-[0_24px_60px_-16px_rgba(0,43,69,0.35)]">
            <div className="relative p-8 sm:p-12 lg:p-16">
              <FloatingOrbs />
              <div
                className="animate-float-slow absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fk-white/10 blur-3xl"
                aria-hidden
              />
              <div
                className="animate-float absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-fk-white/5 blur-2xl"
                aria-hidden
              />
              <div
                className="animate-pulse-glow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fk-white/[0.04] blur-3xl"
                aria-hidden
              />

              <div className="relative text-center">
                <span className="mb-6 inline-flex animate-pulse-glow items-center gap-2 rounded-full border border-fk-white/25 bg-fk-white/10 px-4 py-1.5 text-xs font-semibold text-fk-white/90 backdrop-blur-sm">
                  <UserSearch size={16} strokeWidth={2.25} className="shrink-0" />
                  Finderz Network
                </span>

                <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Iedereen kent talent.
                </h1>

                <GradientText
                  variant="flame"
                  as="p"
                  className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl"
                >
                  Tip. Match. Verdien.
                </GradientText>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fk-white/90 sm:text-lg">
                  Met het Finderz Network tip je talent uit jouw netwerk, bouw je
                  reputatie op en verdien je beloningen voor succesvolle matches.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                  <Button href="/why-finder" variant="inverse">
                    <HelpCircle size={18} />
                    Waarom Finder worden?
                  </Button>
                  <Button href="/aandragen" variant="on-dark">
                    Tip Talent
                  </Button>
                  <Button href="/challenges" variant="on-dark-outline">
                    Bekijk Finderz Missions
                  </Button>
                </div>

                <p className="mt-6 text-sm text-fk-white/70">
                  Nieuw bij het Finderz Network?{" "}
                  <Link
                    href="/why-finder"
                    className="inline-flex items-center gap-1 font-semibold text-fk-white hover:text-fk-white/80"
                  >
                    Ontdek hoe het werkt
                    <ArrowRight size={14} />
                  </Link>
                </p>

                <div className="mt-10 grid grid-cols-3 gap-3 sm:mx-auto sm:max-w-lg">
                  {HERO_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-3 py-2 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]"
                    >
                      <p className="text-[10px] text-fk-white/55">{stat.label}</p>
                      <p className="text-sm font-bold tabular-nums">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {xpMilestones.map((m) => (
                    <span
                      key={m.action}
                      className="inline-flex items-center gap-1.5 rounded-full border border-fk-white/15 bg-fk-white/10 px-3 py-1.5 text-xs font-medium text-fk-white/85 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <Zap size={12} className="text-fk-white/70" />
                      {m.action}{" "}
                      <span className="font-bold text-fk-white">+{m.xp}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <LiveTicker />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-in-up mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
              Hoe werkt het?
              <GradientText as="span" className="mt-2 block text-xl sm:text-2xl">
                Van tip naar beloning.
              </GradientText>
            </h2>
            <p className="mt-3 text-fk-navy/60">
              Van verborgen talent naar succesvolle match
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card
                key={step.title}
                variant="glass"
                hover
                className={`animate-fade-in-up ${step.stagger} relative overflow-hidden`}
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-fk-primary/5" />
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <step.icon size={22} />
                </div>
                <span className="absolute right-6 top-6 text-4xl font-extrabold text-fk-primary/10">
                  {index + 1}
                </span>
                <h3 className="relative mb-2 text-lg font-bold text-fk-navy">
                  {step.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-fk-navy/65">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fk-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-scale-in">
          <PageHero
            heading="h2"
            title="Klaar om jouw netwerk in te zetten?"
            subtitle="Ontdek waarom Finder worden de moeite waard is — van XP en levels tot beloningen bij succesvolle matches."
          >
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/why-finder" variant="on-dark">
                Waarom Finder worden?
              </Button>
              <Button href="/dashboard" variant="inverse">
                Word Finder
              </Button>
            </div>
          </PageHero>
        </div>
      </section>
    </div>
  );
}
