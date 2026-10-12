import { motion } from "framer-motion";
import { ArrowRight, Droplet, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function getInitials(firstName = "", lastName = "") {
  return (
    `${firstName?.trim()?.[0] || ""}${lastName?.trim()?.[0] || ""}`.toUpperCase() ||
    "F"
  );
}

function getAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function SingleCard({ member, onEdit, onDelete }) {
  const fullName =
    `${member.firstName || ""} ${member.lastName || ""}`.trim() || "Unnamed";
  const age = getAge(member.dateOfBirth);
  const memberId = member._id || member.id;

  return (
    /* Changed from motion.a to motion.div to prevent nested link issues */
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="shadow-card shadow-card-hover group relative block rounded-2xl border border-border bg-surface p-5"
    >
      <div className="absolute right-4 top-4 flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(member);
          }}
          aria-label={`Edit ${fullName}`}
          className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand-dark"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(member);
          }}
          aria-label={`Delete ${fullName}`}
          className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-alert-soft hover:text-alert"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex items-center gap-3 pr-14">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-base text-brand-dark">
          {getInitials(member.firstName, member.lastName)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{fullName}</p>
          <span className="inline-block rounded-full bg-paper px-2 py-0.5 text-xs capitalize text-ink-soft">
            {member.relation || "other"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-ink-soft">
        <span>{age !== null ? `${age} years` : "Age N/A"}</span>
        <span className="flex items-center gap-1 capitalize">
          {member.bloodGroup && (
            <>
              <Droplet size={13} className="text-alert" /> {member.bloodGroup}
            </>
          )}
          {!member.bloodGroup && member.gender}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-ink-soft">
          {member.dateOfBirth
            ? new Date(member.dateOfBirth).toLocaleDateString()
            : "No DOB"}
        </span>

        {/* The clean inner React Router Link handles navigation */}
        <Link to={`/family-member/${memberId}`}>
          <span className="flex items-center gap-1 text-sm font-medium text-brand">
            View Profile
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function FamilyMemberCard({ members, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <SingleCard
          key={member._id || member.id}
          member={member}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default FamilyMemberCard;
