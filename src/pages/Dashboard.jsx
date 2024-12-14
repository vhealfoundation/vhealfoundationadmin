// Dashboard.jsx
import React from "react";
import Layout from "../hoc/Layout";
import MainData from "../components/MainData";
const Dashboard = () => {
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