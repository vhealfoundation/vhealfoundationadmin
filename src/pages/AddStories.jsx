import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../hoc/Layout";
import AddStoriesCard from "../components/AddStoriesCard";
import axios from "axios";

const AddStories = ({ onCancel }) => {
  const [newStory, setNewStory] = useState({
    coverimage: "",
    title: "",
    description: "",
    content: [],
  });

  const [loading, setLoading] = useState(false); // For showing loading state
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate(); // For navigation
  const handleSave = async (storyData) => {
    if(!storyData.coverimage || !storyData.title  || storyData.content.length === 0){
      toast.error("Please fill all the fields");
      return;
      
    }
    try {
      setLoading(true);
      setError(null);

      // Making a POST request to the /stories API to save the new story
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/stories`, storyData);
      toast.success("Story saved successfully!");
      navigate("/stories");
    } catch (err) {
      console.error("Error saving story:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel(); // Handle cancel logic, such as navigating back
  };

  return (
    <div className="p-6">
    <h1 className="text-3xl font-bold">Add New</h1>
      <AddStoriesCard story={newStory} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default Layout(AddStories);
