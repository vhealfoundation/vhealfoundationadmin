import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, login } = useKindeAuth();

  // Redirect to the dashboard if the user is already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white shadow-2xl rounded-lg px-10 py-12 w-full max-w-md relative">
        {/* Logo or Brand Name */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-4">
          <img
            src="/logo.png" // Replace with your logo's path
            alt="Dymphna And Medal Foundation"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mt-12 mb-4">
          Admin Login
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Secure access to the Dymphna And Medal Foundation admin panel.
        </p>

        <button
          onClick={login}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H3m0 0l4-4m-4 4l4 4m5-10h5a2 2 0 012 2v10a2 2 0 01-2 2h-5m0-14l4 4m-4-4l4 4"
            ></path>
          </svg>
          Login with Kinde
        </button>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          © 2025 Dymphna And Medals Foundation. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
