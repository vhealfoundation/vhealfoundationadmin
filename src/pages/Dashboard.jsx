import React, { useEffect } from "react";
import Layout from "../hoc/Layout";
import toast from "react-hot-toast";
import MainData from "../components/MainData";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Dashboard = () => {
  const { isAuthenticated } = useKindeAuth();

  // Use useEffect to show the toast only once when the component is mounted and user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Welcome to the dashboard!");
    }
  }, [isAuthenticated]); // This ensures the toast only triggers when the value of isAuthenticated changes

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div>
        <MainData />
      </div>
    </div>
  );
};

export default Layout(Dashboard);
