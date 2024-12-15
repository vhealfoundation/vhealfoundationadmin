import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import AboutCard from "../components/AboutCard";
import Loader from "../components/Loader";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch About data on component mount
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/aboutcards`);
        setAboutData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/aboutcards/${id}`);
      setAboutData((prevData) => prevData.filter((about) => about._id !== id));
    } catch (error) {
      console.error("Error deleting about card:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">About</h1>
      <button
        onClick={() => navigate("/about/new")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
      >
        Add New
      </button>
      </div>

      {/* Display loading state, error state, or AboutCard */}
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutData.map((about) => (
            <AboutCard key={about._id} about={about} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Layout(About);
