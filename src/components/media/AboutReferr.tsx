export function AboutReferr() {
  const steps = ["Challenge", "Refer", "Match", "Reward"];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fk-primary">
          What is Referr?
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-fk-navy sm:text-5xl">
          Referr turns recruitment into a{" "}
          <span className="brand-wordmark">challenge.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-fk-navy/50 sm:text-lg">
          Companies create challenges for the people they need. People refer
          people they know. When the right person gets hired, the challenge is
          completed — and the referrer gets rewarded.
        </p>

        <div className="media-flow mt-10">
          {steps.map((step, i) => (
            <div key={step} className="media-flow-item">
              <span className="media-flow-label">{step}</span>
              {i < steps.length - 1 && (
                <span className="media-flow-arrow" aria-hidden>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
