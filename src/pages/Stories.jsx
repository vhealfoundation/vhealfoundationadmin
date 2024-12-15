import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import StoryCard from "../components/StoryCard";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/stories`);
        setStories(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/stories/${id}`);
      setStories((prevStories) => prevStories.filter((story) => story._id !== id));
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Stories</h1>
      <p className="mt-4">Add and edit success stories or other impactful narratives.</p>
      <button
        onClick={() => navigate("/stories/new")}  a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Add New Story
      </button>

      <div className="mt-6 flex flex-wrap">
        {stories.map((story) => (
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">

          <StoryCard
            key={story._id}
            story={story}
            onDelete={handleDelete}

          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout(Stories); 
