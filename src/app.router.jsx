import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./features/pages/LandingPage";
import PublicRoute from "./routes/PublicRoutes";
import RegisterPage from "./features/pages/RegisterPage";
import LoginPage from "./features/pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./features/pages/Dashboard";
import MemberDashboard from "./features/pages/MemberDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    /* Both routes are now properly grouped inside ONE children array */
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/family-member/:id", element: <MemberDashboard /> }
    ],
  },
]);
