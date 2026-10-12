import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroVisual from "./HeroVisual";

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-dark">
            Built for the person who keeps track
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Your family's health, organized in one place.
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            HealthMate keeps every family member's medical history, medications,
            and records together — managed by the one person who keeps track of
            it all.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-ink transition-colors hover:border-ink-soft"
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export default Hero;
