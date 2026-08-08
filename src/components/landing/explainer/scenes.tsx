"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";

export type SceneId = "spot" | "share" | "match" | "reward" | "end";

export type SceneProps = {
  progress: number;
  reduced: boolean;
};

const spring = { type: "spring" as const, stiffness: 280, damping: 24 };
const soft = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div className="rx-phone">
      <div className="rx-phone-frame">
        <div className="rx-phone-notch" aria-hidden />
        <div className="rx-phone-screen">
          <div className="rx-phone-status">
            <span className="rx-phone-brand">referr</span>
            <span className="rx-phone-time">9:41</span>
          </div>
          <div className="rx-phone-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function VacancyCard({
  highlight = false,
  compact = false,
}: {
  highlight?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rx-vacancy${highlight ? " rx-vacancy--glow" : ""}${
        compact ? " rx-vacancy--compact" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-fk-primary-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-fk-primary">
          Nieuw
        </span>
        <span className="text-[11px] font-bold text-fk-navy">€250</span>
      </div>
      <p className="mt-2 text-[14px] font-bold tracking-tight text-fk-navy">
        Servicemonteur
      </p>
      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-fk-navy/45">
        <MapPin size={11} className="shrink-0" />
        Alkmaar · €3.200 – €4.200
      </p>
      {!compact && (
        <p className="mt-3 inline-flex rounded-full bg-fk-primary px-3 py-1.5 text-[10px] font-semibold text-white">
          Ken jij iemand?
        </p>
      )}
    </div>
  );
}

export function SpotScene({ progress, reduced }: SceneProps) {
  const showCard = reduced || progress > 0.08;
  const showCaption = reduced || progress > 0.45;
  const highlight = reduced || progress > 0.7;

  return (
    <div className="rx-scene">
      <PhoneChrome>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
          Challenges
        </p>
        <p className="mt-1 text-[15px] font-bold tracking-tight text-fk-navy">
          Wie ken jij vandaag?
        </p>
        <AnimatePresence>
          {showCard && (
            <motion.div
              key="vacancy"
              initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={spring}
              className="mt-3"
            >
              <VacancyCard highlight={highlight} />
            </motion.div>
          )}
        </AnimatePresence>
      </PhoneChrome>

      <motion.p
        className="rx-caption"
        initial={false}
        animate={{
          opacity: showCaption ? 1 : 0,
          y: showCaption ? 0 : 8,
        }}
        transition={soft}
      >
        Je kent iemand die perfect past.
      </motion.p>
    </div>
  );
}

export function ShareScene({ progress, reduced }: SceneProps) {
  const sheetUp = reduced || progress > 0.12;
  const showThomas = reduced || progress > 0.4;
  const sendCard = reduced || progress > 0.65;

  return (
    <div className="rx-scene">
      <PhoneChrome>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
          Deel vacature
        </p>
        <p className="mt-1 text-[15px] font-bold tracking-tight text-fk-navy">
          Servicemonteur
        </p>
        <div className="mt-3">
          <VacancyCard compact />
        </div>

        <motion.div
          className="rx-share-sheet"
          initial={false}
          animate={{
            y: sheetUp ? 0 : "110%",
            opacity: sheetUp ? 1 : 0,
          }}
          transition={spring}
        >
          <div className="rx-share-handle" aria-hidden />
          <p className="text-[12px] font-bold text-fk-navy">Deel via</p>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {[
              { label: "WhatsApp", tone: "wa" },
              { label: "LinkedIn", tone: "li" },
              { label: "Direct", tone: "di" },
            ].map((item) => (
              <div key={item.label} className={`rx-share-option rx-share-option--${item.tone}`}>
                <span />
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showThomas && (
              <motion.div
                key="thomas"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={soft}
                className="rx-contact mt-3"
              >
                <span className="rx-avatar" aria-hidden>
                  T
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-fk-navy">Thomas</p>
                  <p className="text-[10px] text-fk-navy/40">Servicemonteur · Alkmaar</p>
                </div>
                <span className="rounded-full bg-fk-primary px-2.5 py-1 text-[9px] font-bold text-white">
                  Stuur
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {sendCard && (
            <motion.div
              key="fly"
              className="rx-fly-card"
              initial={reduced ? false : { opacity: 0, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 40, 70], y: [0, -10, -40, -80], scale: [1, 1, 0.7, 0.4] }}
              transition={{ duration: reduced ? 0 : 1.1, ease: "easeInOut" }}
            >
              <VacancyCard compact />
            </motion.div>
          )}
        </AnimatePresence>
      </PhoneChrome>

      <motion.p
        className="rx-caption"
        initial={false}
        animate={{ opacity: sheetUp ? 1 : 0, y: sheetUp ? 0 : 8 }}
        transition={soft}
      >
        Deel ’m met iemand.
      </motion.p>
    </div>
  );
}

const MATCH_STEPS = ["Gedeeld", "In gesprek", "Match"] as const;

export function MatchScene({ progress, reduced }: SceneProps) {
  const activeIndex = reduced
    ? 2
    : progress < 0.25
      ? 0
      : progress < 0.5
        ? 1
        : 2;
  const showMatch = reduced || progress > 0.62;

  return (
    <div className="rx-scene">
      <PhoneChrome>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
          Introductie
        </p>
        <p className="mt-1 text-[15px] font-bold tracking-tight text-fk-navy">
          Status
        </p>

        <div className="rx-status mt-3">
          {MATCH_STEPS.map((step, i) => {
            const on = i <= activeIndex;
            return (
              <div key={step} className="rx-status-row">
                <div className="rx-status-rail">
                  <motion.span
                    className={`rx-status-dot${on ? " is-on" : ""}`}
                    animate={
                      reduced
                        ? undefined
                        : on
                          ? { scale: [1, 1.2, 1] }
                          : { scale: 1 }
                    }
                    transition={{ duration: 0.35 }}
                  />
                  {i < MATCH_STEPS.length - 1 && (
                    <span className={`rx-status-line${i < activeIndex ? " is-on" : ""}`} />
                  )}
                </div>
                <p className={`rx-status-label${on ? " is-on" : ""}`}>{step}</p>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {showMatch && (
            <motion.div
              key="match-card"
              initial={reduced ? false : { opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={spring}
              className="rx-match-card mt-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="rx-avatar rx-avatar--lg" aria-hidden>
                  T
                </span>
                <div>
                  <p className="text-[13px] font-bold text-fk-navy">Match!</p>
                  <p className="text-[11px] text-fk-navy/50">
                    Thomas is aangenomen 🎉
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[10px] font-medium text-fk-navy/40">
                Servicemonteur · Alkmaar
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </PhoneChrome>

      <motion.p
        className="rx-caption"
        initial={false}
        animate={{ opacity: showMatch ? 1 : 0.55, y: 0 }}
      >
        {showMatch ? "Het werkt." : "Jouw introductie loopt."}
      </motion.p>
    </div>
  );
}

export function RewardScene({ progress, reduced }: SceneProps) {
  const amount = reduced
    ? 250
    : progress < 0.2
      ? 0
      : progress < 0.4
        ? 50
        : progress < 0.6
          ? 100
          : 250;

  return (
    <div className="rx-scene">
      <PhoneChrome>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fk-primary">
          Beloning
        </p>
        <p className="mt-1 text-[15px] font-bold tracking-tight text-fk-navy">
          Referral succesvol
        </p>

        <motion.div
          className="rx-reward mt-3"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
            Jouw beloning
          </p>
          <p className="rx-reward-amount brand-wordmark mt-1">
            €{amount}
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-fk-navy/45">beloning</p>
          <div className="rx-reward-paid mt-3">
            <span className="rx-check" aria-hidden>
              ✓
            </span>
            Uitbetaald
          </div>
        </motion.div>
      </PhoneChrome>

      <motion.p
        className="rx-caption"
        initial={false}
        animate={{ opacity: progress > 0.35 || reduced ? 1 : 0, y: 0 }}
      >
        Jij helpt iemand aan een baan.
        <br />
        En wordt daarvoor beloond.
      </motion.p>
    </div>
  );
}

export function EndScene({ progress, reduced }: SceneProps) {
  const showCta = reduced || progress > 0.35;

  return (
    <div className="rx-scene rx-scene--end">
      <motion.div
        className="rx-end-phone"
        initial={false}
        animate={{
          scale: reduced ? 0.72 : 0.72 + (1 - Math.min(progress * 1.4, 1)) * 0.28,
          opacity: reduced ? 0.35 : 0.35 + (1 - Math.min(progress * 1.2, 1)) * 0.4,
        }}
        transition={soft}
      >
        <PhoneChrome>
          <VacancyCard compact />
        </PhoneChrome>
      </motion.div>

      <div className="rx-end-copy">
        <motion.h3
          className="rx-end-title"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...soft, delay: reduced ? 0 : 0.1 }}
        >
          SPOT. SHARE. MATCH.
        </motion.h3>
        <motion.p
          className="rx-end-sub"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...soft, delay: reduced ? 0 : 0.2 }}
        >
          Verdien door mensen aan elkaar te verbinden.
        </motion.p>
        <AnimatePresence>
          {showCta && (
            <motion.a
              key="cta"
              href="/vacatures"
              className="rx-end-cta"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={soft}
            >
              Ontdek Referr
              <span aria-hidden>→</span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
