"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Check, Copy, Instagram, Smartphone, X } from "lucide-react";
import { buildChallengeShareMessage } from "@/lib/challengeShare";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import type { Vacancy } from "@/types/vacancy";

type Channel = "whatsapp" | "linkedin" | "facebook" | "instagram" | "copy" | "native";

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74 1.48.64 2.07.7 2.81.59.43-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.54-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.62 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

const SOCIAL_CHANNELS: Array<{
  channel: "whatsapp" | "linkedin" | "facebook" | "instagram";
  label: string;
  icon: ReactNode;
  bg: string;
}> = [
  {
    channel: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon size={22} />,
    bg: "bg-[#25D366] hover:brightness-105",
  },
  {
    channel: "linkedin",
    label: "LinkedIn",
    icon: <LinkedInIcon size={18} />,
    bg: "bg-[#0A66C2] hover:brightness-105",
  },
  {
    channel: "facebook",
    label: "Facebook",
    icon: <FacebookIcon size={18} />,
    bg: "bg-[#1877F2] hover:brightness-105",
  },
  {
    channel: "instagram",
    label: "Instagram",
    icon: <InstagramIcon size={18} />,
    bg: "bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] hover:brightness-105",
  },
];

async function createTrackedShareUrl(challengeId: string, channel: Channel) {
  const response = await fetch("/api/shares", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, channel }),
  });
  if (!response.ok) throw new Error("share_create_failed");
  const data = (await response.json()) as { shareUrl: string };
  return data.shareUrl;
}

export function ChallengeShareModal({
  open,
  onClose,
  vacancy,
}: {
  open: boolean;
  onClose: () => void;
  vacancy: Vacancy;
}) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pending, setPending] = useState<Channel | null>(null);
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  const rewards = useMemo(
    () => getDifficultyRewards(vacancy.difficulty),
    [vacancy.difficulty]
  );

  useEffect(() => {
    setSupportsNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  useEffect(() => {
    if (!open) {
      setFeedback(null);
      setCopied(false);
      setPending(null);
    }
  }, [open]);

  if (!open) return null;

  async function shareTo(channel: Channel) {
    setPending(channel);
    setFeedback(null);
    setCopied(false);
    try {
      const shareUrl = await createTrackedShareUrl(vacancy.id, channel);
      const message = buildChallengeShareMessage(vacancy, shareUrl);

      if (channel === "copy") {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setFeedback("Link gekopieerd — plak hem waar je wilt.");
        return;
      }

      if (channel === "native" && supportsNativeShare) {
        await navigator.share({
          title: `Challenge: ${vacancy.title}`,
          text: message,
          url: shareUrl,
        });
        setFeedback("Challenge gedeeld.");
        return;
      }

      if (channel === "instagram") {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setFeedback("Link gekopieerd. Plak hem in je Instagram Story.");
        return;
      }

      const encodedUrl = encodeURIComponent(shareUrl);
      const encodedText = encodeURIComponent(message);
      const map: Record<"whatsapp" | "linkedin" | "facebook", string> = {
        whatsapp: `https://wa.me/?text=${encodedText}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      };
      if (channel === "whatsapp" || channel === "linkedin" || channel === "facebook") {
        window.open(map[channel], "_blank", "noopener,noreferrer");
      }
      setFeedback("Deelvenster geopend.");
    } catch {
      setFeedback("Delen lukte niet. Probeer opnieuw.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-fk-navy/50 px-0 py-0 backdrop-blur-[3px] sm:items-center sm:px-4 sm:py-8"
      onClick={onClose}
    >
      <div
        className="animate-fade-in-up w-full max-w-md overflow-hidden rounded-t-3xl bg-fk-white shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header band */}
        <div className="relative overflow-hidden border-b border-fk-navy/[0.06] bg-gradient-to-br from-fk-primary/[0.08] via-fk-white to-fk-secondary/[0.06] px-5 pb-5 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-fk-white/80 text-fk-navy/50 transition hover:bg-fk-white hover:text-fk-navy"
            aria-label="Sluiten"
          >
            <X size={18} />
          </button>

          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fk-secondary">
            Deel challenge
          </p>
          <h3 className="mt-1.5 pr-10 text-xl font-extrabold tracking-[-0.03em] text-fk-navy">
            {vacancy.title}
          </h3>
          <p className="mt-1 text-sm text-fk-navy/55">{vacancy.location}</p>
          <div className="mt-3 inline-flex flex-wrap items-center rounded-full bg-fk-white/90 px-3 py-1.5 text-xs font-semibold text-fk-navy shadow-sm ring-1 ring-fk-navy/[0.06]">
            Tot{" "}
            <span className="ml-1 text-fk-primary">{formatCurrency(rewards.total)}</span>
            <span className="mx-1.5 text-fk-navy/30">·</span>
            <span className="font-medium text-fk-navy/55">
              plaatsing + 2 mnd retentie
            </span>
          </div>
        </div>

        <div className="px-5 py-5">
          <p className="text-center text-sm font-medium text-fk-navy/60">
            Deel via
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:gap-5">
            {SOCIAL_CHANNELS.map(({ channel, label, icon, bg }) => {
              const busy = pending === channel;
              return (
                <button
                  key={channel}
                  type="button"
                  disabled={pending !== null}
                  onClick={() => shareTo(channel)}
                  aria-label={label}
                  className="group flex flex-col items-center gap-2 disabled:opacity-50"
                >
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md transition group-hover:scale-105 group-active:scale-95 ${bg} ${
                      busy ? "animate-pulse" : ""
                    }`}
                  >
                    {icon}
                  </span>
                  <span className="text-[11px] font-semibold text-fk-navy/65">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`mt-5 grid gap-2 ${
              supportsNativeShare ? "sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
            <button
              type="button"
              disabled={pending !== null}
              onClick={() => shareTo("copy")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-fk-navy/10 bg-fk-light/50 px-4 py-3 text-sm font-semibold text-fk-navy transition hover:border-fk-primary/30 hover:bg-fk-primary/[0.04] disabled:opacity-50"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              {copied ? "Gekopieerd" : "Kopieer link"}
            </button>
            {supportsNativeShare && (
              <button
                type="button"
                disabled={pending !== null}
                onClick={() => shareTo("native")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-fk-navy/10 bg-fk-light/50 px-4 py-3 text-sm font-semibold text-fk-navy transition hover:border-fk-primary/30 hover:bg-fk-primary/[0.04] disabled:opacity-50"
              >
                <Smartphone size={16} />
                Meer opties
              </button>
            )}
          </div>

          {/* Story preview */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
                Story-voorbeeld
              </p>
              <button
                type="button"
                disabled={pending !== null}
                onClick={() => shareTo("instagram")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-fk-primary hover:underline disabled:opacity-50"
              >
                <Instagram size={13} />
                Klaar voor Story
              </button>
            </div>

            <div className="mx-auto max-w-[220px]">
              <div className="overflow-hidden rounded-[1.35rem] border-[3px] border-fk-navy/90 bg-fk-navy shadow-lg">
                <div className="relative aspect-[9/14] overflow-hidden bg-gradient-to-b from-[#ff6b75] via-[#ff4d59] to-[#c43d8a] p-4">
                  <div className="absolute inset-x-6 top-3 h-1 rounded-full bg-white/35" />
                  <div className="mt-6">
                    <p className="text-lg font-extrabold tracking-tight text-white">
                      referr
                    </p>
                  </div>
                  <div className="mt-8 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fk-secondary">
                      Challenge
                    </p>
                    <p className="mt-1.5 text-base font-extrabold leading-snug tracking-[-0.02em] text-fk-navy">
                      {vacancy.title}
                    </p>
                    <p className="mt-1 text-xs text-fk-navy/55">{vacancy.location}</p>
                    <p className="mt-3 text-sm font-bold text-fk-primary">
                      Beloning {formatCurrency(rewards.total)}
                    </p>
                  </div>
                  <p className="absolute bottom-5 left-4 right-4 text-center text-xs font-semibold text-white/90">
                    Tip iemand. Beloning bij plaatsing.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-fk-navy/50">
              Screenshot of sla op, deel in je Story en plak de link.
            </p>
          </div>

          {feedback && (
            <p className="mt-4 rounded-2xl bg-fk-primary-muted/50 px-3 py-2.5 text-center text-sm font-medium text-fk-navy">
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
