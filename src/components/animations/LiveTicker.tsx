const items = [
  "Kevin de Vries +10 XP",
  "Emma Jansen +50 XP",
  "Mike van Dijk +500 XP",
  "Lennart Lakeman #1 Scout",
  "Sophie van der Meer +100 XP",
  "Joshua Souisay Elite Scout",
  "Peter Jansen +1000 XP",
];

export function LiveTicker() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-fk-primary/10 bg-fk-navy/50 py-3 backdrop-blur-sm">
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-fk-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-fk-secondary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
