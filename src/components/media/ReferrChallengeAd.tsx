"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, RotateCcw } from "lucide-react";

const TOTAL = 15000;
const STEP = 50;

const spring = { type: "spring" as const, stiffness: 320, damping: 26 };
const soft = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

type Phase =
  | "challenge"
  | "join"
  | "refer"
  | "match"
  | "reward"
  | "next";

function phaseAt(t: number): { phase: Phase; local: number } {
  if (t < 3000) return { phase: "challenge", local: t / 3000 };
  if (t < 5000) return { phase: "join", local: (t - 3000) / 2000 };
  if (t < 8000) return { phase: "refer", local: (t - 5000) / 3000 };
  if (t < 11000) return { phase: "match", local: (t - 8000) / 3000 };
  if (t < 13000) return { phase: "reward", local: (t - 11000) / 2000 };
  return { phase: "next", local: (t - 13000) / 2000 };
}

function ChallengeCard({
  title,
  location,
  salary,
  reward,
  joined,
  completed,
  status,
}: {
  title: string;
  location: string;
  salary: string;
  reward: string;
  joined?: boolean;
  completed?: boolean;
  status?: string;
}) {
  return (
    <div className={`rca-card${completed ? " rca-card--done" : ""}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="rca-pill">
          {completed ? "Completed" : "Challenge"}
        </span>
        <span className="text-[13px] font-bold text-fk-navy">{reward}</span>
      </div>
      <p className="mt-2.5 text-[17px] font-bold leading-tight tracking-tight text-fk-navy">
        {title}
      </p>
      <p className="mt-1.5 flex items-center gap-1 text-[12px] text-fk-navy/45">
        <MapPin size={12} />
        {location}
      </p>
      <p className="mt-0.5 text-[12px] font-medium text-fk-navy/55">{salary}</p>
      {status && (
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fk-primary">
          {status}
        </p>
      )}
      {!completed && (
        <div
          className={`rca-cta mt-3${joined ? " rca-cta--joined" : ""}`}
        >
          {joined ? "✓ Challenge joined" : "Join challenge →"}
        </div>
      )}
      {completed && (
        <div className="rca-cta rca-cta--done mt-3">Challenge completed ✓</div>
      )}
    </div>
  );
}

type ReferrChallengeAdProps = {
  className?: string;
  autoPlay?: boolean;
  showReplay?: boolean;
};

export function ReferrChallengeAd({
  className = "",
  autoPlay = true,
  showReplay = true,
}: ReferrChallengeAdProps) {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(autoPlay && !reduced);
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    if (reduced) {
      setElapsed(TOTAL - 1);
      setPlaying(false);
      return;
    }

    if (!autoPlay) return;

    const id = window.setInterval(() => {
      if (!playingRef.current) return;
      setElapsed((prev) => {
        const next = prev + STEP;
        if (next >= TOTAL) {
          window.setTimeout(() => {
            playingRef.current = false;
            setPlaying(false);
          }, 0);
          return TOTAL - 1;
        }
        return next;
      });
    }, STEP);

    return () => window.clearInterval(id);
  }, [reduced, autoPlay]);

  const replay = useCallback(() => {
    setElapsed(0);
    setPlaying(true);
    playingRef.current = true;
  }, []);

  const { phase, local } = reduced
    ? { phase: "reward" as Phase, local: 1 }
    : phaseAt(elapsed);

  const rewardAmount = reduced
    ? 250
    : phase === "reward"
      ? local < 0.25
        ? 0
        : local < 0.45
          ? 50
          : local < 0.7
            ? 100
            : 250
      : phase === "next"
        ? 250
        : 0;

  const matchStep =
    phase === "match"
      ? local < 0.28
        ? 0
        : local < 0.55
          ? 1
          : 2
      : phase === "reward" || phase === "next"
        ? 2
        : -1;

  return (
    <div className={`rca-shell ${className}`}>
      <div className="rca-frame" aria-label="Referr Challenge Meta Ad">
        <div className="rca-stage">
          <AnimatePresence mode="wait">
            {(phase === "challenge" || phase === "join") && (
              <motion.div
                key="s1"
                className="rca-scene"
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={soft}
              >
                <motion.p
                  className="rca-kicker"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={spring}
                >
                  🔥 New challenge
                </motion.p>

                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ ...spring, delay: reduced ? 0 : 0.08 }}
                  className="mt-4 w-full"
                >
                  <ChallengeCard
                    title="Find a Service Technician"
                    location="Alkmaar"
                    salary="€3,200 – €4,200"
                    reward="€250"
                    joined={phase === "join" && local > 0.35}
                    status={
                      phase === "join" && local > 0.55
                        ? "Joshua · Challenge active"
                        : undefined
                    }
                  />
                </motion.div>

                {phase === "join" && local > 0.55 && (
                  <motion.div
                    className="rca-progress mt-4"
                    initial={{ opacity: 0, scaleX: 0.4 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                  >
                    <span />
                  </motion.div>
                )}

                {(phase === "challenge" && local > 0.55) || phase === "join" ? (
                  <motion.p
                    className="rca-big mt-6"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Know someone?
                  </motion.p>
                ) : null}
              </motion.div>
            )}

            {phase === "refer" && (
              <motion.div
                key="s3"
                className="rca-scene"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={soft}
              >
                <p className="rca-big">Know someone?</p>
                <motion.div
                  className="rca-cta rca-cta--solid mt-5"
                  animate={
                    local > 0.25
                      ? { scale: [1, 0.96, 1] }
                      : { scale: 1 }
                  }
                >
                  {local > 0.25 ? "✓ Referral submitted" : "Refer a candidate →"}
                </motion.div>

                <AnimatePresence>
                  {local > 0.35 && (
                    <motion.div
                      key="thomas"
                      className="rca-person mt-5"
                      initial={{ opacity: 0, y: 16, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={spring}
                    >
                      <span className="rca-avatar" aria-hidden>
                        T
                      </span>
                      <div>
                        <p className="text-[15px] font-bold text-fk-navy">Thomas</p>
                        <p className="text-[12px] text-fk-navy/45">
                          Service Technician
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {local > 0.65 && (
                  <motion.p
                    className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-fk-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Active → Candidate found
                  </motion.p>
                )}
              </motion.div>
            )}

            {phase === "match" && (
              <motion.div
                key="s4"
                className="rca-scene"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={soft}
              >
                <div className="rca-status">
                  {["Referred", "Interview", "Hired"].map((label, i) => (
                    <div key={label} className="rca-status-row">
                      <span
                        className={`rca-dot${i <= matchStep ? " is-on" : ""}`}
                      />
                      <p className={i <= matchStep ? "text-fk-navy" : "text-fk-navy/30"}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {matchStep >= 2 && (
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={spring}
                  >
                    <p className="rca-match">🎯 Match!</p>
                    <p className="mt-2 text-[15px] font-medium text-fk-navy/55">
                      Thomas got hired
                    </p>
                    <div className="mt-4">
                      <ChallengeCard
                        title="Find a Service Technician"
                        location="Alkmaar"
                        salary="€3,200 – €4,200"
                        reward="€250"
                        completed
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {phase === "reward" && (
              <motion.div
                key="s5"
                className="rca-scene"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={soft}
              >
                <p className="rca-kicker">🔥 Challenge completed</p>
                <p className="rca-reward brand-wordmark mt-4">+ €{rewardAmount}</p>
                <p className="mt-1 text-[14px] font-medium text-fk-navy/50">
                  Referral reward
                </p>
                <div className="rca-paid mt-5">✓ Paid</div>
              </motion.div>
            )}

            {phase === "next" && (
              <motion.div
                key="s6"
                className="rca-scene"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={soft}
              >
                <p className="rca-big text-[1.55rem]">Ready for the next one?</p>
                <div className="mt-5 w-full space-y-2">
                  {[
                    { t: "Service Technician", r: "€500" },
                    { t: "Project Engineer", r: "€750" },
                    { t: "Production Worker", r: "€250" },
                  ].map((c, i) => (
                    <motion.div
                      key={c.t}
                      className="rca-mini"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <p className="text-[13px] font-semibold text-fk-navy">{c.t}</p>
                      <p className="text-[12px] font-bold text-fk-primary">{c.r}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="brand-wordmark mt-6 text-[1.35rem] font-bold tracking-tight">
                  referr
                </p>
                <p className="mt-1 text-[13px] font-semibold text-fk-navy/55">
                  Join the challenge →
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showReplay && (
        <button type="button" className="rca-replay" onClick={replay}>
          <RotateCcw size={14} />
          Replay
        </button>
      )}
    </div>
  );
}
