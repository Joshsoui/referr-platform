import type { ElementType, ReactNode } from "react";

const VARIANTS = {
  flame:
    "bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent",
  cool: "bg-gradient-to-r from-amber-500 via-fk-primary to-violet-500 bg-clip-text text-transparent",
  "flame-light":
    "bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-100 bg-clip-text text-transparent",
  gold: "bg-gradient-to-r from-amber-600 via-orange-500 to-amber-400 bg-clip-text text-transparent",
} as const;

export type GradientTextVariant = keyof typeof VARIANTS;

interface GradientTextProps {
  children: ReactNode;
  variant?: GradientTextVariant;
  className?: string;
  as?: ElementType;
}

export function GradientText({
  children,
  variant = "flame",
  className = "",
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag className={`${VARIANTS[variant]} ${className}`.trim()}>{children}</Tag>
  );
}
