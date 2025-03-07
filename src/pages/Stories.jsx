import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";  
import { FaPlus } from "react-icons/fa";

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
      toast.success("Story deleted successfully!");
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };


  return (
    <div className="p-6">
      {loading && <Loader />}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stories</h1>
        <button
          onClick={() => navigate("/stories/new")} 
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          <FaPlus className="mr-2" />

          Add New Story
        </button>
      </div>

      <div className="flex flex-wrap">
        {stories.map((story) => (
          <div className="w-full md:w-1/2 lg:w-1/3">

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
