import { motion } from "framer-motion";
import { Lock } from "lucide-react";

function SecuritySection() {
  return (
    <section id="security" className="border-y border-border bg-brand-soft">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="max-w-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-brand-dark">
            <Lock size={18} />
          </div>
          <h2 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
            Your family's information should stay private.
          </h2>
          <p className="mt-3 text-ink-soft">
            HealthMate is built around a single authenticated account. Your
            family's health information is only accessible when you're
            signed in as the Family Head.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default SecuritySection;
