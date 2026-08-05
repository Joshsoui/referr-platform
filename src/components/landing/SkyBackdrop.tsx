type SkyBackdropProps = {
  reduced: boolean;
};

export function SkyBackdrop({ reduced }: SkyBackdropProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="cs-sky-core" />
      <div
        className={`cs-sky-glow${reduced ? "" : " cs-sky-glow--live"}`}
      />
    </div>
  );
}
