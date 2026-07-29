const items = [
  "Kevin de Vries · introductie verstuurd",
  "Emma Jansen · eerste gesprek gepland",
  "Mike van Dijk · kandidaat aangenomen",
  "Lennart Lakeman · #1 op de ranglijst",
  "Sophie van der Meer · voorstel gedaan",
  "Joshua Souisay · Topverbinder",
  "Sanne de Vries · beloning uitbetaald",
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
