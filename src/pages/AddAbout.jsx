import React, { useState } from "react";
import { toast } from "react-hot-toast";
import AddSectionCard from "../components/AddSectionCard"; // Reusing AddSectionCard component
import Layout from "../hoc/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAbout = () => {
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
        `${process.env.REACT_APP_BACKEND_URL}/aboutcards`,
        formData
      );
      setLoading(false);
      toast.success("AboutCard added successfully!");
      navigate("/about"); // Redirect to the About page
    } catch (err) {
      setLoading(false);
      console.error("Error adding AboutCard:", err);
    }
  };

  const handleCancel = () => {
    navigate("/about"); // Redirect to the About page if the user cancels
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

export default Layout(AddAbout);
