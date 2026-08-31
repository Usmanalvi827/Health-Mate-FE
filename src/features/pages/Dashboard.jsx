import { useState, useEffect } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Greeting from "../components/dashboard/Greeting";
import FamilyOverview from "../components/dashboard/FamilyOverview";
import FamilyMemberCard from "../components/dashboard/FamilyMemberCard";
import FamilyMemberCardSkeleton from "../components/dashboard/FamilyMemberCardSkeleton";
import EmptyFamilyState from "../components/dashboard/EmptyFamilyState";
import AddFamilyMemberModal from "../components/dashboard/AddFamilyMemberModal";
import { getFamilyMember } from "../familymember/hook/useFamilyMember";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setLoadError(false);
      const res = await getFamilyMember();
      // console.log(res)
      setFamilyMembers(res.members || res.data || []);
    } catch (error) {
      console.error("Fetch members failed:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (familyMembers.length === 0) {
    fetchMembers();
  }
}, []);

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Greeting onAddMember={() => setIsModalOpen(true)} />
        
        <div className="mt-8">
          <FamilyOverview totalMembers={familyMembers.length} loading={loading} />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-xl text-ink">Your Family</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Select a family member to view their health profile.
          </p>
          <div className="mt-5">
            {loading ? (
              <FamilyMemberCardSkeleton count={2} />
            ) : loadError ? (
              <div className="rounded-2xl border border-border bg-surface px-6 py-14 text-center">
                <p className="text-sm text-ink-soft">Unable to load your family information.</p>
                <button
                  onClick={fetchMembers}
                  className="mt-4 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  Try Again
                </button>
              </div>
            ) : familyMembers.length === 0 ? (
              <EmptyFamilyState onAddMember={() => setIsModalOpen(true)} />
            ) : (
              <FamilyMemberCard members={familyMembers} />
            )}
          </div>
        </section>
      </main>

      <AddFamilyMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchMembers}
      />
    </div>
  );
}

export default Dashboard;