"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  EndScene,
  MatchScene,
  RewardScene,
  ShareScene,
  SpotScene,
  type SceneId,
} from "./explainer/scenes";

const SCENES: { id: SceneId; duration: number; label: string }[] = [
  { id: "spot", duration: 3000, label: "Spot" },
  { id: "share", duration: 4000, label: "Share" },
  { id: "match", duration: 5000, label: "Match" },
  { id: "reward", duration: 4000, label: "Reward" },
  { id: "end", duration: 3000, label: "End" },
];

const TOTAL = SCENES.reduce((sum, s) => sum + s.duration, 0);

function sceneAt(elapsed: number): { id: SceneId; index: number; progress: number } {
  let t = elapsed % TOTAL;
  for (let i = 0; i < SCENES.length; i++) {
    if (t < SCENES[i].duration) {
      return { id: SCENES[i].id, index: i, progress: t / SCENES[i].duration };
    }
    t -= SCENES[i].duration;
  }
  return { id: "spot", index: 0, progress: 0 };
}

export function ReferrExplainer() {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const pausedRef = useRef(false);
  const lastRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const tick = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const delta = now - lastRef.current;
      lastRef.current = now;

      if (!pausedRef.current) {
        setElapsed((prev) => (prev + delta) % TOTAL);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [reduced]);

  const { id, index, progress } = reduced
    ? { id: "end" as SceneId, index: 4, progress: 1 }
    : sceneAt(elapsed);

  const onEnter = useCallback(() => {
    if (isFinePointer) setPaused(true);
  }, [isFinePointer]);

  const onLeave = useCallback(() => {
    if (isFinePointer) setPaused(false);
  }, [isFinePointer]);

  const Scene =
    id === "spot"
      ? SpotScene
      : id === "share"
        ? ShareScene
        : id === "match"
          ? MatchScene
          : id === "reward"
            ? RewardScene
            : EndScene;

  return (
    <section
      id="hoe-het-werkt"
      className="rx-section relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8"
      aria-label="Zo werkt Referr"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-80 max-w-3xl bg-[radial-gradient(ellipse_at_center,rgba(255,77,89,0.1),transparent_68%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
          Spot → Share → Match → Reward
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-fk-navy sm:text-5xl">
          Zo werkt het
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base font-medium text-fk-navy/45 sm:text-lg">
          In twintig seconden. Zonder uitleg.
        </p>
      </div>

      <div
        className="rx-stage relative mx-auto mt-10 sm:mt-14"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={reduced ? "static" : id}
            initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rx-stage-inner"
          >
            <Scene progress={progress} reduced={!!reduced} />
          </motion.div>
        </AnimatePresence>

        {!reduced && (
          <div className="rx-progress" aria-hidden>
            {SCENES.map((scene, i) => (
              <button
                key={scene.id}
                type="button"
                className={`rx-progress-dot${i === index ? " is-active" : ""}${
                  i < index ? " is-done" : ""
                }`}
                aria-label={scene.label}
                onClick={() => {
                  const offset = SCENES.slice(0, i).reduce((s, x) => s + x.duration, 0);
                  setElapsed(offset + 40);
                }}
              />
            ))}
          </div>
        )}

        {paused && isFinePointer && !reduced && (
          <p className="rx-paused-hint">Gepauzeerd</p>
        )}
      </div>
    </section>
  );
}
