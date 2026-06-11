"use client";

import {
  ArrowDown,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  Euro,
  Layers,
  Network,
  Rocket,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { FloatingOrbs } from "@/components/animations/FloatingOrbs";
import { LiveTicker } from "@/components/animations/LiveTicker";
import { DeckAnimatedFlow } from "@/components/founders-deck/DeckAnimatedFlow";
import {
  DeckQuote,
  DeckSectionShell,
  DeckStatTile,
  IconCard,
  ProductPreview,
  SectionLabel,
} from "@/components/founders-deck/DeckParts";
import { HowItWorksSection } from "@/components/founders-deck/HowItWorksSection";
import {
  FinderScaleVisual,
  GamificationPodium,
  PlatformDashboardMock,
  PlatformMiniPreviews,
} from "@/components/founders-deck/PlatformMock";
import { ScrollReveal } from "@/components/founders-deck/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { ProgressBar } from "@/components/ui/ProgressBar";

const RECRUITMENT_FLOW = [
  { label: "Meta Ads", highlight: true },
  { label: "LinkedIn Recruiter", highlight: true },
  { label: "Vacaturebanken", highlight: false },
  { label: "Sourcing", highlight: false },
  { label: "CV's", highlight: false },
];

const REALITY_PAIN_POINTS = [
  {
    emoji: "💸",
    title: "Stijgende kosten",
    desc: "Advertentiebudget en recruiter fees blijven groeien.",
    accent: "from-rose-500/10 to-orange-500/5 border-rose-200",
  },
  {
    emoji: "⏳",
    title: "Langere time-to-hire",
    desc: "Weken sourcing terwijl vacatures open blijven staan.",
    accent: "from-amber-500/10 to-yellow-500/5 border-amber-200",
  },
  {
    emoji: "🎣",
    title: "Dezelfde vijver",
    desc: "Iedereen vist op dezelfde actieve kandidaten.",
    accent: "from-violet-500/10 to-purple-500/5 border-violet-200",
  },
];

const FINDER_FLOW = [
  { label: "3 Recruiters", highlight: false },
  { label: "300 Finders", highlight: true },
  { label: "30.000 contacten", highlight: false },
  { label: "Verborgen talent", highlight: true },
];

const GAMIFICATION_CARDS = [
  { icon: Zap, title: "XP", emoji: "⚡", accent: "amber" as const },
  { icon: Layers, title: "Levels", emoji: "🏆", accent: "blue" as const },
  { icon: Target, title: "Challenges", emoji: "🎯", accent: "violet" as const },
  { icon: Award, title: "Beloningen", emoji: "💶", accent: "emerald" as const },
  { icon: Trophy, title: "Rankings", emoji: "🥇", accent: "orange" as const },
];

const FINDER_NETWORK = [
  { icon: Users, title: "Finder", desc: "Signaleert talent.", emoji: "🔎", accent: "blue" as const },
  { icon: Zap, title: "XP", desc: "Beloont activiteit.", emoji: "⚡", accent: "amber" as const },
  { icon: Layers, title: "Levels", desc: "Beloont progressie.", emoji: "💎", accent: "indigo" as const },
  { icon: Target, title: "Finderz Missions", desc: "Beloont betrokkenheid.", emoji: "🎯", accent: "violet" as const },
  { icon: Crown, title: "Keeper Status", desc: "Beloont kwaliteit.", emoji: "👑", accent: "orange" as const },
];

const REALITY_DRIVERS = [
  {
    icon: Euro,
    label: "Advertenties & tools",
    value: "Steeds duurder",
    detail: "Meta, LinkedIn Recruiter, vacaturebanken",
    accent: "rose" as const,
  },
  {
    icon: Clock,
    label: "Time-to-hire",
    value: "Weken sourcing",
    detail: "Vacatures blijven lang open staan",
    accent: "amber" as const,
  },
  {
    icon: Users,
    label: "Bereik",
    value: "Dezelfde vijver",
    detail: "Iedereen vist op actieve kandidaten",
    accent: "violet" as const,
  },
];

const TRUST_CARDS = [
  {
    title: "Toestemming vereist",
    desc: "Bij iedere aandracht bevestigt een Finder dat de kandidaat toestemming heeft gegeven om gedeeld te worden.",
    emoji: "✅",
    accent: "emerald",
    badge: "AVG-proof",
  },
  {
    title: "Geen beloning voor alleen een naam",
    desc: "Rewards ontstaan pas bij intake, match en Keeper Status — nooit bij een losse tip zonder vervolg.",
    emoji: "🛡️",
    accent: "blue",
    badge: "Kwaliteit eerst",
  },
  {
    title: "Duplicaten tellen niet mee",
    desc: "Kwaliteit boven kwantiteit. Eén sterke match telt meer dan tien losse namen.",
    emoji: "🎯",
    accent: "violet",
    badge: "Eerlijk spel",
  },
] as const;

const TRUST_ACCENT_STYLES = {
  emerald: {
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-fk-white to-emerald-50/40 hover:border-emerald-300",
    icon: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-500 text-white",
  },
  blue: {
    card: "border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-fk-white to-blue-50/40 hover:border-blue-300",
    icon: "bg-blue-100 text-blue-700",
    badge: "bg-blue-500 text-white",
  },
  violet: {
    card: "border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-fk-white to-violet-50/40 hover:border-violet-300",
    icon: "bg-violet-100 text-violet-700",
    badge: "bg-violet-500 text-white",
  },
} as const;

const PROTOTYPE_ITEMS = [
  "Dashboard",
  "Vacatures",
  "Talent aandragen",
  "XP systeem",
  "Levels",
  "Rewards",
  "Leaderboard",
  "Finderz Missions",
  "Keeper Status",
  "Werkend prototype live",
];

const ROADMAP = [
  {
    phase: "Fase 1",
    title: "Pilot bij Intal",
    accent: "emerald",
    stats: ["Klant: Intal", "1e vacature", "E-mail & WhatsApp"],
    channels: ["Klantenbestand", "Finderz Network"],
    details: [
      "Start met één klant — Intal — en de eerste vacature als Finderz Mission.",
      "Promoot het referral platform (Finderz Network) via e-mail en WhatsApp naar ons bestaande klantenbestand.",
      "Motiveer mensen om zich aan te melden als Finder en talent aan te dragen.",
    ],
    goal: "Valideren dat het netwerk kandidaten oplevert.",
  },
  {
    phase: "Fase 2",
    title: "Groei via LinkedIn",
    accent: "blue",
    stats: ["LinkedIn", "Organisch bereik", "Netwerkuitbreiding"],
    channels: ["Social selling", "Employer branding"],
    details: [
      "Promoot het Finderz Network actief via LinkedIn.",
      "Richt je op medewerkers, klanten en partners die talent kennen.",
      "Bouw een groeiend netwerk van Finders buiten het bestaande klantenbestand.",
    ],
    goal: "Bewijzen dat het netwerk organisch kan groeien.",
  },
  {
    phase: "Fase 3",
    title: "Marketing opschalen",
    accent: "violet",
    stats: ["Meta Ads", "Campagnes", "Schaal"],
    channels: ["Paid media", "Content marketing"],
    details: [
      "Start met Meta campagnes gericht op Finder-recruitment.",
      "Combineer met andere marketingcampagnes om het netwerk verder te laten groeien.",
      "Schaal op naar meerdere klanten en een landelijk Finderz Network.",
    ],
    goal: "Van pilot naar schaalbaar acquisitiekanaal.",
  },
];

const COST_CARDS = [
  {
    label: "Hosting",
    value: "± €25–50",
    unit: "per maand",
    emoji: "☁️",
    accent: "from-blue-500/15 to-sky-500/10 border-blue-200",
    valueColor: "text-blue-700",
  },
  {
    label: "Mail",
    value: "± €0–10",
    unit: "per maand",
    emoji: "✉️",
    accent: "from-emerald-500/15 to-teal-500/10 border-emerald-200",
    valueColor: "text-emerald-700",
  },
  {
    label: "Platform",
    value: "Bestaande stack",
    unit: "geen extra licenties",
    emoji: "⚙️",
    accent: "from-violet-500/15 to-purple-500/10 border-violet-200",
    valueColor: "text-violet-700",
  },
  {
    label: "Rewards",
    value: "Variabele",
    unit: "kosten per match",
    emoji: "💶",
    accent: "from-amber-500/15 to-orange-500/10 border-amber-200",
    valueColor: "text-amber-700",
  },
];

const ROADMAP_ACCENT_STYLES = {
  emerald: {
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-fk-white to-emerald-50/30 hover:border-emerald-300",
    phase: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800",
    icon: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  blue: {
    card: "border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-fk-white to-blue-50/30 hover:border-blue-300",
    phase: "text-blue-700",
    badge: "bg-blue-100 text-blue-800",
    icon: "text-blue-500",
    dot: "bg-blue-500",
  },
  violet: {
    card: "border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-fk-white to-violet-50/30 hover:border-violet-300",
    phase: "text-violet-700",
    badge: "bg-violet-100 text-violet-800",
    icon: "text-violet-500",
    dot: "bg-violet-500",
  },
} as const;

const FUTURE_PILLARS = [
  {
    title: "Side Quests",
    desc: "Simpele mini-missies gekoppeld aan een vacature — zoek iemand in je netwerk en verdien snel extra geld, zonder het volledige recruitment-traject.",
    emoji: "🗺️",
    accent: "from-fk-primary/15 to-blue-500/10 border-fk-primary/20",
  },
  {
    title: "XP & Levels",
    desc: "Progressie die voelt als Strava of Duolingo: zichtbaar, eerlijk en verslavend.",
    emoji: "⚡",
    accent: "from-amber-500/15 to-orange-500/10 border-amber-200",
  },
  {
    title: "Community",
    desc: "Finders die elkaar inspireren, challengen en vieren — niet alleen individueel scoren.",
    emoji: "🤝",
    accent: "from-emerald-500/15 to-teal-500/10 border-emerald-200",
  },
  {
    title: "Finderz Missions",
    desc: "Seizoensgebonden challenges met extra beloningen en teamdoelen.",
    emoji: "🎯",
    accent: "from-violet-500/15 to-purple-500/10 border-violet-200",
  },
  {
    title: "Cash Beloningen",
    desc: "Echte waarde bij intake, match én Keeper Bonus — geen symbolische punten alleen.",
    emoji: "💶",
    accent: "from-rose-500/15 to-pink-500/10 border-rose-200",
  },
  {
    title: "Finderz League",
    desc: "Rankings, Hall of Fame en seizoensfinale — competitie die kwaliteit beloont.",
    emoji: "🏆",
    accent: "from-yellow-500/15 to-amber-500/10 border-yellow-200",
  },
];

const APP_REFERENCES = ["Strava", "Duolingo", "Spotify Wrapped"];

const PRODUCT_PREVIEWS = [
  {
    title: "Dashboard",
    metric: "4.250 XP · Master Finder",
    accent: "from-fk-primary to-blue-600",
    progress: 85,
  },
  {
    title: "Vacatures",
    metric: "🟢 Easy · 🔴 Expert",
    accent: "from-fk-secondary to-teal-600",
    progress: 72,
  },
  {
    title: "Finderz League",
    metric: "#7 · 94 Finderz Score",
    accent: "from-indigo-500 to-fk-primary",
    progress: 94,
  },
  {
    title: "Rewards",
    metric: "€1.250 verdiend",
    accent: "from-emerald-500 to-emerald-700",
    progress: 58,
  },
];

export default function FoundersDeckPage() {
  return (
    <div className="bg-fk-light">
      {/* HERO — platform highlight card */}
      <section className="px-4 pb-8 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal direction="scale">
            <Card variant="highlight" className="overflow-hidden border-0 p-0">
              <div className="relative p-8 sm:p-12 lg:p-16">
                <FloatingOrbs />
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fk-white/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-fk-white/5 blur-2xl" />

                <div className="relative text-center">
                  <span className="mb-6 inline-flex animate-pulse-glow items-center gap-2 rounded-full border border-fk-white/25 bg-fk-white/10 px-4 py-1.5 text-xs font-semibold text-fk-white/90 backdrop-blur-sm">
                    <Sparkles size={14} />
                    Private Founder Deck
                  </span>

                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">
                    FK Scout Engine
                  </h1>
                  <p className="mt-5 text-lg font-medium text-fk-white/90 sm:text-2xl">
                    Van recruitment naar het Finderz Network.
                  </p>

                  <div className="mx-auto mt-8 max-w-2xl space-y-3 text-base leading-relaxed text-fk-white/80 sm:text-lg">
                    <p>
                      Recruiters besteden dagelijks tijd en geld aan het vinden
                      van kandidaten.
                    </p>
                    <p className="font-semibold text-fk-white">
                      Maar wat als talent niet langer gezocht hoeft te worden?
                    </p>
                    <p className="text-xl font-bold text-fk-white">
                      Wat als talent ons vindt?
                    </p>
                  </div>

                  <div className="mt-10">
                    <Button href="#concept" variant="inverse" className="gap-2">
                      Bekijk het concept
                      <ArrowDown size={16} />
                    </Button>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-3 sm:mx-auto sm:max-w-lg">
                    {[
                      { label: "XP", value: "10K+" },
                      { label: "Finders", value: "300" },
                      { label: "Matches", value: "∞" },
                    ].map((pill) => (
                      <div
                        key={pill.label}
                        className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-3 py-2 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]"
                      >
                        <p className="text-[10px] text-fk-white/55">{pill.label}</p>
                        <p className="text-sm font-bold tabular-nums">{pill.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <LiveTicker />

      {/* SECTIE 1 */}
      <DeckSectionShell
        variant="light"
        className="relative scroll-mt-20 overflow-hidden"
        id="concept"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-400/15 to-orange-400/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-violet-400/10 to-fk-primary/10 blur-3xl"
          aria-hidden
        />

        <ScrollReveal>
          <SectionLabel>De realiteit</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-extrabold text-fk-navy sm:text-4xl lg:text-5xl">
            We spenderen duizenden euro&apos;s om kandidaten te vinden.
            <span className="mt-2 block">
              <GradientText as="span" className="text-3xl sm:text-4xl lg:text-5xl">
                En het wordt alleen maar duurder.
              </GradientText>
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100} className="relative mt-14">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-fk-navy/45">
            Het klassieke recruitment-pad
          </p>
          <DeckAnimatedFlow steps={RECRUITMENT_FLOW} />
        </ScrollReveal>

        <ScrollReveal delay={150} className="mt-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {REALITY_PAIN_POINTS.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 80} direction="up">
                <Card
                  hover
                  className={`animate-reality-drift h-full border bg-gradient-to-br ${point.accent} p-5 stagger-${(i % 3) + 1}`}
                >
                  <span className="text-2xl">{point.emoji}</span>
                  <h3 className="mt-3 font-bold text-fk-navy">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fk-navy/65">
                    {point.desc}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-14 grid auto-rows-fr gap-4 sm:grid-cols-3">
            {REALITY_DRIVERS.map((driver, i) => (
              <ScrollReveal
                key={driver.label}
                delay={i * 80}
                direction="scale"
                className="h-full"
              >
                <div className="h-full">
                  <DeckStatTile
                    icon={driver.icon}
                    label={driver.label}
                    accent={driver.accent}
                    value={
                      <span className="text-xl sm:text-2xl">{driver.value}</span>
                    }
                  />
                  <p className="mt-2 text-center text-xs leading-relaxed text-fk-navy/50">
                    {driver.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="mt-14">
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-fk-navy/65">
            Vrijwel iedere recruiter gebruikt dezelfde kanalen. Daardoor stijgen
            de kosten terwijl goed talent steeds moeilijker bereikbaar wordt.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400} className="mt-16">
          <DeckQuote>Iedere recruiter vist in dezelfde vijver.</DeckQuote>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 2 */}
      <DeckSectionShell variant="light">
        <ScrollReveal>
          <SectionLabel>Een andere manier</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Wat als we niet 3 recruiters hebben...
            <span className="mt-2 block text-fk-primary">
              maar 300 Finders?
            </span>
          </h2>
        </ScrollReveal>

        <div className="mt-14">
          <FinderScaleVisual />
        </div>

        <ScrollReveal delay={150} className="mt-14">
          <DeckAnimatedFlow steps={FINDER_FLOW} />
        </ScrollReveal>

        <ScrollReveal delay={250} className="mt-14">
          <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-fk-navy/65">
            Iedere medewerker. Iedere kandidaat. Iedere klant. Iedere vriend.
            Iedere bekende. Kent potentieel talent.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={350} className="mt-16">
          <DeckQuote>
            Waarom zoeken naar talent...
            <span className="mt-2 block text-fk-primary">
              ...als je netwerk het al kent?
            </span>
          </DeckQuote>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 3 */}
      <DeckSectionShell variant="light" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-amber-400/15 to-orange-400/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tr from-violet-400/10 to-fk-primary/10 blur-3xl"
          aria-hidden
        />

        <ScrollReveal>
          <SectionLabel>Gamification</SectionLabel>
          <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Mensen houden van progressie.
            <GradientText variant="cool" as="span" className="mt-2 block text-3xl sm:text-4xl">
              En van zichtbare beloning.
            </GradientText>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {GAMIFICATION_CARDS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 70} direction="scale">
                <IconCard
                  icon={item.icon}
                  title={item.title}
                  emoji={item.emoji}
                  accent={item.accent}
                />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-14">
          <Card className="border-amber-200/60 bg-gradient-to-r from-amber-50/80 via-fk-white to-violet-50/80 p-6">
            <p className="mb-4 text-center text-sm font-semibold text-fk-navy/60">
              Engagement progressie
            </p>
            <ProgressBar progress={88} animated label="Motivatie-index" />
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={280} className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            {APP_REFERENCES.map((app, i) => (
              <span
                key={app}
                className={`animate-float rounded-full border border-fk-primary/15 bg-fk-white px-4 py-2 text-sm font-semibold text-fk-navy shadow-sm stagger-${i + 1}`}
              >
                {app}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={360} className="mt-14">
          <GamificationPodium />
        </ScrollReveal>

        <ScrollReveal delay={440} className="mt-12 text-center">
          <p className="text-2xl font-extrabold text-fk-primary sm:text-3xl">
            Gamification verandert gedrag.
          </p>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 4 */}
      <DeckSectionShell variant="muted">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <SectionLabel>De doorbraak</SectionLabel>
            <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl lg:text-5xl">
              Wat als we referral recruitment combineren met gamification?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-10">
            <Card variant="highlight" className="overflow-hidden border-0 p-0">
              <div className="relative p-8 sm:p-10">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fk-white/10 blur-2xl" />
                <p className="relative text-base leading-relaxed text-fk-white/90 sm:text-lg">
                  Dat idee vormde de basis van FK Scout Engine. Een platform
                  waarin mensen talent kunnen aandragen, XP verdienen, levels
                  behalen en rewards ontvangen wanneer hun kandidaat
                  daadwerkelijk waarde toevoegt.
                </p>
                <p className="relative mt-6 text-xl font-bold text-fk-white">
                  Niet door meer recruiters aan te nemen.
                  <span className="mt-2 block text-fk-white/80">
                    Maar door een Finderz Network te bouwen.
                  </span>
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </DeckSectionShell>

      {/* SECTIE 5 */}
      <DeckSectionShell variant="white" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-gradient-to-br from-blue-400/12 to-fk-primary/10 blur-3xl"
          aria-hidden
        />

        <ScrollReveal>
          <SectionLabel>Het Finderz Network</SectionLabel>
          <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Iedereen kan een Finder worden.
            <span className="mt-2 block text-fk-primary">
              En iedereen kan beloond worden.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FINDER_NETWORK.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 70} direction="scale">
                <IconCard
                  icon={item.icon}
                  title={item.title}
                  description={item.desc}
                  emoji={item.emoji}
                  accent={item.accent}
                />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="mt-14">
          <Card className="mx-auto max-w-2xl border-fk-primary/20 bg-gradient-to-r from-fk-primary-muted/50 via-fk-white to-blue-50/60 p-6 text-center sm:p-8">
            <p className="text-xl font-bold text-fk-navy">
              Niet de meeste namen winnen.
            </p>
            <p className="mt-2 text-2xl font-extrabold text-fk-primary">
              De beste matches winnen.
            </p>
          </Card>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 6 */}
      <DeckSectionShell variant="light">
        <HowItWorksSection />
      </DeckSectionShell>

      {/* SECTIE 7 */}
      <DeckSectionShell variant="white">
        <ScrollReveal>
          <SectionLabel>AVG & Vertrouwen</SectionLabel>
          <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Gebouwd voor kwaliteit.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="relative mt-12">
            <div
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
              aria-hidden
            >
              <div className="animate-trust-shield flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-fk-white shadow-lg shadow-emerald-500/25">
                <Shield size={36} />
              </div>
            </div>

            <div className="grid gap-6 pt-28 lg:grid-cols-3">
              {TRUST_CARDS.map((item, i) => {
                const styles = TRUST_ACCENT_STYLES[item.accent];
                return (
                  <ScrollReveal key={item.title} delay={i * 90} direction="up">
                    <Card
                      hover
                      className={`group h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${styles.card}`}
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition-transform duration-500 group-hover:scale-110 ${styles.icon}`}
                        >
                          {item.emoji}
                        </div>
                        <span
                          className={`animate-deck-shimmer rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-fk-navy">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-fk-navy/65">
                        {item.desc}
                      </p>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-12">
          <Card className="border-emerald-200/60 bg-gradient-to-r from-emerald-50/80 via-fk-white to-blue-50/80 p-6 text-center sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Onze belofte
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-fk-navy/70 sm:text-lg">
              Finderz Keeperz is gebouwd op vertrouwen. Geen data zonder
              toestemming, geen beloning zonder resultaat, en geen race naar
              kwantiteit ten koste van kwaliteit.
            </p>
          </Card>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 8 */}
      <DeckSectionShell variant="muted">
        <ScrollReveal>
          <SectionLabel>Status</SectionLabel>
          <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Van idee naar werkend prototype.
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <ScrollReveal delay={80}>
            <div className="grid gap-3 sm:grid-cols-2">
              {PROTOTYPE_ITEMS.map((item, i) => (
                <div
                  key={item}
                  className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-fk-primary/10 bg-fk-white px-4 py-3 text-sm font-medium text-fk-navy transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50/50"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-emerald-600"
                  />
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <PlatformDashboardMock />
        </div>

        <div className="mt-12">
          <PlatformMiniPreviews />
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_PREVIEWS.map((preview, i) => (
              <ScrollReveal key={preview.title} delay={i * 60} direction="scale">
                <ProductPreview {...preview} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="header-cta inline-flex items-center gap-2"
          >
            Bekijk live prototype
            <ChevronRight size={16} />
          </Link>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 9 */}
      <DeckSectionShell variant="light" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-400/12 to-blue-400/10 blur-3xl"
          aria-hidden
        />

        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <SectionLabel>Strategie</SectionLabel>
            <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
              Start klein. Denk groot.
            </h2>
            <p className="mt-3 text-fk-navy/55">De uitrolstrategie in drie fases.</p>
          </ScrollReveal>

          <ScrollReveal delay={100} className="mt-14">
            <div className="space-y-0">
              {ROADMAP.map((phase, i) => {
                const styles =
                  ROADMAP_ACCENT_STYLES[
                    phase.accent as keyof typeof ROADMAP_ACCENT_STYLES
                  ];
                return (
                  <ScrollReveal key={phase.phase} delay={i * 100} direction="up">
                    <Card
                      hover
                      className={`animate-podium-rise transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg ${styles.card}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-bold uppercase tracking-wider ${styles.phase}`}
                          >
                            {phase.phase}
                          </p>
                          <h3 className="mt-1 text-lg font-extrabold text-fk-navy">
                            {phase.title}
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {phase.stats.map((stat) => (
                              <span
                                key={stat}
                                className={`rounded-full px-3 py-1 text-sm font-semibold transition-transform duration-300 hover:scale-105 ${styles.badge}`}
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                          <ul className="mt-4 space-y-2">
                            {phase.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex items-start gap-2 text-sm leading-relaxed text-fk-navy/70"
                              >
                                <span
                                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`}
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {phase.channels.map((channel) => (
                              <span
                                key={channel}
                                className="rounded-lg border border-fk-primary/15 bg-fk-white/80 px-2.5 py-1 text-xs font-medium text-fk-navy/60"
                              >
                                {channel}
                              </span>
                            ))}
                          </div>
                          <p className={`mt-4 text-sm font-semibold ${styles.phase}`}>
                            Doel: {phase.goal}
                          </p>
                        </div>
                        <Rocket
                          size={24}
                          className={`shrink-0 ${styles.icon}`}
                        />
                      </div>
                    </Card>
                    {i < ROADMAP.length - 1 && (
                      <div className="py-2 text-center text-fk-primary/30">↓</div>
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </DeckSectionShell>

      {/* SECTIE 10 */}
      <DeckSectionShell variant="white" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-400/10 to-emerald-400/10 blur-3xl"
          aria-hidden
        />

        <ScrollReveal>
          <SectionLabel>Operationeel</SectionLabel>
          <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Licht, schaalbaar en efficiënt.
            <span className="mt-2 block text-emerald-600">
              Lage vaste kosten. Variabele rewards.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COST_CARDS.map((item, i) => (
              <ScrollReveal
                key={item.label}
                delay={i * 70}
                direction="scale"
                className="h-full"
              >
                <Card
                  hover
                  className={`flex h-full min-h-[148px] flex-col items-center justify-center border bg-gradient-to-br text-center transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md ${item.accent}`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-fk-navy/45">
                    {item.label}
                  </p>
                  <p className={`mt-2 text-2xl font-extrabold ${item.valueColor}`}>
                    {item.value}
                  </p>
                  <p className="mt-1 min-h-[1.25rem] text-sm text-fk-navy/50">
                    {item.unit}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 11 */}
      <DeckSectionShell variant="white">
        <ScrollReveal>
          <SectionLabel>Toekomst</SectionLabel>
          <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
            De volgende generatie werkt anders.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE_PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 70} direction="scale">
                <Card
                  hover
                  className={`h-full border bg-gradient-to-br ${pillar.accent} p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-md`}
                >
                  <span className="text-2xl">{pillar.emoji}</span>
                  <h3 className="mt-3 font-bold text-fk-navy">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fk-navy/65">
                    {pillar.desc}
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180} className="mt-14">
          <Card className="border-fk-primary/15 bg-gradient-to-r from-fk-primary-muted/40 via-fk-white to-fk-primary-muted/30 p-6 sm:p-8">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-fk-secondary">
              Bekende referenties
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {APP_REFERENCES.map((app, i) => (
                <span
                  key={app}
                  className={`animate-fade-in-up rounded-full border border-fk-primary/20 bg-fk-white px-4 py-2 text-sm font-bold text-fk-navy shadow-sm`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {app}
                </span>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-fk-navy/65 sm:text-base">
              Nieuwe generaties zijn gewend aan systemen die draaien op progressie,
              feedback en community — niet aan statische formulieren of
              anonieme vacaturebanken.
            </p>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={240} className="mt-14">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  line: "Niet alleen werken.",
                  accent: "Maar bijdragen.",
                  color: "text-fk-primary",
                },
                {
                  line: "Niet alleen consumeren.",
                  accent: "Maar deelnemen.",
                  color: "text-emerald-600",
                },
                {
                  line: "Niet alleen zoeken.",
                  accent: "Maar netwerken.",
                  color: "text-violet-600",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.line} delay={i * 80} direction="up">
                  <div className="rounded-2xl border border-fk-primary/10 bg-fk-white px-4 py-5 shadow-sm transition-all duration-500 hover:border-fk-primary/20 hover:shadow-md">
                    <p className="text-sm text-fk-navy/55">{item.line}</p>
                    <p className={`mt-1 font-extrabold ${item.color}`}>
                      {item.accent}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="text-base leading-relaxed text-fk-navy/65 sm:text-lg">
              Het Finderz Network wordt het recruitment-platform waar mensen
              graag onderdeel van zijn — omdat hun netwerk eindelijk waarde
              krijgt en elke bijdrage zichtbaar wordt beloond.
            </p>
          </div>
        </ScrollReveal>
      </DeckSectionShell>

      {/* SECTIE 12 */}
      <section className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <Card
          variant="highlight"
          className="relative mx-auto max-w-4xl overflow-hidden border-0 p-0"
        >
          <FloatingOrbs />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fk-white/10 blur-3xl" />

          <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
            <ScrollReveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fk-white/20 bg-fk-white/10 px-3 py-1 text-xs font-semibold text-fk-white/80">
                De visie
              </span>
              <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                Vandaag bouwen we een platform.
              </h2>
              <p className="mt-4 text-2xl font-bold text-fk-white/90 sm:text-3xl">
                Morgen bouwen we het Finderz Network.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200} className="mt-14">
              <p className="text-2xl font-extrabold sm:text-3xl">
                Waarom zoeken naar talent...
              </p>
              <p className="mt-2 text-2xl font-extrabold text-fk-white/80 sm:text-3xl">
                ...als je netwerk het al kent?
              </p>
            </ScrollReveal>

            <ScrollReveal delay={360} className="mt-14">
              <div className="flex flex-col items-center gap-2">
                <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Find Talent.
                </p>
                <p className="text-2xl font-extrabold tracking-tight text-fk-white/80 sm:text-3xl">
                  Keep Talent.
                </p>
                <p className="mt-6 flex items-center gap-2 text-sm font-medium text-fk-white/60">
                  <Network size={16} />
                  Powered by Finderz Keeperz
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Card>
      </section>
    </div>
  );
}
