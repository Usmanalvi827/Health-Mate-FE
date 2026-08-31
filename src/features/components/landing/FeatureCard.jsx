import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description, large }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={`shadow-card shadow-card-hover rounded-2xl border border-border bg-surface p-6 ${
        large ? "sm:p-8" : ""
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
        <Icon size={20} />
      </div>
      <h3 className={`mt-4 font-display text-ink ${large ? "text-2xl" : "text-lg"}`}>
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
