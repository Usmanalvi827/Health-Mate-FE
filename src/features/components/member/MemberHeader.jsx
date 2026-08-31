import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function MemberHeader({ member }) {
  const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to Family
      </Link>

      <h1 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
        Welcome to {fullName || "this member"}'s Health Dashboard 👋
      </h1>
      <p className="mt-1 text-ink-soft">
        Here's an overview of {member.firstName || "their"}'s health information.
      </p>
    </div>
  );
}

export default MemberHeader;
