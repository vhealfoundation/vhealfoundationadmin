import React, { useState } from "react";
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

  const handleSave = async (storyData) => {
    try {
      setLoading(true);
      setError(null);

      // Making a POST request to the /stories API to save the new story
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/stories`, storyData);

      console.log("Story saved successfully:", response.data);

      // Handle success (e.g., redirect or show a message)
      alert("Story saved successfully!");
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add New Story</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <AddStoriesCard story={newStory} onSave={handleSave} onCancel={handleCancel} />
      {loading && <p className="text-blue-500 mt-4">Saving story, please wait...</p>}
    </div>
  );
};

export default Layout(AddStories);
