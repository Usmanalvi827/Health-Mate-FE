import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "..//common/Input";
import HeroVisual from "../components/landing/HeroVisual";
import { useContext } from "react";
import { AuthContext } from "../auth/context/authContext";
import { handleLogin } from "../auth/hook/useAuth";

function LoginPage() {
  const { loadingBtn, setLoadingBtn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.warning("All fields are required.", {
        className: "pc-toast pc-toast--warning",
      });
      setLoadingBtn(false);
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters.", {
        className: "pc-toast pc-toast--warning",
      });
      setLoadingBtn(false);
      return;
    }

    setLoadingBtn(true);

    try {
      const data = await handleLogin({
        email,
        password,
      });

      setUser(data.user);

      toast.success(data?.message || "Login successful.", {
        className: "pc-toast pc-toast--success",
      });
      navigate("/dashboard");
    } catch (error) {
      // console.log("err message", error.message);

      const backendMessage = error?.response?.data?.message;
      // console.log("backendMessage", backendMessage);

      if (backendMessage) {
        toast.error(backendMessage, { className: "pc-toast pc-toast--error" });
      } else if (error?.response?.status === 429) {
        // console.log("TOO MANY REQUESTS. PLEASE RETRY AFTER 15 MIN");
        toast.error("Too many requests. Please retry after 15 minutes.", {
          className: "pc-toast pc-toast--error",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          className: "pc-toast pc-toast--error",
        });
      }
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-paper">
      {/* LEFT - Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link to={"/"}  className="font-display text-xl text-ink">
            
              HealthMate
            
          </Link>
          <h1 className="mt-8 font-display text-3xl text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Log in to manage your family's health information.
          </p>

          <form
            onSubmit={(e) => submitBtnHandler(e)}
            className="mt-8 space-y-5"
          >
            <Input
              label="Email"
              name="email"
              id="email"
              type="email"
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={loadingBtn}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loadingBtn ? (
                <>
                  <svg
                    className="pc-spinner h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      opacity="0.25"
                    />
                    <path
                      d="M22 12a10 10 0 0 0-10-10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Login Account...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-soft">
            Don't have an account?{" "}
            <Link to={"/register"} className="font-medium text-brand hover:text-brand-dark">
                
                Create one
            
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT - Visual */}
      <div className="hidden w-1/2 items-center justify-center bg-brand-soft/40 p-12 lg:flex">
        <div className="w-full max-w-md">
          <HeroVisual />
          <div className="mt-10 text-center">
            <h3 className="font-display text-2xl text-ink">
              One place for your family's health
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Scattered records, pulled into one organized stack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
