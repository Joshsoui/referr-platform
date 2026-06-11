"use client";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Link2,
  Sparkles,
  Upload,
  User,
  UserPlus,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Confetti } from "@/components/animations/Confetti";
import { FadeIn } from "@/components/animations/FadeIn";
import { ScoutConfidenceScore } from "@/components/ScoutConfidenceScore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useScout } from "@/context/ScoutContext";
import {
  INTEREST_REASONS,
  RELATIONSHIP_OPTIONS,
  SECTORS,
} from "@/lib/mockQualityRules";
import { getReferralLink } from "@/lib/referrals";
import { calculateConfidenceScore } from "@/lib/scoring";
import type { CandidateFormData } from "@/types";

const STEPS = [
  "Wie",
  "Sector",
  "Waarom",
  "Relatie",
  "Keeper",
];

const emptyForm: CandidateFormData = {
  name: "",
  emailOrPhone: "",
  linkedin: "",
  sector: "",
  reasons: [],
  relationship: "",
  recommendation: "",
  cvUploaded: false,
  role: "",
  description: "",
};

export default function AandragenPage() {
  const { submitCandidate, referralProfile, xp } = useScout();
  const [form, setForm] = useState<CandidateFormData>(emptyForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    setReferralLink(getReferralLink(referralProfile.slug));
  }, [referralProfile.slug]);

  const stepProgress = Math.round((step / STEPS.length) * 100);
  const previewScore = useMemo(() => calculateConfidenceScore(form), [form]);

  function toggleReason(reason: string) {
    setForm((prev) => ({
      ...prev,
      reasons: prev.reasons.includes(reason)
        ? prev.reasons.filter((r) => r !== reason)
        : [...prev.reasons, reason],
    }));
  }

  function canProceed(): boolean {
    if (step === 1) return form.name.trim().length > 0 && form.linkedin.trim().length > 0;
    if (step === 2) return !!form.sector;
    if (step === 3) return form.reasons.length > 0;
    if (step === 4) return !!form.relationship;
    if (step === 5) return form.recommendation.trim().length >= 10;
    return false;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canProceed()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const score = submitCandidate(form);
    setConfidenceScore(score);
    setLastName(form.name);
    setForm(emptyForm);
    setStep(1);
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
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg">
                <CheckCircle2 size={40} className="animate-scale-in" />
              </div>
              <div className="animate-fade-in-up stagger-1 mb-4 inline-flex items-center gap-2 rounded-full bg-fk-primary px-4 py-2 text-sm font-bold text-fk-white">
                <Zap size={16} />
                +10 XP{confidenceScore >= 70 ? " +25 bonus XP" : ""} verdiend!
              </div>
              <h1 className="animate-fade-in-up stagger-2 text-2xl font-extrabold text-fk-navy">
                Talent succesvol getipt!
              </h1>
              <p className="animate-fade-in-up stagger-3 mt-3 text-fk-navy/65">
                <strong>{lastName}</strong> is getipt. Je hebt <strong>10 XP</strong> verdiend voor jouw tip.
                {confidenceScore >= 70 && (
                  <> Inclusief <strong>25 XP</strong> bonus voor een sterke tip.</>
                )}
              </p>
              <div className="animate-fade-in-up stagger-3 mx-auto mt-6 max-w-sm text-left">
                <ScoutConfidenceScore score={confidenceScore} size="lg" />
              </div>
              <p className="animate-fade-in-up stagger-4 mt-4 text-sm text-fk-secondary">
                Nieuw totaal: {xp.toLocaleString("nl-NL")} XP
              </p>
              <div className="animate-fade-in-up stagger-4 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/dashboard">Naar dashboard</Button>
                <Button href="/leaderboard" variant="outline">
                  Bekijk Finderz League
                </Button>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Nieuw talent
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
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-fk-white/20 bg-fk-white/10 px-3 py-1 text-xs font-semibold text-fk-white/90">
                  <Sparkles size={14} />
                  Kwaliteit = hogere Finderz Score
                </div>
                <h1 className="text-3xl font-extrabold text-fk-white sm:text-4xl">
                  Tip Talent
                  <GradientText
                    variant="flame-light"
                    as="span"
                    className="mt-2 block text-2xl sm:text-3xl"
                  >
                    Eén tip kan alles veranderen.
                  </GradientText>
                </h1>
                <p className="mt-2 max-w-xl text-fk-white/85">
                  Ken jij iemand die beter op zijn plek zou zitten? Tip dit
                  talent bij Finderz Keeperz.
                </p>
              </div>
              <div className="rounded-2xl border border-fk-white/20 bg-fk-white/10 px-5 py-3 backdrop-blur-sm">
                <p className="text-xs text-fk-white/70">Talent Confidence Score</p>
                <p className="text-2xl font-extrabold text-fk-white">{previewScore}/100</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <FadeIn delay={100}>
              <Card className="mb-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {STEPS.map((label, i) => (
                    <span
                      key={label}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        step === i + 1
                          ? "bg-fk-primary text-fk-white"
                          : step > i + 1
                            ? "bg-fk-primary/15 text-fk-primary"
                            : "bg-fk-light text-fk-navy/40"
                      }`}
                    >
                      {i + 1}. {label}
                    </span>
                  ))}
                </div>
                <ProgressBar progress={stepProgress} label={`Stap ${step} van ${STEPS.length}`} />
              </Card>
            </FadeIn>

            <FadeIn delay={150}>
              <Card hover>
                <form
                  onSubmit={step === 5 ? handleSubmit : (e) => e.preventDefault()}
                  className="space-y-5"
                >
                  {step === 1 && (
                    <div className="animate-fade-in-up space-y-4">
                      <h2 className="flex items-center gap-2 text-lg font-bold text-fk-navy">
                        <User size={20} className="text-fk-primary" />
                        Stap 1: Wie wil je tippen?
                      </h2>
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-fk-navy">
                          Naam talent *
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Bijv. Kevin de Vries"
                          className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="linkedin" className="mb-1.5 block text-sm font-semibold text-fk-navy">
                          LinkedIn-profiel *
                        </label>
                        <input
                          id="linkedin"
                          name="linkedin"
                          required
                          value={form.linkedin}
                          onChange={(e) => setForm((p) => ({ ...p, linkedin: e.target.value }))}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="emailOrPhone" className="mb-1.5 block text-sm font-semibold text-fk-navy">
                          Telefoon of e-mail (optioneel)
                        </label>
                        <input
                          id="emailOrPhone"
                          name="emailOrPhone"
                          value={form.emailOrPhone}
                          onChange={(e) => setForm((p) => ({ ...p, emailOrPhone: e.target.value }))}
                          placeholder="jan@email.nl of 06-12345678"
                          className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-fk-navy">
                          CV upload (optioneel)
                        </label>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-fk-primary/25 bg-fk-light px-4 py-4 hover:bg-fk-primary/5">
                          <Upload size={20} className="text-fk-primary" />
                          <span className="text-sm text-fk-navy/60">
                            {form.cvUploaded ? "CV geselecteerd" : "Klik om CV te uploaden"}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={() => setForm((p) => ({ ...p, cvUploaded: true }))}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fade-in-up space-y-4">
                      <h2 className="flex items-center gap-2 text-lg font-bold text-fk-navy">
                        <Briefcase size={20} className="text-fk-primary" />
                        Stap 2: Waar past dit talent?
                      </h2>
                      <select
                        required
                        value={form.sector}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            sector: e.target.value as CandidateFormData["sector"],
                            role: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                      >
                        <option value="">Kies sector...</option>
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fade-in-up space-y-4">
                      <h2 className="text-lg font-bold text-fk-navy">
                        Stap 3: Waarom tip je dit talent?
                      </h2>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {INTEREST_REASONS.map((reason) => (
                          <label
                            key={reason}
                            className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                              form.reasons.includes(reason)
                                ? "border-fk-primary bg-fk-primary/5"
                                : "border-fk-primary/15 hover:bg-fk-light"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={form.reasons.includes(reason)}
                              onChange={() => toggleReason(reason)}
                              className="mt-1"
                            />
                            {reason}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="animate-fade-in-up space-y-3">
                      <h2 className="text-lg font-bold text-fk-navy">
                        Stap 4: Hoe goed ken je dit talent?
                      </h2>
                      {RELATIONSHIP_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                            form.relationship === opt.value
                              ? "border-fk-primary bg-fk-primary/5"
                              : "border-fk-primary/15"
                          }`}
                        >
                          <input
                            type="radio"
                            name="relationship"
                            checked={form.relationship === opt.value}
                            onChange={() =>
                              setForm((p) => ({ ...p, relationship: opt.value }))
                            }
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}

                  {step === 5 && (
                    <div className="animate-fade-in-up space-y-4">
                      <h2 className="text-lg font-bold text-fk-navy">
                        Stap 5: Waarom denk je dat dit talent een Keeper kan worden?
                      </h2>
                      <textarea
                        required
                        maxLength={300}
                        rows={5}
                        value={form.recommendation}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            recommendation: e.target.value,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Bijvoorbeeld: Kevin is een ervaren werkvoorbereider. Ik heb met hem gewerkt en weet dat hij openstaat voor een nieuwe stap dichter bij huis."
                        className="w-full resize-none rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                      />
                      <p className="text-right text-xs text-fk-navy/45">
                        {form.recommendation.length}/300
                      </p>
                      <ScoutConfidenceScore score={previewScore} />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep((s) => s - 1)}
                      >
                        <ArrowLeft size={16} />
                        Vorige
                      </Button>
                    )}
                    {step < 5 ? (
                      <Button
                        type="button"
                        disabled={!canProceed()}
                        onClick={() => setStep((s) => s + 1)}
                      >
                        Volgende
                        <ArrowRight size={16} />
                      </Button>
                    ) : (
                      <Button type="submit" loading={loading} disabled={!canProceed()}>
                        <UserPlus size={18} />
                        Tip Talent
                      </Button>
                    )}
                  </div>
                </form>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <div className="space-y-4">
              <ScoutConfidenceScore score={previewScore} />
              <Card variant="glass" className="border-fk-primary/20">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-fk-navy">
                  <Link2 size={18} className="text-fk-primary" />
                  Jouw Finderz Link
                </h3>
                <p className="mb-3 break-all text-xs font-semibold text-fk-primary">
                  {referralLink}
                </p>
                <Link href="/dashboard#finderz-link" className="text-sm font-semibold text-fk-primary hover:underline">
                  Volledige Finderz Link card →
                </Link>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
