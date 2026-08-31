import { motion } from "framer-motion";

function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft font-display text-xl text-brand-dark"
      >
        H
      </motion.div>

      <p className="mt-4 font-display text-lg text-ink">HealthMate</p>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="pc-dot h-1.5 w-1.5 rounded-full bg-brand" style={{ animationDelay: "0s" }} />
        <span className="pc-dot h-1.5 w-1.5 rounded-full bg-brand" style={{ animationDelay: "0.15s" }} />
        <span className="pc-dot h-1.5 w-1.5 rounded-full bg-brand" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
}

export default PageLoader;
