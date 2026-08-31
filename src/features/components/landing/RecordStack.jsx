import { motion } from "framer-motion";

const previewMembers = [
  { initials: "AR", name: "Ahmed", role: "Father", status: "Up to date" },
  { initials: "SF", name: "Sana", role: "Mother", status: "1 update" },
  { initials: "MU", name: "Muhammad", role: "Son", status: "Up to date" },
  { initials: "ZR", name: "Zara", role: "Daughter", status: "Up to date" },
];

function RecordStack() {
  return (
    <div className="relative h-80 w-full max-w-sm mx-auto">
      {previewMembers.map((member, index) => {
        const rotation = (index - 1.5) * 8;
        const yOffset = index * 18;

        return (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40, x: "-50%", rotate: 0 }}
            animate={{
              opacity: 1,
              y: yOffset,
              x: "-50%",
              rotate: rotation,
            }}
            transition={{
              delay: 0.12 * index,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: yOffset - 14,
              scale: 1.03,
              rotate: rotation * 0.5,
              zIndex: 10,
            }}
            className="absolute left-1/2 top-4 w-56 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
            style={{
              transformOrigin: "bottom center",
              zIndex: index,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 font-medium text-sm text-emerald-800">
                {member.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                  {member.name}
                </p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  member.status === "Up to date"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
              />
              {member.status}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default RecordStack;
