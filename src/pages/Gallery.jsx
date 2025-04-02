import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../hoc/Layout";
import GalleryCard from "../components/GalleryCard";
import Loader from "../components/Loader";
import { FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import { Tab } from '@headlessui/react';

const CATEGORIES = [
  "COUNSELLING SERVICES",
  "ASSESSMENTS",
  "TRAINING",
  "COACHING",
  "REHABILITATION OF PRISONERS",
  "OTHER"
];

const Gallery = () => {
  const [galleryData, setGalleryData] = useState({ categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [imageCaptions, setImageCaptions] = useState([]);

  // Fetch gallery data on component mount
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
        setGalleryData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
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
    formData.append("upload_preset", "vhealfoundation_gallery"); // Your Cloudinary preset

    const response = await fetch("https://api.cloudinary.com/v1_1/dgidetrcl/image/upload", {
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
    // Initialize captions array with empty strings for each file
    setImageCaptions(new Array(files.length).fill(""));
  };

  // Handle image uploads when the "Upload" button is clicked
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setUploading(true); // Show upload message
      const uploadedUrls = await Promise.all(selectedFiles.map((file) => uploadImageToCloudinary(file)));

      // Save uploaded images to the backend with category and individual captions
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/gallery/category/${selectedCategory}/images`, {
        images: uploadedUrls.map((url, index) => ({ url, caption: imageCaptions[index] })),
      });

      // Refresh gallery data
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
      setGalleryData(response.data.data);

      // Reset the image previews and selected files after successful upload
      setImagePreviews([]); // Clear previews
      setSelectedFiles([]); // Clear selected files
      setImageCaptions([]); // Clear captions
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Image upload failed:", error);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false); // Hide upload message
    }
  };

  // Delete an image
  const deleteImage = async (categoryTitle, imageId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/gallery/category/${categoryTitle}/image/${imageId}`);

      // Update the state to reflect the deletion
      setGalleryData(prevData => {
        const updatedCategories = prevData.categories.map(category => {
          if (category.title === categoryTitle) {
            return {
              ...category,
              images: category.images.filter(img => img._id !== imageId)
            };
          }
          return category;
        });

        return {
          ...prevData,
          categories: updatedCategories
        };
      });
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image. Please try again.");
    }
  };

  // Update image caption
  const updateImageCaption = async (categoryTitle, imageId, newCaption) => {
    try {
      // Call the API endpoint to update the caption
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/gallery/category/${categoryTitle}/image/${imageId}/caption`, {
        caption: newCaption
      });

      // Update the state to reflect the caption change
      setGalleryData(prevData => {
        const updatedCategories = prevData.categories.map(category => {
          if (category.title === categoryTitle) {
            return {
              ...category,
              images: category.images.map(img => {
                if (img._id === imageId) {
                  return { ...img, caption: newCaption };
                }
                return img;
              })
            };
          }
          return category;
        });

        return {
          ...prevData,
          categories: updatedCategories
        };
      });

      return true; // Return success
    } catch (err) {
      console.error("Error updating image caption:", err);
      setError("Failed to update caption. Please try again.");
      return false; // Return failure
    }
  };

  // Create a new category if it doesn't exist
  const ensureCategoryExists = async (categoryTitle) => {
    try {
      // Check if category already exists in our state
      const categoryExists = galleryData.categories.some(cat => cat.title === categoryTitle);
      
      if (!categoryExists) {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/gallery/category`, {
          title: categoryTitle
        });
        
        // Refresh gallery data
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/gallery`);
        setGalleryData(response.data.data);
      }
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  // When a category tab is selected
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    ensureCategoryExists(category);
  };

  // Find images for the current category
  const getCategoryImages = (categoryTitle) => {
    const category = galleryData.categories.find(cat => cat.title === categoryTitle);
    return category ? category.images : [];
  };

  return (
    <div className="p-6">
      {loading && <Loader />}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          <FaPlus className="mr-2" />
          Add New Images
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {CATEGORIES.map((category) => (
              <Tab
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${selected 
                    ? 'bg-white text-blue-700 shadow' 
                    : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {CATEGORIES.map((category) => (
              <Tab.Panel key={category} className="rounded-xl bg-white p-3">
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {getCategoryImages(category).length > 0 ? (
                    getCategoryImages(category).map((image) => (
                      <GalleryCard
                        key={image._id}
                        image={image}
                        category={category}
                        onDelete={deleteImage}
                        onUpdateCaption={updateImageCaption}
                      />
                    ))
                  ) : (
                    <p className="col-span-3 text-center text-gray-500 py-10">
                      No images in this category. Click "Add New Images" to upload.
                    </p>
                  )}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Modal for Uploading */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex flex-col">
            {/* Fixed Header */}
            <div className="sticky top-0 bg-white pb-4 z-10">
              <h2 className="text-xl font-bold mb-4">Upload Images to {selectedCategory}</h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select Images:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            {imagePreviews.length > 0 && (
              <div className="mt-2 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Previews:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group flex flex-col">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded-lg shadow-md mb-2"
                      />
                      <input
                        type="text"
                        value={imageCaptions[index] || ""}
                        onChange={(e) => {
                          const newCaptions = [...imageCaptions];
                          newCaptions[index] = e.target.value;
                          setImageCaptions(newCaptions);
                        }}
                        className="w-full text-sm border rounded py-1 px-2 text-gray-700 focus:outline-none focus:shadow-outline"
                        placeholder="Add caption for this image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fixed Footer */}
            <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleImageUpload}
                  disabled={uploading || selectedFiles.length === 0}
                  className={`${
                    uploading || selectedFiles.length === 0
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-2 px-4 rounded flex items-center`}
                >
                  {uploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload Images"
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Layout(Gallery);