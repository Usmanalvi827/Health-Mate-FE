import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import Input from "../../common/Input"; // your handler
import { toast } from "react-toastify";
import { handleRegisterFamilyMember } from "../../familymember/hook/useFamilyMember";

function AddFamilyMemberModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const submitBtnHandler = async (e) => {
    e.preventDefault();

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const relation = e.target.relation.value;
    const dob = e.target.dob.value;
    const gender = e.target.gender.value;

    // Validation like your Register example
    if (!firstname || !lastname || !relation || !dob || !gender) {
      toast.warning("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const data = await handleRegisterFamilyMember({
        firstname,
        lastname,
        relation,
        dob,
        gender,
      });

      toast.success(data?.message || "Family Member Added!");
      onClose();
      if (onSuccess) onSuccess(); // to refetch list
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      toast.error(backendMessage || "Something went wrong");
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
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">Add Family Member</h2>
              <button onClick={onClose} aria-label="Close" className="text-ink-soft hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitBtnHandler} className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" id="memberFirstName" name="firstname" placeholder="Muhammad" />
                <Input label="Last Name" id="memberLastName" name="lastname" placeholder="Ahmed" />
              </div>

              <div>
                <label htmlFor="relationship" className="text-sm font-medium text-ink">Relationship</label>
                <select
                  name="relation"
                  id="relationship"
                  className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft"
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="son">Son</option>
                  <option value="daughter">Daughter</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* FIX: added name="dob" */}
                <Input label="Date of Birth" id="dob" name="dob" type="date" />
                <div>
                  <label htmlFor="gender" className="text-sm font-medium text-ink">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand-soft"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Member"}
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