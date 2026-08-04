"use client";

import { useMemo, useState } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildChallengeShareMessage } from "@/lib/challengeShare";
import type { Vacancy } from "@/types/vacancy";

type Channel = "whatsapp" | "linkedin" | "facebook" | "instagram" | "copy" | "native";

const CHANNEL_LABELS: Record<Exclude<Channel, "native">, string> = {
  whatsapp: "WhatsApp",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  copy: "Kopieer link",
};

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

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {(Object.keys(CHANNEL_LABELS) as Array<Exclude<Channel, "native">>).map((key) => (
            <button
              key={key}
              type="button"
              disabled={pending !== null}
              onClick={() => shareTo(key)}
              className="rounded-xl border border-fk-primary/15 px-3 py-2 text-sm font-semibold text-fk-navy transition hover:border-fk-primary/35 disabled:opacity-60"
            >
              {CHANNEL_LABELS[key]}
            </button>
          ))}
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              type="button"
              disabled={pending !== null}
              onClick={() => shareTo("native")}
              className="rounded-xl border border-fk-primary/15 px-3 py-2 text-sm font-semibold text-fk-navy transition hover:border-fk-primary/35 disabled:opacity-60"
            >
              Deel via telefoon
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
