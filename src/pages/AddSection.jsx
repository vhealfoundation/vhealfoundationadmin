import React, { useState } from "react";
import { toast } from "react-hot-toast";
import AddSectionCard from "../components/AddSectionCard";
import Layout from "../hoc/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSection = () => {
  const [formData, setFormData] = useState({
    image: "",
    heading: "",
    subheading: "",
    description: "",
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.image ||
      !formData.heading ||
      !formData.subheading ||
      !formData.description ||
      formData.features.length === 0
    ) {
      toast.error("Please fill all the fields!");
      return; 
    }
    
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sections`,
        formData
      );
      setLoading(false);
      toast.success("Section card added successfully!");
      navigate("/sections"); 
    } catch (err) {
      setLoading(false);
      console.error("Error adding section:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sections"); // Redirect to the Sections page if the user cancels
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New</h1>

      <AddSectionCard
        formData={formData}
        onFormChange={onFormChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default Layout(AddSection);
