import { Users, Plus } from "lucide-react";

function EmptyFamilyState({ onAddMember }) {
  
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
        <Users size={22} />
      </div>
      <h3 className="mt-4 font-display text-xl text-ink">
        No family members yet
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
        Start building your family health profile by adding your first family
        member.
      </p>
      <button
        onClick={onAddMember}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
      >
        <Plus size={18} />
        Add Family Member
      </button>
    </div>
  );
}

export default EmptyFamilyState;
