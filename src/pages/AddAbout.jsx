// AddAbout.jsx
import React, { useState } from "react";
import Layout from "../hoc/Layout";
import AddAboutCard from "../components/AddAboutCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    //check all fields are filled
   if(!formData.title || !formData.description || !formData.imageSrc || formData.content.length === 0){
    toast.error("Please fill all the fields!");
    return;
   }
   
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/aboutcards`,
        formData
      );
  
      toast.success("About card added successfully!");
      navigate("/about");
    } catch (error) {
      console.error("Error adding about card:", error);
      toast.error("Failed to add about card!");
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
    navigate("/about");
  };

  // Handle the form data change from the AddAboutCard component
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Add New</h1>
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
