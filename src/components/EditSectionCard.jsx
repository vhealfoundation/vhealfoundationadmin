import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, Switch } from "@mui/material";
import { FaTrash, FaPlus } from 'react-icons/fa';



const EditSectionCard = ({ section, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    image: section.image || "",
    alt: section.alt || "",
    heading: section.heading || "",
    subheading: section.subheading || "",
    description: section.description || "",
    features: section.features || [],
    reverse: section.reverse || false,
  });

  const [loading, setLoading] = useState(false); // Loading state for image upload
  const [imagePreview, setImagePreview] = useState(null); // Preview for image upload

  useEffect(() => {
    setFormData({
      image: section.image || "",
      alt: section.alt || "",
      heading: section.heading || "",
      subheading: section.subheading || "",
      description: section.description || "",
      features: section.features || [],
      reverse: section.reverse || false,
    });
  }, [section]);

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dymphnafoundation_section"); // Cloudinary preset

    setLoading(true); // Show loading during upload

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drgmx7x3w/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false); // Hide loading after upload finishes

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return { url: data.secure_url, public_id: data.public_id };
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Preview image before upload
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const { url } = await uploadImageToCloudinary(file);

      // Update form data with Cloudinary image URL
      setFormData({ ...formData, image: url });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeaturesChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleReverseToggle = (event) => {
    setFormData({ ...formData, reverse: event.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Section</h2>
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {loading && <p className="mt-2 text-blue-500">Uploading image, please wait...</p>}

          {formData.image && !loading && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Image preview"
                className="mt-2 w-1/4 h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          {imagePreview && !formData.image && !loading && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image preview"
                className="w-full h-auto max-w-xs rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Alt Text */}
        <div className="mb-4">
          <label htmlFor="alt" className="block text-gray-700">Alt Text</label>
          <input
            type="text"
            id="alt"
            name="alt"
            value={formData.alt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Heading */}
        <div className="mb-4">
          <label htmlFor="heading" className="block text-gray-700">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Subheading */}
        <div className="mb-4">
          <label htmlFor="subheading" className="block text-gray-700">Subheading</label>
          <input
            type="text"
            id="subheading"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Features */}
        <div className="mb-4">
          <label className="block text-gray-700">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="my-2 flex items-center gap-4">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeaturesChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={`Feature ${index + 1}`}
              />
              <button
                onClick={() => removeFeature(index)}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>

            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-4"
          > <FaPlus className="mr-2" />
            Add Feature
          </button>
        </div>

        {/* Reverse Toggle */}
        <div className="mb-4 flex items-center">
          <label htmlFor="reverse" className="block text-gray-700 mr-4">Reverse Order</label>
          <Switch
            checked={formData.reverse}
            onChange={handleReverseToggle}
            color="primary"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSectionCard;
