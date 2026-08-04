"use client";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Upload,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ReferralPipeline } from "@/components/ReferralPipeline";
import { ScoutConfidenceScore } from "@/components/ScoutConfidenceScore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useScout } from "@/context/ScoutContext";
import {
  INTEREST_REASONS,
  RELATIONSHIP_OPTIONS,
  SECTORS,
} from "@/lib/mockQualityRules";
import { calculateConfidenceScore } from "@/lib/scoring";
import type { CandidateFormData } from "@/types";

const STEPS = ["Wie", "Waarom", "Toestemming", "Controleren"];

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
  vacancyId: undefined,
};

type Tab = "actief" | "voltooid" | "niet_succesvol" | "nieuw";

function AandragenPageContent() {
  const searchParams = useSearchParams();
  const vacancyParam = searchParams.get("vacancy");
  const startNew = searchParams.get("nieuw") === "1";
  const { submitCandidate, candidates, vacancies, currentUser } = useScout();
  const [form, setForm] = useState<CandidateFormData>(emptyForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [consent, setConsent] = useState(false);
  const [tab, setTab] = useState<Tab>(
    vacancyParam || startNew ? "nieuw" : "actief"
  );

  const linkedVacancy = vacancyParam
    ? vacancies.find((v) => v.id === vacancyParam)
    : undefined;

  useEffect(() => {
    if (vacancyParam || startNew) setTab("nieuw");
  }, [vacancyParam, startNew]);

  useEffect(() => {
    if (linkedVacancy) {
      setForm((prev) => ({
        ...prev,
        sector: linkedVacancy.sector,
        role: linkedVacancy.title,
        vacancyId: linkedVacancy.id,
      }));
    }
  }, [linkedVacancy]);

  const myReferrals = candidates.filter((c) => c.referredBy === currentUser);
  const active = myReferrals.filter(
    (c) =>
      c.referralApproval !== "afgekeurd" && c.status !== "proeftijd_gehaald"
  );
  const completed = myReferrals.filter((c) => c.status === "proeftijd_gehaald");
  const unsuccessful = myReferrals.filter(
    (c) => c.referralApproval === "afgekeurd"
  );

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
    if (step === 1)
      return form.name.trim().length > 0 && form.linkedin.trim().length > 0;
    if (step === 2)
      return (
        !!form.sector &&
        form.reasons.length > 0 &&
        form.recommendation.trim().length >= 10
      );
    if (step === 3) return !!form.relationship && consent;
    if (step === 4) return canProceedStep4();
    return false;
  }

  function canProceedStep4(): boolean {
    return (
      form.name.trim().length > 0 &&
      form.linkedin.trim().length > 0 &&
      !!form.sector &&
      form.reasons.length > 0 &&
      form.recommendation.trim().length >= 10 &&
      !!form.relationship &&
      consent
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canProceedStep4()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const score = submitCandidate(form);
    setConfidenceScore(score);
    setLastName(form.name);
    setForm(emptyForm);
    setConsent(false);
    setStep(1);
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <Card className="py-12 animate-scale-in">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg">
              <CheckCircle2 size={40} />
            </div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full brand-gradient-bg px-4 py-2 text-sm font-bold text-fk-white">
              Introductie verstuurd
            </p>
            <h1 className="text-2xl font-bold text-fk-navy">
              Je challenge is gestart.
            </h1>
            <p className="mt-3 text-fk-navy/65">
              <strong>{lastName}</strong> is ontvangen. Je kunt de voortgang
              volgen via Mijn introducties.
            </p>
            <div className="mx-auto mt-6 max-w-sm text-left">
              <ScoutConfidenceScore score={confidenceScore} size="lg" />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setTab("actief");
                }}
              >
                Bekijk voortgang
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSubmitted(false);
                  setTab("nieuw");
                }}
              >
                Nog iemand introduceren
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const tabItems: { id: Tab; label: string; count?: number }[] = [
    { id: "actief", label: "Actief", count: active.length },
    { id: "voltooid", label: "Voltooid", count: completed.length },
    {
      id: "niet_succesvol",
      label: "Niet succesvol",
      count: unsuccessful.length,
    },
    { id: "nieuw", label: "Start introductie" },
  ];

  const listForTab =
    tab === "actief"
      ? active
      : tab === "voltooid"
        ? completed
        : tab === "niet_succesvol"
          ? unsuccessful
          : [];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-fk-navy">
              Mijn introducties
            </h1>
            <p className="mt-1 max-w-2xl text-fk-navy/55">
              Volg wat er gebeurt met de mensen die jij hebt voorgesteld. Start
              een nieuwe introductie wanneer je iemand kent.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={40}>
          <div className="mb-6 flex flex-wrap gap-2">
            {tabItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === item.id
                    ? "bg-fk-primary text-fk-white"
                    : "bg-fk-light text-fk-navy/60 hover:text-fk-navy"
                }`}
              >
                {item.label}
                {typeof item.count === "number" ? (
                  <span className="ml-1.5 opacity-70">{item.count}</span>
                ) : null}
              </button>
            ))}
          </div>
        </FadeIn>

        {tab !== "nieuw" ? (
          <FadeIn delay={80}>
            {listForTab.length === 0 ? (
              <Card className="border-fk-primary/15 py-12 text-center">
                <h2 className="text-lg font-bold text-fk-navy">
                  Nog geen introducties in deze categorie
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-fk-navy/60">
                  Ken jij iemand die past bij een open challenge? Start een
                  introductie.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setTab("nieuw")}>
                    Start introductie
                  </Button>
                </div>
              </Card>
            ) : (
              <ReferralPipeline candidates={listForTab} />
            )}
            <div className="mt-4 text-center">
              <Link
                href="/vacatures"
                className="text-sm font-semibold text-fk-primary hover:text-fk-navy"
              >
                Ontdek challenges →
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              {linkedVacancy && (
                <FadeIn>
                  <Card className="mb-4 border-fk-primary/15 bg-fk-primary-muted/30">
                    <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
                      Challenge
                    </p>
                    <p className="mt-1 font-bold text-fk-navy">
                      {linkedVacancy.title}
                    </p>
                    <p className="text-sm text-fk-navy/55">
                      {linkedVacancy.location} · {linkedVacancy.sector}
                    </p>
                  </Card>
                </FadeIn>
              )}

              <FadeIn delay={60}>
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
                  <ProgressBar
                    progress={stepProgress}
                    label={`Stap ${step} van ${STEPS.length}`}
                  />
                </Card>
              </FadeIn>

              <FadeIn delay={100}>
                <Card hover>
                  <form
                    onSubmit={
                      step === 4 ? handleSubmit : (e) => e.preventDefault()
                    }
                    className="space-y-5"
                  >
                    {step === 1 && (
                      <div className="animate-fade-in-up space-y-4">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-fk-navy">
                          <User size={20} className="text-fk-primary" />
                          Wie wil je introduceren?
                        </h2>
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-semibold text-fk-navy"
                          >
                            Voor- en achternaam *
                          </label>
                          <input
                            id="name"
                            name="name"
                            required
                            value={form.name}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, name: e.target.value }))
                            }
                            placeholder="Bijv. Mike Jansen"
                            className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="emailOrPhone"
                            className="mb-1.5 block text-sm font-semibold text-fk-navy"
                          >
                            E-mail of telefoon
                          </label>
                          <input
                            id="emailOrPhone"
                            name="emailOrPhone"
                            value={form.emailOrPhone}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                emailOrPhone: e.target.value,
                              }))
                            }
                            placeholder="mike@email.nl of 06-12345678"
                            className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="linkedin"
                            className="mb-1.5 block text-sm font-semibold text-fk-navy"
                          >
                            LinkedIn-profiel *
                          </label>
                          <input
                            id="linkedin"
                            name="linkedin"
                            required
                            value={form.linkedin}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                linkedin: e.target.value,
                              }))
                            }
                            placeholder="https://linkedin.com/in/..."
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
                              {form.cvUploaded
                                ? "CV geselecteerd"
                                : "Klik om CV te uploaden"}
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={() =>
                                setForm((p) => ({ ...p, cvUploaded: true }))
                              }
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="animate-fade-in-up space-y-4">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-fk-navy">
                          <Briefcase size={20} className="text-fk-primary" />
                          Waarom past deze persoon?
                        </h2>
                        {!linkedVacancy && (
                          <select
                            required
                            value={form.sector}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                sector: e.target
                                  .value as CandidateFormData["sector"],
                                role: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                          >
                            <option value="">Kies vakgebied...</option>
                            {SECTORS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        )}
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
                        <div>
                          <label
                            htmlFor="recommendation"
                            className="mb-1.5 block text-sm font-semibold text-fk-navy"
                          >
                            Jouw toelichting *
                          </label>
                          <textarea
                            id="recommendation"
                            required
                            maxLength={300}
                            rows={4}
                            value={form.recommendation}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                recommendation: e.target.value,
                                description: e.target.value,
                              }))
                            }
                            placeholder="Vertel in een paar zinnen waarom jij aan deze persoon denkt."
                            className="w-full resize-none rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
                          />
                          <p className="mt-1 text-right text-xs text-fk-navy/45">
                            {form.recommendation.length}/300
                          </p>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-lg font-bold text-fk-navy">
                          Toestemming
                        </h2>
                        <p className="text-sm text-fk-navy/60">
                          Hoe goed ken je deze persoon?
                        </p>
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
                                setForm((p) => ({
                                  ...p,
                                  relationship: opt.value,
                                }))
                              }
                            />
                            {opt.label}
                          </label>
                        ))}
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-fk-primary/15 bg-fk-primary-muted/40 px-4 py-3 text-sm leading-relaxed text-fk-navy/80">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-1"
                          />
                          <span>
                            Ik bevestig dat deze persoon weet van de
                            introductie, of dat ik volgens de juiste
                            toestemmingsafspraken contact mag laten opnemen over
                            deze rol. Gegevens worden alleen gebruikt voor deze
                            challenge.
                          </span>
                        </label>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-lg font-bold text-fk-navy">
                          Controle en versturen
                        </h2>
                        <div className="space-y-2 rounded-xl bg-fk-light px-4 py-3 text-sm text-fk-navy/75">
                          <p>
                            <span className="font-semibold text-fk-navy">
                              Naam:
                            </span>{" "}
                            {form.name}
                          </p>
                          <p>
                            <span className="font-semibold text-fk-navy">
                              Contact:
                            </span>{" "}
                            {form.emailOrPhone || "—"}
                          </p>
                          <p>
                            <span className="font-semibold text-fk-navy">
                              LinkedIn:
                            </span>{" "}
                            {form.linkedin}
                          </p>
                          <p>
                            <span className="font-semibold text-fk-navy">
                              Vakgebied:
                            </span>{" "}
                            {form.sector || linkedVacancy?.sector}
                          </p>
                          <p>
                            <span className="font-semibold text-fk-navy">
                              Waarom:
                            </span>{" "}
                            {form.recommendation}
                          </p>
                        </div>
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
                      {step < 4 ? (
                        <Button
                          type="button"
                          disabled={!canProceed()}
                          onClick={() => setStep((s) => s + 1)}
                        >
                          Volgende
                          <ArrowRight size={16} />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          loading={loading}
                          disabled={!canProceedStep4()}
                        >
                          <UserPlus size={18} />
                          Introductie versturen
                        </Button>
                      )}
                    </div>
                  </form>
                </Card>
              </FadeIn>
            </div>

            <FadeIn delay={140}>
              <div className="space-y-4">
                <ScoutConfidenceScore score={previewScore} />
                <Card className="border-fk-primary/15">
                  <p className="text-sm font-semibold text-fk-navy">
                    Jouw missie
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fk-navy/60">
                    Introduceer iemand die volgens jou perfect past. Daarna volg
                    je de voortgang hier.
                  </p>
                  <Link
                    href="/vacatures"
                    className="mt-3 inline-block text-sm font-semibold text-fk-primary"
                  >
                    Bekijk challenges →
                  </Link>
                </Card>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}


export default function AandragenPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-16 text-center text-sm text-fk-navy/50">
          Introducties laden…
        </div>
      }
    >
      <AandragenPageContent />
    </Suspense>
  );
}
