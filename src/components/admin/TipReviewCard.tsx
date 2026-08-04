"use client";

import {
  ArrowRight,
  Check,
  Copy,
  Link2,
  Mail,
  MessageCircle,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { CASH_STATUS_LABELS } from "@/lib/mockQualityRules";
import { getConfidenceLabel } from "@/lib/scoring";
import { formatCurrency, STATUS_LABELS, STATUS_ORDER } from "@/lib/xp";
import type { Candidate, CandidateStatus } from "@/types";
import type { CashStatus } from "@/types/incentives";
import type { Vacancy } from "@/types/vacancy";

function statusVariant(
  status: CandidateStatus
): "default" | "success" | "warning" | "info" {
  switch (status) {
    case "proeftijd_gehaald":
    case "geplaatst":
      return "success";
    case "intake_gepland":
    case "voorgesteld":
      return "info";
    default:
      return "warning";
  }
}

function rewardStageIndex(cashStatus: CashStatus): number {
  if (cashStatus === "retentie_goedgekeurd") return 3;
  if (
    cashStatus === "plaatsing_goedgekeurd" ||
    cashStatus === "plaatsing_in_behandeling"
  ) {
    return 2;
  }
  if (
    cashStatus === "intake_goedgekeurd" ||
    cashStatus === "intake_in_behandeling"
  ) {
    return 1;
  }
  return 0;
}

export function TipReviewCard({
  candidate,
  vacancy,
  conversationReward,
  placementReward,
  retentionReward,
  nextStatus,
  isFlashing,
  isUpdating,
  index,
  onApprove,
  onReject,
  onDuplicate,
  onAssignVacancy,
  onGrantConversation,
  onGrantPlacement,
  onGrantRetention,
  onCashStatus,
  onAdvanceStatus,
  vacancies,
}: {
  candidate: Candidate;
  vacancy?: Vacancy;
  conversationReward: number;
  placementReward: number;
  retentionReward: number;
  nextStatus: CandidateStatus | null;
  isFlashing: boolean;
  isUpdating: boolean;
  index: number;
  vacancies: Vacancy[];
  onApprove: () => void;
  onReject: () => void;
  onDuplicate: () => void;
  onAssignVacancy: (vacancyId: string) => void;
  onGrantConversation: () => void;
  onGrantPlacement: () => void;
  onGrantRetention: () => void;
  onCashStatus: (status: CashStatus) => void;
  onAdvanceStatus: () => void;
}) {
  const reduced = useReducedMotion();
  const statusIdx = STATUS_ORDER.indexOf(candidate.status);
  const rewardIdx = rewardStageIndex(candidate.cashStatus);
  const rewardStages = [
    {
      key: "gesprek",
      label: "Gesprek",
      amount: conversationReward,
      onGrant: onGrantConversation,
    },
    {
      key: "plaatsing",
      label: "Plaatsing",
      amount: placementReward,
      onGrant: onGrantPlacement,
    },
    {
      key: "retentie",
      label: "Retentie",
      amount: retentionReward,
      onGrant: onGrantRetention,
    },
  ] as const;

  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04, ease: "easeOut" }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -2,
              boxShadow: "0 12px 28px -18px rgba(15, 23, 42, 0.28)",
            }
      }
      className={`overflow-hidden rounded-2xl border border-fk-navy/[0.07] bg-fk-white shadow-sm transition-colors ${
        isFlashing ? "animate-row-flash ring-2 ring-fk-primary/25" : ""
      }`}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fk-primary/10 text-fk-primary">
                  <UserRound size={16} />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold tracking-[-0.02em] text-fk-navy">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-fk-navy/55">
                    Getipt door {candidate.referredBy}
                    {candidate.sector ? ` · ${candidate.sector}` : ""}
                  </p>
                </div>
              </div>
              {vacancy ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-fk-light/80 px-2.5 py-1 text-xs font-medium text-fk-navy/70">
                    {vacancy.title}
                  </span>
                  <DifficultyBadge difficulty={vacancy.difficulty} size="sm" />
                </div>
              ) : (
                <p className="mt-3 text-xs font-medium text-amber-700">
                  Nog geen challenge gekoppeld
                </p>
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Badge variant={statusVariant(candidate.status)}>
                {STATUS_LABELS[candidate.status]}
              </Badge>
              <Badge
                variant={
                  candidate.referralApproval === "goedgekeurd"
                    ? "success"
                    : candidate.referralApproval === "afgekeurd"
                      ? "warning"
                      : "info"
                }
              >
                {candidate.referralApproval}
              </Badge>
              {candidate.duplicateStatus !== "uniek" && (
                <Badge variant="warning">{candidate.duplicateStatus}</Badge>
              )}
            </div>
          </div>

          {/* Pipeline */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
              Voortgang tip
            </p>
            <div className="flex items-center gap-1">
              {STATUS_ORDER.map((step, i) => {
                const done = i <= statusIdx;
                const current = i === statusIdx;
                return (
                  <div key={step} className="flex min-w-0 flex-1 items-center gap-1">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                        done
                          ? "bg-fk-primary text-white"
                          : "bg-fk-navy/8 text-fk-navy/35"
                      } ${current ? "ring-2 ring-fk-primary/30 ring-offset-1" : ""}`}
                      title={STATUS_LABELS[step]}
                    >
                      {done && i < statusIdx ? <Check size={12} /> : i + 1}
                    </div>
                    {i < STATUS_ORDER.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 rounded-full transition-colors ${
                          i < statusIdx ? "bg-fk-primary" : "bg-fk-navy/10"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-1.5 text-xs text-fk-navy/50">
              {STATUS_LABELS[candidate.status]}
            </p>
          </div>

          {/* Meta */}
          <div className="grid gap-2 sm:grid-cols-3">
            <MetaChip
              icon={<Link2 size={14} />}
              label="LinkedIn"
              value={candidate.linkedin || "—"}
            />
            <MetaChip
              icon={<Mail size={14} />}
              label="Contact"
              value={candidate.emailOrPhone || "—"}
            />
            <MetaChip
              icon={<MessageCircle size={14} />}
              label="Relatie"
              value={candidate.relationship}
            />
          </div>

          {/* Confidence + beloning status */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-fk-navy/[0.06] bg-fk-light/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
                  Confidence
                </p>
                <span className="text-sm font-bold text-fk-primary">
                  {candidate.confidenceScore}/100
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-fk-navy/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-fk-primary to-fk-secondary"
                  initial={reduced ? false : { width: 0 }}
                  animate={{ width: `${candidate.confidenceScore}%` }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                />
              </div>
              <p className="mt-1.5 text-xs text-fk-navy/55">
                {getConfidenceLabel(candidate.confidenceScore)}
              </p>
            </div>
            <div className="rounded-xl border border-fk-navy/[0.06] bg-fk-light/40 p-3">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-fk-secondary" />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
                  Beloning
                </p>
              </div>
              <p className="mt-2 text-sm font-semibold text-fk-navy">
                {CASH_STATUS_LABELS[candidate.cashStatus]}
              </p>
              <p className="mt-1 text-xs text-fk-navy/50">
                Potentieel{" "}
                {formatCurrency(
                  conversationReward + placementReward + retentionReward
                )}
              </p>
            </div>
          </div>

          {/* Reward ladder */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
              <Sparkles size={12} />
              Beloningsladder
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {rewardStages.map((stage, i) => {
                const unlocked = rewardIdx > i;
                const active = rewardIdx === i;
                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={stage.onGrant}
                    className={`group rounded-xl border px-3 py-3 text-left transition ${
                      unlocked
                        ? "border-emerald-200 bg-emerald-50/80"
                        : active
                          ? "border-fk-primary/35 bg-fk-primary/5"
                          : "border-fk-navy/[0.08] bg-fk-white hover:border-fk-primary/30 hover:bg-fk-primary/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/45">
                        {stage.label}
                      </span>
                      {unlocked ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <span className="text-[10px] font-medium text-fk-navy/35 opacity-0 transition group-hover:opacity-100">
                          Toekennen
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-bold text-fk-navy">
                      {formatCurrency(stage.amount)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {candidate.recommendation && (
            <p className="rounded-xl border border-fk-navy/[0.05] bg-fk-light/50 px-4 py-3 text-sm leading-relaxed text-fk-navy/70">
              {candidate.recommendation}
            </p>
          )}
        </div>

        {/* Actions rail */}
        <div className="flex flex-col gap-3 border-t border-fk-navy/[0.06] bg-gradient-to-b from-fk-light/60 to-fk-white p-4 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-fk-secondary">
            Beoordeling
          </p>
          <div className="grid grid-cols-2 gap-2">
            <ActionButton
              onClick={onApprove}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              icon={<ThumbsUp size={14} />}
            >
              Goedkeuren
            </ActionButton>
            <ActionButton
              onClick={onReject}
              className="border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              icon={<ThumbsDown size={14} />}
            >
              Afkeuren
            </ActionButton>
          </div>
          <ActionButton
            onClick={onDuplicate}
            className="border border-fk-navy/10 bg-fk-white text-fk-navy hover:bg-fk-light"
            icon={<Copy size={14} />}
          >
            Markeer duplicate
          </ActionButton>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
              Challenge
            </span>
            <select
              value={candidate.vacancyId ?? ""}
              onChange={(e) => onAssignVacancy(e.target.value)}
              className="w-full rounded-xl border border-fk-navy/10 bg-fk-white px-3 py-2.5 text-xs font-medium text-fk-navy outline-none transition focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/15"
            >
              <option value="">Koppel challenge…</option>
              {vacancies.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
              Beloningsstatus
            </span>
            <select
              value={candidate.cashStatus}
              onChange={(e) => onCashStatus(e.target.value as CashStatus)}
              className="w-full rounded-xl border border-fk-navy/10 bg-fk-white px-3 py-2.5 text-xs font-medium text-fk-navy outline-none transition focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/15"
            >
              {Object.entries(CASH_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          {nextStatus && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={onAdvanceStatus}
              className="btn-press mt-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-fk-navy px-3 py-2.5 text-xs font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {isUpdating ? (
                "Bezig…"
              ) : (
                <>
                  Volgende: {STATUS_LABELS[nextStatus]}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function MetaChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-fk-navy/[0.06] bg-fk-white px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
        {icon}
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-medium text-fk-navy">{value}</p>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  className,
  icon,
}: {
  children: ReactNode;
  onClick: () => void;
  className: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
