import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated, isLoading, getUser, logout } = useKindeAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const user = getUser();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!isAuthenticated || !user?.email) {
        setIsCheckingAdmin(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/is-authenticated`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );

        const data = await response.json();
        if (!(data.success && data.isAuthenticated)) {
          await logout();
          toast.error("Access denied. You are not an admin.");
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast.error("Failed to verify admin access. Please try again.");
        await logout();
        setIsAdmin(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminAccess();
  }, [isAuthenticated, user?.email, logout]);

  // Show loader while checking authentication or admin status
  if (isLoading || isCheckingAdmin) {
    return <Loader />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not admin, the useEffect will handle logout and redirection
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated and admin, render the protected component
  return <Component />;
};

export default ProtectedRoute;