export function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      <div
        className="animate-float-slow absolute -left-20 top-20 h-72 w-72 rounded-full bg-fk-primary/10 blur-3xl"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="animate-float absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-fk-secondary/10 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="animate-float-slow absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-fk-primary/15 blur-3xl"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(103,153,153,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,97,146,0.2) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
