import { useContext } from "react";
import { AuthContext } from "../features/auth/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Outlet />;
}
