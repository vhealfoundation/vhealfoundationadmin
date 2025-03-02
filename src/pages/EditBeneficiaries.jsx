import React, { useEffect, useState } from "react";
import Layout from "../hoc/Layout";
import { useParams, useNavigate } from "react-router-dom";
import EditBeneficiariesCard from "../components/EditBenificiariesCard";
import axios from "axios";
import toast from "react-hot-toast";

const EditBeneficiaries = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [beneficiary, setBeneficiary] = useState(null); // State to store the beneficiary data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    // Fetch existing beneficiary data using the id
    const fetchBeneficiaryData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/beneficiary/${id}`
        )
     
        setBeneficiary(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching beneficiary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaryData();
  }, [id]);

  const handleFormSubmit = async (updatedBeneficiary) => {
    // Update the beneficiary data using PUT request
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/beneficiary/${id}`,
        updatedBeneficiary
      )
 
        setBeneficiary(response.data.data);
        toast.success("Beneficiary updated successfully!");
        navigate("/beneficiaries");
    
    } catch (error) {
      console.error("Error updating beneficiary:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
         <h1 className="text-3xl font-bold">Edit Beneficiary</h1>
      {beneficiary && (
        <EditBeneficiariesCard
          beneficiary={beneficiary}
          onUpdate={handleFormSubmit}
          onCancel={() => navigate("/beneficiaries")} // Use navigate for cancel
        />
      )}
    </div>
  );
};

export default Layout(EditBeneficiaries);
