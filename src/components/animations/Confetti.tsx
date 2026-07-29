"use client";

const COLORS = ["#ff4d59", "#ffaa20", "#0F172A", "#22C55E", "#F5F7FA"];

export function Confetti({ count = 24 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-1/3 h-2 w-2 rounded-sm"
          style={{
            left: `${10 + (i * 80) / count}%`,
            backgroundColor: COLORS[i % COLORS.length],
            animation: `confetti-fall ${1.2 + (i % 5) * 0.15}s ease-out ${(i % 8) * 0.05}s both`,
          }}
        />
      ))}
    </div>
  );
}
