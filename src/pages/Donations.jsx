// Donations.jsx
import React from "react";
import Layout from "../hoc/Layout";
import DonationsTable from "../components/DonationsTable";
const Donations = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Donations</h1>
      <div>
        <DonationsTable />
      </div>
    </div>
  );
};

export default Layout(Donations);