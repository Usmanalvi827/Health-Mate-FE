import { useContext, useState } from "react";
import { Bell, Menu, X, LogOut } from "lucide-react";
import { AuthContext } from "../../auth/context/authContext";
import { handleLogout } from "../../auth/hook/useAuth";
import { toast } from "react-toastify";

function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser ,loggingOut, setLoggingOut } = useContext(AuthContext);

  const firstname = user?.firstname || user?.firstName || "";
  const lastname = user?.lastname || user?.lastName || "";

  // Safe - won't crash if empty
  const displayName = firstname || "Loading...";
  const initials = firstname ? firstname.slice(0, 2).toUpperCase() : "HM";

    async function logoutClickHandler() {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await handleLogout();
    } catch (error) {
      // even if the backend call fails, we still clear the user locally
      // so they can't stay stuck on the dashboard with a dead session
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      setLoggingOut(false);
      toast.success("Logged out successfully.", {
        className: "pc-toast pc-toast--success",
      });
      navigate("/login");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <a href="/dashboard" className="font-display text-xl text-ink">
            HealthMate
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/dashboard" className="text-sm font-medium text-ink">
              Dashboard
            </a>
          </nav>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <button aria-label="Notifications" className="text-ink-soft hover:text-ink">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-display text-sm text-brand-dark">
              {initials}
            </div>
            <span className="text-sm font-medium text-ink">{displayName}</span>
          </div>

          {/* TODO: confirm logout() exists on AuthContext and clears the token/session */}
          <button
          onClick={logoutClickHandler}
           disabled={loggingOut}
            aria-label="Logout"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-alert hover:text-alert"
          >
            <LogOut size={16} />
             {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="/dashboard" className="text-sm font-medium text-ink">Dashboard</a>
            <a href="/dashboard" className="text-sm text-ink-soft">My Family</a>
            <hr className="border-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-display text-sm text-brand-dark">
                {initials}
              </div>
              <span className="text-sm font-medium text-ink">{displayName} {lastname}</span>
            </div>
            <button
              className="inline-flex items-center gap-1.5 text-left text-sm font-medium text-ink-soft"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;
