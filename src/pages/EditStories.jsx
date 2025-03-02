import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../hoc/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditStoriesCard from "../components/EditStoriesCard";

const EditStories = () => {
  const [story, setStory] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the ID from the route parameters
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/stories/${id}`);
        setStory(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the story:", error);
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]); // Fetch the story when the component mounts or when the `id` changes
  const handleSave = async (updatedStory) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/stories/${id}`,
        updatedStory
      );
      setStory(response.data.data);
      toast.success("Story updated successfully!");
      navigate("/stories");
    } catch (error) {
      console.error("Error updating the story:", error);
    }
  };

  const handleCancel = () => {

  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Edit Story</h1>

      {story ? (
        <EditStoriesCard story={story} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div>No story found.</div>
      )}
    </div>
  );
};

export default Layout(EditStories);
