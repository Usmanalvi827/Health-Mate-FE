import { motion } from "framer-motion";
import { Users, HeartPulse } from "lucide-react";
import RecordStack from "./RecordStack";

// Wraps RecordStack in a proper "frame" instead of letting it float in
// empty space. Dot-grid texture + two floating badges give the banner
// some life without resorting to stock photography.
function HeroVisual() {
  return (
    <div className="relative ">
      <div
        className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-soft) 0%, transparent 70%)",
        }}
      />

      <div
        className=" relative overflow-hidden rounded-3xl border border-border bg-surface p-8"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-border) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        
        <RecordStack />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="shadow-card absolute left-4 top-4 flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-medium text-ink"
        >
          <Users size={14} className="text-brand" />
          4 family members
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="shadow-card absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-medium text-ink"
        >
          <HeartPulse size={14} className="text-accent" />
          Health, tracked
        </motion.div>
      </div>
    </div>
  );
}

export default HeroVisual;
