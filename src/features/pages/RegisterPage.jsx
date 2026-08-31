import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/Input"; // Fixed double slash typo "..//common/Input"
import HeroVisual from "../components/landing/HeroVisual";
import { handleRegister } from "../auth/hook/useAuth";
import { useContext } from "react";
import { AuthContext } from "../auth/context/authContext";

function RegisterPage() {
  const { loadingBtn, setLoadingBtn } = useContext(AuthContext);
  const navigate = useNavigate()

  const submitBtnHandler = async (e) => {
    e.preventDefault();

    // 2. Extract values from form elements using their 'name' attributes
    const firstName = e.target.firstname.value;
    const lastName = e.target.lastname.value;
    const userName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmpassword.value;
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.", {
        className: "pc-toast pc-toast--warning",
      });
      setLoadingBtn(false);
      return;
    }

    setLoadingBtn(true);

    try {
      // 4. Send the structured data to your handler
      const data = await handleRegister({
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
      });
      toast.success(data?.message || "Registration successful.", {
        className: "pc-toast pc-toast--success",
      });
      navigate("/login");
      return;
    } catch (error) {
      const backendMessage = error?.response?.data?.message;

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
      <div className="flex w-full items-start justify-center overflow-y-auto px-6 py-12 lg:w-1/2 lg:items-center">
        <div className="w-full max-w-sm">
          <Link to={"/"} className="font-display text-xl text-ink">
            HealthMate
          </Link>
          <h1 className="mt-8 font-display text-3xl text-ink">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Set up your family's account to start organizing health information.
          </p>

          {/* Form setup remains clean and un-controlled */}
          <form onSubmit={submitBtnHandler} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" name="firstname" placeholder="Ahmed" />
              <Input label="Last Name" name="lastname" placeholder="Raza" />
            </div>

            {/* Added missing name attribute to username field */}
            <Input
              label="Username"
              id="username"
              name="username"
              placeholder="ahmedraza"
            />

            <Input
              name="email"
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
            />
            <Input
              name="password"
              label="Password"
              id="password"
              type="password"
              placeholder="Create a password"
            />
            <Input
              name="confirmpassword"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink-soft">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-brand hover:text-brand-dark"
            >
              Log in
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

export default RegisterPage;
