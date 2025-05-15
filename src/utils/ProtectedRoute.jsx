import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated, isLoading, getUser, logout } = useKindeAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [persistedAuth, setPersistedAuth] = useState(false);
  const user = getUser();

  // Check for persisted authentication on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('kinde_user');
    if (storedUser) {
      setPersistedAuth(true);
      // Store user data in localStorage to maintain persistence
      if (isAuthenticated && user) {
        localStorage.setItem('kinde_user', JSON.stringify(user));
      }
    } else if (isAuthenticated && user) {
      // If authenticated but no stored user, store the user data
      localStorage.setItem('kinde_user', JSON.stringify(user));
      setPersistedAuth(true);
    }
  }, [isAuthenticated, isLoading, user]);

  useEffect(() => {
    // Only run the admin check when authentication is complete (not loading)
    // and the user is authenticated
    if (isLoading) return;

    const checkAdminAccess = async () => {
      // If we have persisted auth but no user object yet, wait for it
      if (persistedAuth && !user?.email && isLoading) {
        return; // Don't set isCheckingAdmin to false yet, wait for user data
      }

      if ((!isAuthenticated && !persistedAuth) || !user?.email) {
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
          localStorage.setItem('kinde_logout', 'true');
          localStorage.removeItem('kinde_user');
          await logout();
          toast.error("Access denied. You are not an admin.");
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast.error("Failed to verify admin access. Please try again.");
        localStorage.setItem('kinde_logout', 'true');
        localStorage.removeItem('kinde_user');
        await logout();
        setIsAdmin(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminAccess();
  }, [isAuthenticated, user?.email, logout, isLoading, persistedAuth]);

  // Show loader while checking authentication or admin status
  if (isLoading || isCheckingAdmin) {
    return <Loader />;
  }

  // If not authenticated, not loading, and no persisted auth, redirect to login
  if (!isAuthenticated && !isLoading && !persistedAuth) {
    // Only clear data and redirect if we're sure it's a logout, not just a page reload
    if (localStorage.getItem('kinde_logout') === 'true') {
      localStorage.removeItem('kinde_user');
      localStorage.removeItem('kinde_logout');
      return <Navigate to="/login" replace />;
    }
    
    // If we have a stored user but Kinde says not authenticated, it might be a session refresh
    // Let's check if we have stored user data before redirecting
    const storedUser = localStorage.getItem('kinde_user');
    if (!storedUser) {
      return <Navigate to="/login" replace />;
    }
  }

  // If authenticated but not admin, the useEffect will handle logout and redirection
  if (isAdmin === false) { // Only redirect if we've confirmed user is not an admin
    return <Navigate to="/login" replace />;
  }

  // If authenticated and admin, render the protected component
  return <Component />;
};

export default ProtectedRoute;