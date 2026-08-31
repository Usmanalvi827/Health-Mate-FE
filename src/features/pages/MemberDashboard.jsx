import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MemberHeader from "../components/member/MemberHeader";
import MemberOverview from "../components/member/MemberOverview";
import { getFamilyMember } from "../familymember/hook/useFamilyMember";

function MemberDashboard() {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchMember = async () => {
    try {
      setLoading(true);
      setLoadError(false);
      // There's no single-member endpoint yet, so we fetch the same
      // family list the Dashboard uses and find this member in it.
      const res = await getFamilyMember();
      const members = res.members || [];
      const found = members.find((m) => (m._id || m.id) === memberId);
      setMember(found || null);
    } catch (error) {
      console.error("Fetch member failed:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [memberId]);

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader />

      <main className="mx-auto max-w-4xl px-6 py-10">
        {loading ? (
          <div className="space-y-6">
            <div className="h-4 w-28 animate-pulse rounded bg-paper" />
            <div className="h-8 w-72 animate-pulse rounded bg-paper" />
            <div className="h-32 animate-pulse rounded-2xl border border-border bg-surface" />
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-14 text-center">
            <p className="text-sm text-ink-soft">
              Unable to load this member's information.
            </p>
            <button
              onClick={fetchMember}
              className="mt-4 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Try Again
            </button>
          </div>
        ) : !member ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-14 text-center">
            <p className="text-sm text-ink-soft">
              This family member couldn't be found.
            </p>
            <Link
              to="/dashboard"
              className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Back to Family
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <MemberHeader member={member} />
            <MemberOverview member={member} />

            {/* Vitals, Medical Records, and Health Timeline sections go here next */}
          </div>
        )}
      </main>
    </div>
  );
}

export default MemberDashboard;
