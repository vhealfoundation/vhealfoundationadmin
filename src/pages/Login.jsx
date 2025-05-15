import React, { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Loader from "../components/Loader";

const Login = () => {
  const { isAuthenticated, login, isLoading } = useKindeAuth();
  const [persistedAuth, setPersistedAuth] = useState(false);

  // Check for persisted authentication
  useEffect(() => {
    const storedUser = localStorage.getItem('kinde_user');
    if (storedUser) {
      setPersistedAuth(true);
    }

    // Only clear persisted data if we're sure the user is not authenticated
    // and the authentication check is complete (not loading)
    if (!isLoading && !isAuthenticated) {
      // Don't immediately remove persisted auth on page reload
      // This prevents flashing to login page during authentication check
      const isPageReload = window.performance &&
        window.performance.navigation &&
        window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;

      if (!isPageReload) {
        localStorage.removeItem('kinde_user');
        setPersistedAuth(false);
      }
    }
  }, [isLoading, isAuthenticated]);

  // Show loader while authentication state is being determined
  if (isLoading) {
    return <Loader />;
  }

  // Redirect to the dashboard if the user is already logged in or has persisted auth
  if (isAuthenticated || persistedAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-white shadow-2xl rounded-lg px-10 py-12 w-full max-w-md relative">
        {/* Logo or Brand Name */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-4">
          <img
            src={logo}
            alt="VHeal Foundation"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mt-12 mb-4">
          Admin Login
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Secure access to the VHeal Foundation admin panel.
        </p>

        <button
          onClick={login}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;