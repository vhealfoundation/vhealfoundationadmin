import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated, isLoading, getUser, logout } = useKindeAuth();
  const user = getUser();

  const checkAdminAccess = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/is-authenticated`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user?.email }),
        }
      );
  
      const data = await response.json();
      if (!(data.success && data.isAuthenticated)) {
            await logout();
        toast.error("Access denied. You are not an admin.");
    
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast.error("Failed to verify admin access. Please try again.");
      await logout();
      return false;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    const isAdmin = checkAdminAccess(); 
    return isAdmin ? <Component /> : <Navigate to="/login" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
