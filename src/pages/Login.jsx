import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const { isAuthenticated, login } = useKindeAuth();

  // Redirect to the dashboard if the user is already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
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

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          © 2025 VHeal Foundation. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
