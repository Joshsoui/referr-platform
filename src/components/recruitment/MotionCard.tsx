"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
}

export function MotionCard({ children, className = "" }: MotionCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`rounded-xl border border-fk-navy/[0.06] bg-fk-white p-5 sm:p-6 ${className}`}
      whileHover={
        reduced
          ? undefined
          : {
              borderColor: "rgba(15, 23, 42, 0.1)",
              boxShadow: "0 4px 20px -12px rgba(15, 23, 42, 0.12)",
            }
      }
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fk-navy/40">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-fk-navy sm:text-xl">
      {children}
    </h2>
  );
}
