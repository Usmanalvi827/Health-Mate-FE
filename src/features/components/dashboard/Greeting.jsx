import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/authContext";

// pure function - no hooks inside
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function Greeting({ onAddMember }) {
  const { user } = useContext(AuthContext);
  
  const firstname = user?.firstname || user?.firstName || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 className="font-display text-2xl text-ink sm:text-3xl">
          {getGreeting()}, {firstname || "there"} 👋
        </h1>
        <p className="mt-1 text-ink-soft">
          Manage your family's health information, all in one place.
        </p>
      </div>

      <button
        onClick={onAddMember}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
      >
        <Plus size={18} />
        Add Family Member
      </button>
    </motion.div>
  );
}

export default Greeting;