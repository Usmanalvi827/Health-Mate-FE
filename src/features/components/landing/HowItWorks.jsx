import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Create your family", description: "Set up your account as the Family Head." },
  { number: "02", title: "Add family members", description: "Create a profile for each person you manage." },
  { number: "03", title: "Record their health information", description: "Blood group, allergies, conditions — the basics that matter." },
  { number: "04", title: "Manage medical records over time", description: "Add visits, prescriptions, and updates as they happen." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow">The process</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">How it works</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="font-display text-3xl text-accent">{step.number}</span>
              <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
