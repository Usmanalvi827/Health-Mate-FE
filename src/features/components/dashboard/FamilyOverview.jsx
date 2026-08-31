// Only "Family Members" is backed by real API data right now.
// "Recently Updated" and "Medical Records" were invented placeholder
// numbers with no matching endpoint, so they've been removed rather
// than faked.
function FamilyOverview({ totalMembers, loading }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="min-w-[160px] rounded-2xl border border-border bg-surface px-6 py-4">
        {loading ? (
          <div className="h-8 w-10 animate-pulse rounded bg-paper" />
        ) : (
          <p className="font-display text-2xl text-ink">{totalMembers}</p>
        )}
        <p className="mt-0.5 text-sm text-ink-soft">Family Members</p>
      </div>
    </div>
  );
}

export default FamilyOverview;
