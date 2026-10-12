import { createContext, useEffect, useState } from "react";
import { getMeAPI } from "../api/auth.api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const rehydrateUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        setLoadingPage(false);
        return;
      }
      try {
        const data = await getMeAPI();
        setUser(data.data || data.user || data);
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoadingPage(false);
      }
    };

    rehydrateUser();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        loadingBtn,
        setLoadingBtn,
        user,
        setUser,
        isAuthenticated,
        loadingPage,
        loggingOut,
        setLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
