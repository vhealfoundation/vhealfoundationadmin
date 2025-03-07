import React, { useState, useEffect } from "react";
import { IconButton, Switch } from "@mui/material";
import { FaTrash, FaPlus } from 'react-icons/fa';

const AddSectionCard = ({ formData, onFormChange, onSubmit, onCancel, loading }) => {
  const [imagePreview, setImagePreview] = useState(null); // Main image preview

  // Ensure formData.features and reverse are initialized
  useEffect(() => {
    if (!formData.features) {
      onFormChange({ ...formData, features: [] });
    }
    if (formData.reverse === undefined) {
      onFormChange({ ...formData, reverse: false }); // Default to false if not set
    }
  }, [formData, onFormChange]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dymphnafoundation_section"); // Replace with your Cloudinary preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drgmx7x3w/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return { url: data.secure_url, public_id: data.public_id };
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const { url, public_id } = await uploadImageToCloudinary(file);

      const newFormData = { ...formData, image: url, publicId: public_id };
      onFormChange(newFormData);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    onFormChange(newFormData);
  };

  const handleFeaturesChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    const newFormData = { ...formData, features: updatedFeatures };
    onFormChange(newFormData);
  };

  const addFeature = () => {
    const newFormData = {
      ...formData,
      features: [...formData.features, ""],
    };
    onFormChange(newFormData);
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    const newFormData = { ...formData, features: updatedFeatures };
    onFormChange(newFormData);
  };

  const handleReverseToggle = () => {
    const newFormData = { ...formData, reverse: !formData.reverse };
    onFormChange(newFormData);
  };

  return (
    <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Section</h2>
      <form>
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
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Image preview"
                className="mt-2 w-1/4 h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>



        {/* Heading */}
        <div className="mb-4">
          <label htmlFor="heading" className="block text-gray-700">Heading</label>
          <input
            type="text"s
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
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
            required
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
            onInput={(e) => {
              e.target.style.height = 'auto'; // Reset the height
              e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the scroll height
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Features */}
        <div className="mb-4">
          <label className="block text-gray-700">Features</label>
          {formData.features?.map((feature, index) => (
            <div key={index} className="flex items-center my-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeaturesChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder={`Feature ${index + 1}`}
              />
              <IconButton
                onClick={() => removeFeature(index)}
                color="error"
                className="ml-2"
              >
                <FaTrash />
              </IconButton>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-4"
          >  <FaPlus className="mr-2" />
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
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSectionCard;
