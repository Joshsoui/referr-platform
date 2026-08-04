"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Copy, Facebook, Instagram, Linkedin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildChallengeShareMessage } from "@/lib/challengeShare";
import type { Vacancy } from "@/types/vacancy";

type Channel = "whatsapp" | "linkedin" | "facebook" | "instagram" | "copy" | "native";

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74 1.48.64 2.07.7 2.81.59.43-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

const SHARE_ACTIONS: Array<{
  channel: Exclude<Channel, "native">;
  label: string;
  icon: ReactNode;
  tone: string;
}> = [
  {
    channel: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon size={22} />,
    tone: "text-[#25D366] hover:border-[#25D366]/45 hover:bg-[#25D366]/8",
  },
  {
    channel: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin size={22} strokeWidth={1.75} />,
    tone: "text-[#0A66C2] hover:border-[#0A66C2]/45 hover:bg-[#0A66C2]/8",
  },
  {
    channel: "facebook",
    label: "Facebook",
    icon: <Facebook size={22} strokeWidth={1.75} />,
    tone: "text-[#1877F2] hover:border-[#1877F2]/45 hover:bg-[#1877F2]/8",
  },
  {
    channel: "instagram",
    label: "Instagram",
    icon: <Instagram size={22} strokeWidth={1.75} />,
    tone: "text-[#E4405F] hover:border-[#E4405F]/45 hover:bg-[#E4405F]/8",
  },
  {
    channel: "copy",
    label: "Kopieer link",
    icon: <Copy size={20} strokeWidth={1.75} />,
    tone: "text-fk-navy hover:border-fk-primary/40 hover:bg-fk-primary/5",
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

  const instagramPreviewText = useMemo(
    () => `${vacancy.title} · ${vacancy.location}`,
    [vacancy.location, vacancy.title]
  );

  if (!open) return null;

  async function shareTo(channel: Channel) {
    setPending(channel);
    setFeedback(null);
    try {
      const shareUrl = await createTrackedShareUrl(vacancy.id, channel);
      const message = buildChallengeShareMessage(vacancy, shareUrl);

      if (channel === "copy") {
        await navigator.clipboard.writeText(shareUrl);
        setFeedback("Link gekopieerd.");
        return;
      }

      if (
        channel === "native" &&
        typeof navigator !== "undefined" &&
        "share" in navigator
      ) {
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
        setFeedback(
          "Link gekopieerd. Deel de visual in je Story en plak de link erbij."
        );
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
    <div className="fixed inset-0 z-[120] bg-fk-navy/35 px-4 py-8" onClick={onClose}>
      <div
        className="mx-auto w-full max-w-lg rounded-2xl bg-fk-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
            Deel challenge
          </p>
          <h3 className="mt-1 text-xl font-bold text-fk-navy">{vacancy.title}</h3>
          <p className="text-sm text-fk-navy/60">{vacancy.location}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
          {SHARE_ACTIONS.map(({ channel, label, icon, tone }) => (
            <button
              key={channel}
              type="button"
              disabled={pending !== null}
              onClick={() => shareTo(channel)}
              aria-label={label}
              title={label}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border border-fk-primary/15 px-2 py-3 transition disabled:opacity-60 ${tone}`}
            >
              <span className="flex h-7 w-7 items-center justify-center">{icon}</span>
              <span className="text-[11px] font-semibold leading-tight text-fk-navy/70">
                {label}
              </span>
            </button>
          ))}
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              disabled={pending !== null}
              onClick={() => shareTo("native")}
              aria-label="Deel via telefoon"
              title="Deel via telefoon"
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-fk-primary/15 px-2 py-3 text-fk-navy transition hover:border-fk-primary/40 hover:bg-fk-primary/5 disabled:opacity-60"
            >
              <span className="flex h-7 w-7 items-center justify-center">
                <Smartphone size={20} strokeWidth={1.75} />
              </span>
              <span className="text-[11px] font-semibold leading-tight text-fk-navy/70">
                Via telefoon
              </span>
            </button>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-fk-primary/15 bg-fk-light/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
            Instagram Story visual
          </p>
          <div className="mt-2 rounded-xl bg-gradient-to-br from-fk-primary/15 via-fk-white to-fk-secondary/10 p-4">
            <p className="text-xs font-semibold uppercase text-fk-secondary">referr</p>
            <p className="mt-2 text-base font-bold text-fk-navy">{instagramPreviewText}</p>
            <p className="mt-1 text-sm text-fk-navy/65">Tip iemand en verdien een reward.</p>
          </div>
          <button
            type="button"
            onClick={() => shareTo("instagram")}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-fk-primary"
          >
            <Instagram size={15} />
            Open instructie & kopieer link
          </button>
          <p className="mt-1 text-xs text-fk-navy/55">
            Deel de visual in je Story en plak de link erbij.
          </p>
        </div>

        {feedback && (
          <p className="mt-3 rounded-lg bg-fk-primary-muted/40 px-3 py-2 text-sm text-fk-navy">
            {feedback}
          </p>
        )}

        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Sluiten
          </Button>
        </div>
      </div>
    </div>
  );
}
