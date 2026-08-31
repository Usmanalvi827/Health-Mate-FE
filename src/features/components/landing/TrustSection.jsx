const points = [
  "Family-first, not one-size-fits-all",
  "Organized by design, not by memory",
  "One place for every family member",
  "Built for whoever keeps track",
];

function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 text-sm text-ink-soft sm:grid-cols-4">
        {points.map((point) => (
          <p key={point} className="text-center sm:text-left">
            {point}
          </p>
        ))}
      </div>
    </section>
  );
}

export default TrustStrip;
