import {
  Users,
  UserRound,
  ClipboardList,
  Pill,
  ShieldAlert,
  Lock,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: UserRound,
    title: "Individual health profiles",
    description:
      "Every family member gets their own space for conditions, allergies, medications, and history — kept separate and easy to find.",
    large: true,
  },
  {
    icon: Users,
    title: "Family management",
    description: "Add, update, and organize every family member from one account.",
  },
  {
    icon: ClipboardList,
    title: "Medical records",
    description:
      "Keep visits, diagnoses, and prescriptions on record instead of scattered across paper and photos.",
  },
  {
    icon: Pill,
    title: "Medication tracking",
    description: "Keep a clear record of what each family member is taking, and why.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency information",
    description: "Blood group, allergies, and emergency contacts — ready when you need them fast.",
  },
  {
    icon: Lock,
    title: "Single-owner access",
    description: "Only you, the Family Head, can view and manage your family's information.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <p className="eyebrow">What you get</p>
        <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Everything about your family's health, in one place.
        </h2>
        <p className="mt-3 text-ink-soft">
          No more scattered documents, photos of prescriptions, or trying to
          remember who's allergic to what.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2">
          <FeatureCard {...features[0]} />
        </div>
        {features.slice(1).map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default Features;
