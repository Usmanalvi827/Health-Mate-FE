function getInitials(firstName = "", lastName = "") {
  const first = firstName?.trim()?.[0] || "";
  const last = lastName?.trim()?.[0] || "";
  return `${first}${last}`.toUpperCase() || "F";
}

function getAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (isNaN(dob.getTime())) return null;
  const diff = Date.now() - dob.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

function MemberOverview({ member }) {
  const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
  const age = getAge(member.dateOfBirth);

  return (
    <div className="shadow-card rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-lg text-brand-dark">
          {getInitials(member.firstName, member.lastName)}
        </div>
        <div>
          <p className="font-display text-xl text-ink">{fullName || "Unnamed"}</p>
          <p className="text-sm capitalize text-ink-soft">
            {member.relation || "Family member"}
            {age !== null && ` · ${age} years`}
          </p>
        </div>
      </div>

      {/* Only render fields that actually exist on the member object */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
        {member.gender && (
          <div>
            <p className="text-xs text-ink-soft">Gender</p>
            <p className="mt-0.5 text-sm capitalize text-ink">{member.gender}</p>
          </div>
        )}
        {member.bloodGroup && (
          <div>
            <p className="text-xs text-ink-soft">Blood Group</p>
            <p className="mt-0.5 text-sm text-ink">{member.bloodGroup}</p>
          </div>
        )}
        {member.dateOfBirth && (
          <div>
            <p className="text-xs text-ink-soft">Date of Birth</p>
            <p className="mt-0.5 text-sm text-ink">
              {new Date(member.dateOfBirth).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberOverview;
