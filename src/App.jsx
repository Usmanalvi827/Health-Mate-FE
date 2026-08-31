import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AuthContext, AuthProvider } from "./features/auth/context/authContext";
import { useContext } from "react";
import PageLoader from "./features/components/common/PageLoader";
import { router } from "./app.router";
import { RouterProvider } from "react-router-dom";

function AppContent() {
  const { loadingPage } = useContext(AuthContext);

  if (loadingPage) {
    return <PageLoader />;
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        theme="light"
      />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </>
  );
}

export default App;
