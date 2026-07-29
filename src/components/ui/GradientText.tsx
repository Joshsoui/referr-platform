import type { ElementType, ReactNode } from "react";

const VARIANTS = {
  flame:
    "bg-gradient-to-r from-[#ff4d59] to-[#ffaa20] bg-clip-text text-transparent",
  cool: "bg-gradient-to-r from-[#ff4d59] to-[#ffaa20] bg-clip-text text-transparent",
  "flame-light":
    "bg-gradient-to-r from-[#ffaa20] via-[#ff4d59] to-[#ffaa20] bg-clip-text text-transparent",
  gold: "bg-gradient-to-r from-[#ff4d59] to-[#ffaa20] bg-clip-text text-transparent",
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
