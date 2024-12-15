import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../hoc/Layout";
import GalleryCard from "../components/GalleryCard";
import Loader from "../components/Loader";
import {FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";


const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch gallery data on component mount
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
        setGalleryData(response.data.data.images);
        setLoading(false);
      } catch (err) {
        setError("Error fetching gallery data");
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Upload images to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dymphnafoundation_gallery"); // Your Cloudinary preset

    const response = await fetch("https://api.cloudinary.com/v1_1/drgmx7x3w/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  };

  // Handle image selection (show previews)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const newPreviews = files.map((file) => URL.createObjectURL(file)); // Generate previews
    setImagePreviews(newPreviews);
  };

  // Handle image uploads when the "Upload" button is clicked
  // Handle image uploads when the "Upload" button is clicked
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setUploading(true); // Show upload message
      const uploadedUrls = await Promise.all(selectedFiles.map((file) => uploadImageToCloudinary(file)));

      // Save uploaded images to the backend
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/gallery`, {
        images: uploadedUrls.map((url) => ({ url })),
      });

      // Update gallery with new images
      setGalleryData((prevData) => [...prevData, ...uploadedUrls.map((url) => ({ url }))]);

      // Reset the image previews and selected files after successful upload
      setImagePreviews([]); // Clear previews
      setSelectedFiles([]); // Clear selected files
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false); // Hide upload message
    }
  };


  // Delete an image
  const deleteImage = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/gallery/${id}`);
      setGalleryData((prevData) => prevData.filter((image) => image._id !== id));
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  return (
    <div className="p-6">
      {loading && <Loader />}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery</h1>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          <FaPlus className="mr-2" />

          Add New
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryData?.map((image) => (
          <GalleryCard key={image._id} image={image} onDelete={deleteImage} />
        ))}
      </div>

      {/* Modal for Uploading */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">Upload Images</h2>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange} // Update the previews on file selection
            className="mb-4"
          />
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
          {uploading ? (
            <p className="mt-4 text-blue-500">Uploading images, please wait...</p>
          ) : (
            <button
              onClick={handleImageUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Upload
            </button>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Layout(Gallery);
