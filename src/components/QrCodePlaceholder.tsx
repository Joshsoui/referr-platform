interface QrCodePlaceholderProps {
  label?: string;
}

export function QrCodePlaceholder({ label = "FK" }: QrCodePlaceholderProps) {
  const pattern = [
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl border-2 border-fk-primary/15 bg-fk-white p-3 shadow-sm">
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${pattern[0].length}, 1fr)` }}
          aria-hidden
        >
          {pattern.flatMap((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className={`h-2.5 w-2.5 rounded-[1px] sm:h-3 sm:w-3 ${
                  cell ? "bg-fk-navy" : "bg-fk-light"
                }`}
              />
            ))
          )}
        </div>
        <p className="mt-2 text-center text-[10px] font-bold tracking-widest text-fk-primary">
          {label}
        </p>
      </div>
      <p className="mt-2 text-xs font-medium text-fk-navy/45">QR preview</p>
    </div>
  );
}
