"use client";

import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "right" | "scale" | "fade";
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const animClass = {
    up: "animate-fade-in-up",
    right: "animate-slide-in-right",
    scale: "animate-scale-in",
    fade: "animate-fade-in",
  }[direction];

  return (
    <div
      className={`${animClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
