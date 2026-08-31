
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Input from "..//..//common/Input";


function AddFamilyMemberModal({ isOpen, onClose }) {
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
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">Add Family Member</h2>
              <button onClick={onClose} aria-label="Close" className="text-ink-soft hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <form className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" id="memberFirstName" placeholder="Muhammad" />
                <Input label="Last Name" id="memberLastName" placeholder="Ahmed" />
              </div>

              <div>
                <label htmlFor="relationship" className="text-sm font-medium text-ink">
                  Relationship
                </label>
                <select
                  id="relationship"
                  className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft"
                >
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Date of Birth" id="dob" type="date" />
                <div>
                  <label htmlFor="gender" className="text-sm font-medium text-ink">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink-soft"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  Add Member
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddFamilyMemberModal;
