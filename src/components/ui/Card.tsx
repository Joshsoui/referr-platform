import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "highlight";
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  variant = "default",
  hover = false,
}: CardProps) {
  const variants = {
    default: "bg-fk-white border border-fk-primary/10 shadow-sm",
    glass: "bg-fk-primary/10 border border-fk-primary/20 backdrop-blur-sm",
    highlight:
      "bg-gradient-to-br from-fk-primary via-fk-primary to-fk-secondary text-fk-white shadow-lg animate-gradient",
  };

  return (
    <div
      className={`rounded-2xl p-6 ${variants[variant]} ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
