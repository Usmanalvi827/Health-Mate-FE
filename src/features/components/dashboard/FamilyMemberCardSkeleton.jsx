function FamilyMemberCardSkeleton({ count = 2 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-paper" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-2/3 animate-pulse rounded bg-paper" />
              <div className="h-3 w-1/3 animate-pulse rounded-full bg-paper" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-3 w-12 animate-pulse rounded bg-paper" />
            <div className="h-3 w-10 animate-pulse rounded bg-paper" />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <div className="h-3 w-16 animate-pulse rounded bg-paper" />
            <div className="h-3 w-20 animate-pulse rounded bg-paper" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FamilyMemberCardSkeleton;