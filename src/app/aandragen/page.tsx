"use client";

import {
  Briefcase,
  CheckCircle2,
  Link2,
  Mail,
  Sparkles,
  Target,
  TrendingUp,
  User,
  UserPlus,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Confetti } from "@/components/animations/Confetti";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useScout } from "@/context/ScoutContext";
import { getReferralLink } from "@/lib/referrals";
import { STATUS_XP } from "@/lib/xp";
import type { CandidateFormData } from "@/types";

const emptyForm: CandidateFormData = {
  name: "",
  emailOrPhone: "",
  linkedin: "",
  role: "",
  description: "",
};

const xpSteps = [
  { label: "Aandragen", xp: STATUS_XP.nieuw, icon: UserPlus },
  { label: "Intake", xp: STATUS_XP.intake_gepland, icon: Mail },
  { label: "Voorgesteld", xp: STATUS_XP.voorgesteld, icon: Briefcase },
  { label: "Geplaatst", xp: STATUS_XP.geplaatst, icon: Target },
  { label: "Proeftijd", xp: STATUS_XP.proeftijd_gehaald, icon: TrendingUp },
];

const formFields = [
  {
    id: "name",
    label: "Naam kandidaat",
    type: "text",
    required: true,
    placeholder: "Bijv. Jan de Vries",
    icon: User,
  },
  {
    id: "emailOrPhone",
    label: "E-mail of telefoon",
    type: "text",
    required: true,
    placeholder: "jan@email.nl of 06-12345678",
    icon: Mail,
  },
  {
    id: "linkedin",
    label: "LinkedIn profiel",
    type: "url",
    required: false,
    placeholder: "https://linkedin.com/in/...",
    icon: Link2,
  },
  {
    id: "role",
    label: "Functie / interessegebied",
    type: "text",
    required: true,
    placeholder: "Bijv. Software Engineer",
    icon: Briefcase,
  },
] as const;

export default function AandragenPage() {
  const { submitCandidate, referralProfile, xp } = useScout();
  const [form, setForm] = useState<CandidateFormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    setReferralLink(getReferralLink(referralProfile.slug));
  }, [referralProfile.slug]);

  const formProgress = useMemo(() => {
    const required = ["name", "emailOrPhone", "role"] as const;
    const filled = required.filter((key) => form[key].trim().length > 0).length;
    return Math.round((filled / required.length) * 100);
  }, [form]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    submitCandidate(form);
    setLastName(form.name);
    setForm(emptyForm);
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-lg text-center">
          <Card className="relative overflow-hidden py-12 animate-celebrate">
            <Confetti />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg animate-pulse-glow">
                <CheckCircle2 size={40} className="animate-scale-in" />
              </div>
              <div className="animate-fade-in-up stagger-1 mb-4 inline-flex items-center gap-2 rounded-full bg-fk-primary px-4 py-2 text-sm font-bold text-fk-white shadow-md animate-xp-pop">
                <Zap size={16} />
                +10 XP verdiend!
              </div>
              <h1 className="animate-fade-in-up stagger-2 text-2xl font-extrabold text-fk-navy">
                Kandidaat aangedragen!
              </h1>
              <p className="animate-fade-in-up stagger-3 mt-3 text-fk-navy/65">
                <strong>{lastName}</strong> is succesvol aangedragen. Je hebt{" "}
                <span className="font-bold text-fk-primary">10 XP</span> verdiend.
              </p>
              <p className="animate-fade-in-up stagger-3 mt-2 text-sm font-semibold text-fk-secondary">
                Nieuw totaal: {xp.toLocaleString("nl-NL")} XP
              </p>
              <div className="animate-fade-in-up stagger-4 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/dashboard">Naar dashboard</Button>
                <Button href="/leaderboard" variant="outline">
                  Bekijk ranking
                </Button>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Nog een kandidaat
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-fk-primary via-fk-primary to-fk-secondary p-6 sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fk-white/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-fk-white/5 blur-xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fk-white/20 bg-fk-white/10 px-3 py-1 text-xs font-semibold text-fk-white/90 backdrop-blur-sm">
                  <Sparkles size={14} />
                  Scout activiteit
                </div>
                <h1 className="text-3xl font-extrabold text-fk-white sm:text-4xl">
                  Kandidaat aandragen
                </h1>
                <p className="mt-3 max-w-xl text-fk-white/85">
                  Ken jij talent? Draag hem of haar aan en verdien direct XP.
                  Elke succesvolle match telt mee voor je ranking.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center rounded-2xl border border-fk-white/20 bg-fk-white/10 px-6 py-4 backdrop-blur-sm">
                <Zap size={28} className="mb-1 text-fk-white" />
                <p className="text-3xl font-extrabold tabular-nums text-fk-white">
                  +10
                </p>
                <p className="text-sm font-semibold text-fk-white/75">XP direct</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <FadeIn delay={100}>
              <Card className="mb-4 border-fk-primary/15" hover>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-fk-navy/60">
                    Formulier voortgang
                  </span>
                  <span className="font-bold text-fk-primary">{formProgress}%</span>
                </div>
                <ProgressBar progress={formProgress} animated />
              </Card>
            </FadeIn>

            <FadeIn delay={150}>
              <Card hover>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formFields.map((field, i) => (
                    <div
                      key={field.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${180 + i * 70}ms` }}
                    >
                      <label
                        htmlFor={field.id}
                        className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-fk-navy"
                      >
                        <field.icon
                          size={15}
                          className={
                            activeField === field.id
                              ? "text-fk-primary"
                              : "text-fk-navy/40"
                          }
                        />
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required={field.required}
                        value={form[field.id]}
                        onChange={handleChange}
                        onFocus={() => setActiveField(field.id)}
                        onBlur={() => setActiveField(null)}
                        placeholder={field.placeholder}
                        className={`w-full rounded-xl border bg-fk-light px-4 py-3 text-sm text-fk-navy outline-none transition-all duration-300 focus:bg-fk-white focus:shadow-md ${
                          activeField === field.id
                            ? "border-fk-primary ring-2 ring-fk-primary/20 scale-[1.01]"
                            : "border-fk-primary/20"
                        }`}
                      />
                    </div>
                  ))}

                  <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "460ms" }}
                  >
                    <label
                      htmlFor="description"
                      className="mb-1.5 block text-sm font-semibold text-fk-navy"
                    >
                      Korte toelichting
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      onFocus={() => setActiveField("description")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Waarom is deze persoon geschikt? Wat zoekt hij/zij?"
                      className={`w-full resize-none rounded-xl border bg-fk-light px-4 py-3 text-sm text-fk-navy outline-none transition-all duration-300 focus:bg-fk-white focus:shadow-md ${
                        activeField === "description"
                          ? "border-fk-primary ring-2 ring-fk-primary/20"
                          : "border-fk-primary/20"
                      }`}
                    />
                  </div>

                  <div
                    className="animate-fade-in-up pt-2"
                    style={{ animationDelay: "520ms" }}
                  >
                    <Button
                      type="submit"
                      loading={loading}
                      className="w-full sm:w-auto"
                    >
                      <UserPlus size={18} />
                      Kandidaat aandragen · +10 XP
                    </Button>
                  </div>
                </form>
              </Card>
            </FadeIn>
          </div>

          <div className="space-y-4">
            <FadeIn delay={200}>
              <Card className="border-fk-primary/15 bg-gradient-to-br from-fk-white to-fk-primary/5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-fk-secondary">
                  <TrendingUp size={16} />
                  XP-reis per kandidaat
                </h3>
                <div className="space-y-3">
                  {xpSteps.map((step, i) => (
                    <div
                      key={step.label}
                      className="animate-slide-in-right flex items-center justify-between rounded-xl border border-fk-primary/10 bg-fk-white px-3 py-2.5"
                      style={{ animationDelay: `${240 + i * 60}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fk-primary-muted text-fk-primary">
                          <step.icon size={15} />
                        </div>
                        <span className="text-sm font-medium text-fk-navy">
                          {step.label}
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                        +{step.xp} XP
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-fk-navy/50">
                  Tot{" "}
                  <strong className="text-fk-primary">
                    {Object.values(STATUS_XP).reduce((a, b) => a + b, 0)} XP
                  </strong>{" "}
                  per succesvolle kandidaat.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={280}>
              <Card variant="glass" className="border-fk-primary/20">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-fk-navy">
                  <Link2 size={18} className="text-fk-primary" />
                  Deel je Scout-link
                </h3>
                <p className="mb-3 text-sm text-fk-navy/60">
                  Laat anderen via jouw link aandragen — jij verdient de XP.
                </p>
                <p className="mb-4 break-all rounded-lg border border-fk-primary/15 bg-fk-white px-3 py-2 text-xs font-semibold text-fk-primary">
                  {referralLink || `/ref/${referralProfile.slug}`}
                </p>
                <Link
                  href="/dashboard#scout-referral-link"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-fk-primary hover:text-fk-navy"
                >
                  Naar volledige referral card
                  <Sparkles size={14} />
                </Link>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
