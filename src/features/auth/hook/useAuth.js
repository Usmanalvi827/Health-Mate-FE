import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { loginAPI, registerAPI, logoutAPI } from "../api/auth.api";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export async function handleRegister({
  firstName,
  lastName,
  userName,
  email,
  password,
  confirmPassword,
}) {
  const data = await registerAPI({
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword,
  });
  return data;
}

export async function handleLogin({ email, password }) {
  const data = await loginAPI({
    email,
    password,
  });
  return data;
}

export async function handleLogout() {
  const data = await logoutAPI();
  return data;
}
