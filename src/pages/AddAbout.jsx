// AddAbout.jsx
import React, { useState } from "react";
import Layout from "../hoc/Layout";
import AddAboutCard from "../components/AddAboutCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAbout = () => {
  const [formData, setFormData] = useState({
    publicId: "",
    imageSrc: "",
    title: "",
    description: "",
    content: [{ title: "", description: "", publicId: "", image: "" }],
  });

  const navigate = useNavigate();

  // Handle the submit of the form (API call)
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/aboutcards`,
        formData
      );
      // If success, handle adding new card
      console.log("New About Card Added:", response.data);
      navigate("/about"); // Redirect to about page after adding
    } catch (error) {
      console.error("Error adding about card:", error);
    }
  };

  // Handle cancel (reset form or do something else)
  const handleCancel = () => {
    setFormData({
      publicId: "",
      imageSrc: "",
      title: "",
      description: "",
      content: [{ title: "", description: "",publicId: "", image: "" }],
    });
    navigate("/about"); // Navigate back if cancelled
  };

  // Handle the form data change from the AddAboutCard component
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New About Card</h1>
      <p className="mt-4">Add new information about your organization.</p>
      <div>
        <AddAboutCard
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default Layout(AddAbout);
