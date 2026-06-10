import {
  ArrowRight,
  Gift,
  HelpCircle,
  Network,
  Search,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroBg from "@/assets/hero-bg.png";
import { FloatingOrbs } from "@/components/animations/FloatingOrbs";
import { LiveTicker } from "@/components/animations/LiveTicker";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    icon: Network,
    title: "Jij kent iemand",
    description:
      "Iedereen in jouw netwerk kent talent. Van collega's tot vrienden — jij weet wie er klaar is voor de volgende stap.",
    stagger: "stagger-1",
  },
  {
    icon: UserPlus,
    title: "Draag hem/haar aan",
    description:
      "Met één klik draag je een kandidaat aan via de Scout Engine. Simpel, snel en zonder gedoe.",
    stagger: "stagger-2",
  },
  {
    icon: Search,
    title: "Wij doen de rest",
    description:
      "Ons recruitmentteam neemt het over: intake, matching, voordracht en plaatsing bij de juiste klant.",
    stagger: "stagger-3",
  },
  {
    icon: Gift,
    title: "Jij verdient XP en beloning",
    description:
      "Bij elke mijlpaal verdien je XP, stijg je in level en ontvang je beloningen bij succesvolle matches.",
    stagger: "stagger-4",
  },
];

const xpMilestones = [
  { action: "Aangedragen", xp: 10 },
  { action: "Intake gepland", xp: 50 },
  { action: "Voorgesteld", xp: 100 },
  { action: "Geplaatst", xp: 500 },
  { action: "Proeftijd gehaald", xp: 1000 },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Achtergrondafbeelding */}
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={heroBg}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Blauwe overlay — afbeelding blijft zichtbaar */}
        <div className="absolute inset-0 bg-fk-navy/55" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-fk-navy/80 via-fk-primary/50 to-fk-navy/65"
          aria-hidden
        />

        <FloatingOrbs />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-fk-white/20 bg-fk-navy/40 px-4 py-1.5 text-sm font-medium text-fk-white backdrop-blur-sm">
            <Sparkles size={16} className="animate-float" />
            Scout Engine MVP
          </div>

          <h1 className="animate-fade-in-up stagger-1 text-3xl font-extrabold leading-tight tracking-tight text-fk-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Iedereen kent talent.
          </h1>

          <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fk-white/90 drop-shadow-md sm:text-xl">
            Bouw jouw reputatie als Scout, help mensen aan een nieuwe uitdaging
            en verdien beloningen voor succesvolle matches.
          </p>

          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Button href="/why-scout" variant="primary">
              <HelpCircle size={18} />
              Waarom Scout worden?
            </Button>
            <Button href="/aandragen" variant="on-dark">
              Draag kandidaat aan
            </Button>
            <Button href="/challenges" variant="on-dark-outline">
              Bekijk challenges
            </Button>
          </div>

          <p className="animate-fade-in-up stagger-3 mt-6 text-sm text-fk-white/70">
            Nieuw bij Scout Engine?{" "}
            <Link
              href="/why-scout"
              className="inline-flex items-center gap-1 font-semibold text-fk-white hover:text-fk-secondary"
            >
              Ontdek hoe het werkt
              <ArrowRight size={14} />
            </Link>
          </p>

          {/* XP milestones strip */}
          <div className="animate-fade-in-up stagger-4 mt-14 flex flex-wrap justify-center gap-3">
            {xpMilestones.map((m) => (
              <span
                key={m.action}
                className="inline-flex items-center gap-1.5 rounded-full border border-fk-white/10 bg-fk-white/5 px-3 py-1.5 text-xs font-medium text-fk-white/80 backdrop-blur-sm"
              >
                <Zap size={12} className="text-fk-secondary" />
                {m.action}{" "}
                <span className="font-bold text-fk-secondary">+{m.xp}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <LiveTicker />

      {/* Steps */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-in-up mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
              Hoe werkt het?
            </h2>
            <p className="mt-3 text-fk-navy/60">
              Vier stappen van signaal naar beloning
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

      {/* Onboarding CTA */}
      <section className="bg-fk-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-scale-in">
          <PageHero
            heading="h2"
            title="Klaar om jouw netwerk in te zetten?"
            subtitle="Ontdek waarom Scout worden de moeite waard is — van XP en levels tot beloningen bij succesvolle matches."
          >
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/why-scout" variant="on-dark">
                Waarom Scout worden?
              </Button>
              <Button href="/dashboard" variant="inverse">
                Bekijk dashboard
              </Button>
            </div>
          </PageHero>
        </div>
      </section>
    </div>
  );
}
