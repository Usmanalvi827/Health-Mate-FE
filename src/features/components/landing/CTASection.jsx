function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div
        className="relative overflow-hidden rounded-3xl bg-brand px-8 py-14 text-center sm:px-16"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 0%, rgba(255,255,255,0.12) 0%, transparent 55%)",
          }}
        />
        <h2 className="font-display text-3xl text-white sm:text-4xl">
          Start organizing your family's health today.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-soft">
          Create an account and add your first family member in minutes.
        </p>
        <button className="mt-8 rounded-full bg-white px-7 py-3 font-medium text-brand-dark transition-transform hover:scale-[1.03]">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default CTASection;
