"use client";

import { CheckCircle2, Sparkles, UserPlus, Zap } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { getScoutBySlug } from "@/lib/referrals";
import type { CandidateFormData } from "@/types";

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

export default function ReferralPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const scout = getScoutBySlug(slug);
  const { submitReferralCandidate } = useScout();

  const [form, setForm] = useState<CandidateFormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!scout) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    submitReferralCandidate(form, scout.name);
    setLastName(form.name);
    setForm(emptyForm);
    setLoading(false);
    setSubmitted(true);
  }

  if (!scout) {
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <Card>
            <h1 className="text-2xl font-extrabold text-fk-navy">
              Finder niet gevonden
            </h1>
            <p className="mt-3 text-fk-navy/60">
              Deze Finderz Link is ongeldig of niet meer actief.
            </p>
            <div className="mt-6">
              <Button href="/">Terug naar home</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <Card className="py-12 animate-celebrate">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg">
              <CheckCircle2 size={40} className="animate-scale-in" />
            </div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-fk-primary/10 px-4 py-2 text-sm font-bold text-fk-primary">
              <Zap size={16} />
              +10 XP voor {scout.name.split(" ")[0]}
            </div>
            <h1 className="text-2xl font-extrabold text-fk-navy">
              Talent succesvol getipt!
            </h1>
            <p className="mt-3 text-fk-navy/65">
              Talent getipt via{" "}
              <strong className="text-fk-navy">{scout.name}</strong>.{" "}
              {scout.name.split(" ")[0]} ontvangt{" "}
              <span className="font-bold text-fk-primary">+10 XP</span>.
            </p>
            <p className="mt-2 text-sm text-fk-navy/50">
              <strong>{lastName}</strong> is succesvol geregistreerd.
            </p>
            <div className="mt-8">
              <Button href="/" variant="outline">
                Terug naar home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <Card
            variant="glass"
            className="mb-6 border-fk-primary/20 bg-gradient-to-r from-fk-primary/10 to-fk-secondary/10"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fk-primary text-sm font-bold text-fk-white">
                {scout.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-fk-secondary">
                  Jouw Finderz Link
                </p>
                <p className="mt-1 text-lg font-bold text-fk-navy">
                  Je tipt talent via Finder{" "}
                  <span className="text-fk-primary">{scout.name}</span>.
                </p>
                <p className="mt-2 text-sm text-fk-navy/60">
                  Vul het formulier in. Het talent wordt direct gekoppeld aan{" "}
                  {scout.name.split(" ")[0]} voor XP en Finderz League ranking.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <UserPlus size={22} />
            </div>
            <h1 className="text-3xl font-extrabold text-fk-navy">
              Tip Talent
            </h1>
            <p className="mt-2 text-fk-navy/60">
              Ken jij iemand met talent? Tip hem of haar via de Finderz Link van{" "}
              <span className="font-bold text-fk-primary">{scout.name}</span> en
              help verborgen talent zichtbaar maken{" "}
              <span className="inline-flex items-center gap-1 font-bold text-fk-primary">
                <Sparkles size={14} />
                +10 XP
              </span>
              .
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <Card hover>
            <form onSubmit={handleSubmit} className="space-y-5">
              {(
                [
                  {
                    id: "name",
                    label: "Naam talent",
                    type: "text",
                    required: true,
                    placeholder: "Bijv. Jan de Vries",
                  },
                  {
                    id: "emailOrPhone",
                    label: "E-mail of telefoon",
                    type: "text",
                    required: true,
                    placeholder: "jan@email.nl of 06-12345678",
                  },
                  {
                    id: "linkedin",
                    label: "LinkedIn-profiel",
                    type: "url",
                    required: false,
                    placeholder: "https://linkedin.com/in/...",
                  },
                  {
                    id: "role",
                    label: "Functie / interessegebied",
                    type: "text",
                    required: true,
                    placeholder: "Bijv. Software Engineer",
                  },
                ] as const
              ).map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-1.5 block text-sm font-semibold text-fk-navy"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.required}
                    value={form[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm text-fk-navy outline-none transition-all duration-200 focus:border-fk-primary focus:bg-fk-white focus:ring-2 focus:ring-fk-primary/20 focus:shadow-sm"
                  />
                </div>
              ))}

              <div>
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
                  placeholder="Waarom is dit talent geschikt? Wat zoekt hij/zij?"
                  className="w-full resize-none rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm text-fk-navy outline-none transition-all duration-200 focus:border-fk-primary focus:bg-fk-white focus:ring-2 focus:ring-fk-primary/20 focus:shadow-sm"
                />
              </div>

              <div className="rounded-xl border border-fk-primary/10 bg-fk-primary-muted px-4 py-3 text-sm text-fk-navy/70">
                Dit talent wordt gekoppeld aan{" "}
                <strong className="text-fk-primary">{scout.name}</strong>.
              </div>

              <Button type="submit" loading={loading} className="w-full sm:w-auto">
                Tip Talent via {scout.name.split(" ")[0]}
              </Button>
            </form>
          </Card>
        </FadeIn>

        <p className="mt-6 text-center text-xs text-fk-navy/45">
          Powered by{" "}
          <Link href="/" className="font-semibold text-fk-primary hover:underline">
            Finderz Keeperz · Finderz Network
          </Link>
        </p>
      </div>
    </div>
  );
}
