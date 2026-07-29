"use client";

import { useCallback, useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  calculateRevenue,
  clamp,
  formatInvestorEuro,
  REVENUE_INPUT_LIMITS,
  REVENUE_SCENARIOS,
  type ScenarioId,
} from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";

type InputKey =
  | "organizations"
  | "avgSubscription"
  | "placementsPerMonth"
  | "avgPlatformFee"
  | "monthlyOpCosts";

const INPUT_LABELS: Record<InputKey, string> = {
  organizations: "Aantal betalende organisaties",
  avgSubscription: "Gem. maandelijkse abonnementsomzet per organisatie",
  placementsPerMonth: "Succesvolle plaatsingen per maand",
  avgPlatformFee: "Gemiddelde platformfee per plaatsing",
  monthlyOpCosts: "Maandelijkse operationele kosten",
};

const SCENARIO_ORDER: ScenarioId[] = ["pilot", "groei", "schaal"];

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v) => String(v),
}: SliderFieldProps) {
  const clamped = clamp(value, min, max);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-fk-navy/70">
          {label}
        </label>
        <input
          id={`${id}-number`}
          type="number"
          min={min}
          max={max}
          step={step}
          value={clamped}
          onChange={(e) => {
            const parsed = Number(e.target.value);
            if (!Number.isNaN(parsed)) onChange(clamp(parsed, min, max));
          }}
          className="w-28 rounded-lg border border-fk-navy/12 bg-fk-white px-3 py-1.5 text-right text-sm font-semibold tabular-nums text-fk-navy focus:border-fk-primary focus:outline-none focus:ring-2 focus:ring-fk-primary/20"
          aria-label={`${label} — numerieke invoer`}
        />
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-fk-navy/10 accent-fk-primary"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-label={label}
      />
      <div className="flex justify-between text-[10px] text-fk-navy/35">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export function RevenueCalculator() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("pilot");
  const [inputs, setInputs] = useState(REVENUE_SCENARIOS.pilot);

  const results = useMemo(() => calculateRevenue(inputs), [inputs]);

  const loadScenario = (id: ScenarioId) => {
    setActiveScenario(id);
    setInputs({ ...REVENUE_SCENARIOS[id] });
  };

  const updateField = useCallback((key: InputKey, value: number) => {
    const limits = REVENUE_INPUT_LIMITS[key];
    setInputs((prev) => ({
      ...prev,
      [key]: clamp(value, limits.min, limits.max),
    }));
  }, []);

  const resetScenario = () => {
    setInputs({ ...REVENUE_SCENARIOS[activeScenario] });
  };

  const resultRows = [
    { label: "Maandelijkse abonnementsomzet", value: results.monthlySubscription },
    { label: "Maandelijkse omzet uit plaatsingen", value: results.monthlyPlacement },
    { label: "Totale maandelijkse omzet", value: results.totalMonthly, highlight: true },
    { label: "Jaarlijkse terugkerende omzet (abonnementen)", value: results.annualRecurring },
    { label: "Jaarlijkse totale omzet", value: results.annualRevenue, highlight: true },
    {
      label: "Operationeel resultaat vóór belasting (per maand)",
      value: results.operatingResult,
      highlight: true,
    },
  ];

  return (
    <InvestorSectionShell id="revenue-calculator" wide label="Businesscase">
      <InvestorHeadline>Interactieve businesscase</InvestorHeadline>
      <InvestorSubtext>
        Pas aannames aan en bekijk illustratieve scenario&apos;s. Geen voorspelling,
        wel inzicht in de economische logica.
      </InvestorSubtext>

      <div
        role="tablist"
        aria-label="Scenario's"
        className="mt-8 flex flex-wrap gap-2"
      >
        {SCENARIO_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeScenario === id}
            onClick={() => loadScenario(id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              activeScenario === id
                ? "brand-gradient-bg text-fk-white shadow-sm"
                : "border border-fk-navy/10 bg-fk-white text-fk-navy/65 hover:border-fk-primary/25"
            }`}
          >
            {REVENUE_SCENARIOS[id].label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card className="border-fk-primary/10">
          <div className="space-y-6">
            {(Object.keys(INPUT_LABELS) as InputKey[]).map((key) => {
              const limits = REVENUE_INPUT_LIMITS[key];
              const isEuro =
                key !== "organizations" && key !== "placementsPerMonth";
              return (
                <SliderField
                  key={key}
                  id={`revenue-${key}`}
                  label={INPUT_LABELS[key]}
                  value={inputs[key]}
                  min={limits.min}
                  max={limits.max}
                  step={key === "organizations" || key === "placementsPerMonth" ? 1 : 50}
                  onChange={(v) => updateField(key, v)}
                  format={(v) =>
                    isEuro ? formatInvestorEuro(v) : v.toLocaleString("nl-NL")
                  }
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={resetScenario}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fk-primary hover:text-fk-navy"
          >
            <RotateCcw size={14} />
            Herstel voorbeeldscenario
          </button>
        </Card>

        <Card className="border-fk-primary/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fk-primary">
            Scenario-resultaten
          </p>
          <dl className="mt-5 space-y-3">
            {resultRows.map((row) => (
              <div
                key={row.label}
                className={`flex flex-wrap items-baseline justify-between gap-2 rounded-xl px-3 py-2 ${
                  row.highlight ? "bg-fk-white/80" : ""
                }`}
              >
                <dt className="text-sm text-fk-navy/60">{row.label}</dt>
                <dd
                  className={`text-sm font-bold tabular-nums ${
                    row.highlight ? "text-fk-primary" : "text-fk-navy"
                  }`}
                >
                  {formatInvestorEuro(row.value)}
                  {row.label.includes("per maand") ? " per maand" : ""}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-xs leading-relaxed text-amber-900/80">
            Dit zijn scenario&apos;s en geen financiële voorspellingen of garanties.
          </p>
        </Card>
      </div>
    </InvestorSectionShell>
  );
}
