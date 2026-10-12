import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleDeleteFamilyMember } from "../../familymember/hook/useFamilyMember";

function DeleteFamilyMemberModal({ isOpen, onClose, member, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!member) return null;

  const memberId = member._id || member.id;
  const fullName =
    `${member.firstName || member.firstname || ""} ${
      member.lastName || member.lastname || ""
    }`.trim() || "this family member";

  const handleDelete = async () => {
    setLoading(true);

    try {
      const data = await handleDeleteFamilyMember(memberId);
      toast.success(data?.message || "Family member deleted successfully!");
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      toast.error(backendMessage || "Failed to delete family member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alert-soft text-alert">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="font-display text-xl text-ink">
                    Delete Family Member
                  </h2>
                  <p className="text-xs text-ink-soft">
                    Permanent removal
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-ink-soft hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-4 text-sm text-ink-soft">
              Are you sure you want to delete <span className="font-medium text-ink">{fullName}</span>?
              This will permanently remove their profile and associated health information. This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-soft disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-full bg-alert py-2.5 text-sm font-medium text-white transition-colors hover:bg-alert/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete Member"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteFamilyMemberModal;

