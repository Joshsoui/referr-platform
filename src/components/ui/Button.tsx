import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  loading?: boolean;
}

const variants = {
  primary: "bg-fk-primary text-fk-white hover:bg-fk-navy shadow-sm",
  secondary: "bg-fk-secondary text-fk-white hover:bg-fk-primary shadow-sm",
  outline:
    "border-2 border-fk-primary text-fk-primary hover:bg-fk-primary hover:text-fk-white",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  loading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `btn-press inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-60 disabled:pointer-events-none ${variants[variant]} ${className}`;

  const content = loading ? (
    <>
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        style={{ animation: "spin-slow 0.7s linear infinite" }}
      />
      Even geduld...
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
