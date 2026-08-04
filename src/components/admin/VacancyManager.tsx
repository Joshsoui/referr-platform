"use client";

import { useState } from "react";
import { Briefcase, Pencil, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { useScout } from "@/context/ScoutContext";
import { SECTORS } from "@/lib/mockQualityRules";
import type { VacancyDifficulty, VacancyFormData } from "@/types/vacancy";

const EMPTY_FORM: VacancyFormData = {
  title: "",
  sector: "",
  location: "",
  postalCode: "",
  latitude: undefined,
  longitude: undefined,
  description: "",
  difficulty: "easy",
  status: "open",
};

export function VacancyManager() {
  const { vacancies, addVacancy, updateVacancy } = useScout();
  const [form, setForm] = useState<VacancyFormData>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEdit(id: string) {
    const vacancy = vacancies.find((item) => item.id === id);
    if (!vacancy) return;

    setEditingId(id);
    setForm({
      title: vacancy.title,
      sector: vacancy.sector,
      location: vacancy.location,
      postalCode: vacancy.postalCode ?? "",
      latitude: vacancy.latitude,
      longitude: vacancy.longitude,
      description: vacancy.description,
      difficulty: vacancy.difficulty,
      status: vacancy.status,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title || !form.sector || !form.location) return;

    let latitude: number | undefined = form.latitude;
    let longitude: number | undefined = form.longitude;

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      const query = `${form.postalCode ? `${form.postalCode} ` : ""}${
        form.location
      }`.trim();

      try {
        const res = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        if (res.ok) {
          const data = (await res.json()) as {
            latitude?: number;
            longitude?: number;
          };
          if (typeof data.latitude === "number") latitude = data.latitude;
          if (typeof data.longitude === "number") longitude = data.longitude;
        }
      } catch {
        // ignore geocoding errors; vacancy will just not trigger nearby notifications
      }
    }

    const submitData: VacancyFormData = {
      ...form,
      postalCode: form.postalCode || undefined,
      latitude,
      longitude,
    };

    if (editingId) {
      updateVacancy(editingId, submitData);
    } else {
      addVacancy(submitData);
    }

    resetForm();
  }

  return (
    <Card className="mb-8 border-fk-primary/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fk-secondary text-fk-white">
          <Briefcase size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-fk-navy">Challenges beheren</h2>
          <p className="text-sm text-fk-navy/55">
            Stel difficulty in bij aanmaken of bewerken — dat bepaalt de beloning
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">Titel</span>
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
            placeholder="Bijv. Senior Werkvoorbereider"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">Sector</span>
          <select
            value={form.sector}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                sector: e.target.value as VacancyFormData["sector"],
              }))
            }
            className="w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
            required
          >
            <option value="">Kies sector...</option>
            {SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">Locatie</span>
          <input
            value={form.location}
            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
            placeholder="Bijv. Utrecht"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">
            Postcode (optioneel)
          </span>
          <input
            value={form.postalCode ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, postalCode: e.target.value }))
            }
            className="w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
            placeholder="Bijv. 3511"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">Difficulty</span>
          <select
            value={form.difficulty}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                difficulty: e.target.value as VacancyDifficulty,
              }))
            }
            className="w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
          >
            <option value="easy">🟢 Easy</option>
            <option value="hard">🟣 Hard</option>
            <option value="expert">🔴 Expert</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">Status</span>
          <select
            value={form.status}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                status: e.target.value as VacancyFormData["status"],
              }))
            }
            className="w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
          >
            <option value="open">Open</option>
            <option value="closed">Gesloten</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-semibold text-fk-navy">Omschrijving</span>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="min-h-24 w-full rounded-xl border border-fk-primary/20 px-3 py-2 text-sm"
            placeholder="Beschrijf de challenge..."
          />
        </label>

        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-fk-primary px-4 py-2 text-sm font-semibold text-white"
          >
            {editingId ? <Pencil size={16} /> : <Plus size={16} />}
            {editingId ? "Challenge opslaan" : "Challenge toevoegen"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-fk-primary/20 px-4 py-2 text-sm font-semibold text-fk-navy"
            >
              Annuleren
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {vacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            className="flex flex-col gap-3 rounded-xl border border-fk-primary/10 bg-fk-light px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-fk-navy">{vacancy.title}</p>
              <p className="text-sm text-fk-navy/55">
                {vacancy.sector} · {vacancy.location} · {vacancy.status}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={vacancy.difficulty} size="sm" />
              <button
                type="button"
                onClick={() => startEdit(vacancy.id)}
                className="rounded-lg border border-fk-primary/20 bg-fk-white px-3 py-1.5 text-xs font-semibold text-fk-navy"
              >
                Bewerken
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
