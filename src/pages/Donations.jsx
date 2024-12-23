import React, { useEffect, useState } from "react";
import Layout from "../hoc/Layout";
// import { toast } from "react-hot-toast";
import DonationsTable from "../components/DonationsTable";
import axios from "axios";
import Loader from "../components/Loader";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/donation`);
        setDonations(response.data.data); // Adjust based on API response structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setError("Failed to fetch donations.");
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/donation/${id}`);
  //     setDonations(donations.filter((donation) => donation.id !== id));
  //     toast.success("Donation deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting donation:", error);
  //     toast.error("Failed to delete donation.");
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Donations</h1>
      <div>
        {loading ? (
         <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <DonationsTable donationsData={donations} />
        )}
      </div>
    </div>
  );
};

export default Layout(Donations);
