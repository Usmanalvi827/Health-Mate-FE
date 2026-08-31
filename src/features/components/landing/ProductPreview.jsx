import { motion } from "framer-motion";
import { Activity, Pill, Stethoscope } from "lucide-react";

// Preview-only data, just to show what the real dashboard looks like.
const members = [
  { initials: "AR", name: "Ahmed", role: "Father" },
  { initials: "SF", name: "Sana", role: "Mother" },
  { initials: "MU", name: "Muhammad", role: "Son" },
  { initials: "ZR", name: "Zara", role: "Daughter" },
];

const activity = [
  { icon: Activity, text: "Blood pressure logged for Ahmed", time: "2 days ago" },
  { icon: Pill, text: "Medication added for Sana", time: "5 days ago" },
  { icon: Stethoscope, text: "Doctor visit recorded for Muhammad", time: "1 week ago" },
];

function ProductPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <p className="eyebrow">Preview</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          A dashboard built around your family, not a spreadsheet.
        </h2>
        <p className="mt-3 text-ink-soft">
          Open your family dashboard and see who's who, and what's changed
          recently.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="shadow-card mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8"
      >
        <p className="text-sm font-medium text-ink-soft">Your Family</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {members.map((member) => (
            <div key={member.name} className="rounded-xl border border-border p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-display text-sm text-brand-dark">
                {member.initials}
              </div>
              <p className="mt-2 truncate text-sm font-medium text-ink">{member.name}</p>
              <p className="text-xs text-ink-soft">{member.role}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm font-medium text-ink-soft">Recent Health Activity</p>
        <div className="mt-3 divide-y divide-border">
          {activity.map((item) => (
            <div key={item.text} className="flex items-center gap-3 py-3">
              <item.icon size={16} className="shrink-0 text-brand" />
              <p className="flex-1 text-sm text-ink">{item.text}</p>
              <p className="text-xs text-ink-soft">{item.time}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default ProductPreview;
