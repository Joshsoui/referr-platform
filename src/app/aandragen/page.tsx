"use client";

import { CheckCircle2, Sparkles, UserPlus, Zap } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Confetti } from "@/components/animations/Confetti";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import type { CandidateFormData } from "@/types";

const emptyForm: CandidateFormData = {
  name: "",
  emailOrPhone: "",
  linkedin: "",
  role: "",
  description: "",
};

export default function AandragenPage() {
  const { submitCandidate } = useScout();
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
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg">
                <CheckCircle2 size={40} className="animate-scale-in" />
              </div>
              <div className="animate-fade-in-up stagger-1 mb-4 inline-flex items-center gap-2 rounded-full bg-fk-primary/10 px-4 py-2 text-sm font-bold text-fk-primary">
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
              <div className="animate-fade-in-up stagger-4 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/dashboard">Naar dashboard</Button>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
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
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <UserPlus size={22} />
            </div>
            <h1 className="text-3xl font-extrabold text-fk-navy">
              Kandidaat aandragen
            </h1>
            <p className="mt-2 text-fk-navy/60">
              Ken jij iemand die op zoek is naar een nieuwe uitdaging? Draag
              hem of haar aan en verdien direct{" "}
              <span className="inline-flex items-center gap-1 font-bold text-fk-primary">
                <Sparkles size={14} />
                10 XP
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
                  { id: "name", label: "Naam kandidaat", type: "text", required: true, placeholder: "Bijv. Jan de Vries" },
                  { id: "emailOrPhone", label: "E-mail of telefoon", type: "text", required: true, placeholder: "jan@email.nl of 06-12345678" },
                  { id: "linkedin", label: "LinkedIn profiel", type: "url", required: false, placeholder: "https://linkedin.com/in/..." },
                  { id: "role", label: "Functie / interessegebied", type: "text", required: true, placeholder: "Bijv. Software Engineer" },
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
                  placeholder="Waarom is deze persoon geschikt? Wat zoekt hij/zij?"
                  className="w-full resize-none rounded-xl border border-fk-primary/20 bg-fk-light px-4 py-3 text-sm text-fk-navy outline-none transition-all duration-200 focus:border-fk-primary focus:bg-fk-white focus:ring-2 focus:ring-fk-primary/20 focus:shadow-sm"
                />
              </div>

              <Button type="submit" loading={loading} className="w-full sm:w-auto">
                Kandidaat aandragen
              </Button>
            </form>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
