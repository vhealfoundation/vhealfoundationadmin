import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const AddBeneficiariesCard = ({ onFormChange, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false); // State to track if image is uploading
  const [imagePreview, setImagePreview] = useState(null); // State to track image preview for main image
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    requirements: [],
    image: "",
  });

  // Cloudinary image upload function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dymphnafoundation_beneficiaries");

    setLoading(true); 

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/drgmx7x3w/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false); // Hide loading after image is uploaded

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return { url: data.secure_url, public_id: data.public_id }; // Return the URL and public_id of the uploaded image
  };

  // Handle image upload for both main image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Set image preview before uploading
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Upload the image to Cloudinary
      const { url, public_id } = await uploadImageToCloudinary(file);

      // Update formData with the uploaded image URL and publicId
      const newFormData = { ...formData, image: url, publicId: public_id };
      setFormData(newFormData);
      onFormChange(newFormData); // Update parent component state
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData); // Update state with new value
    onFormChange(newFormData); // Update parent component state
  };

  const handleRequirementsChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    const newFormData = { ...formData, requirements: newRequirements };
    setFormData(newFormData);
    onFormChange(newFormData); // Update parent component state
  };

  const addRequirement = () => {
    const newRequirements = [...formData.requirements, ""];
    const newFormData = { ...formData, requirements: newRequirements };
    setFormData(newFormData);
    onFormChange(newFormData); // Update parent component state
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    const newFormData = { ...formData, requirements: newRequirements };
    setFormData(newFormData);
    onFormChange(newFormData); // Update parent component state
  };

  return (
    <div className="mt-4 mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Beneficiary Form */}
      <form>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Requirements Field */}
        <div className="mb-4">
          <label htmlFor="requirements" className="block text-gray-700">
            Requirements
          </label>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={requirement}
                onChange={(e) =>
                  handleRequirementsChange(index, e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={`Requirement ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="ml-2 text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaPlus className="mr-2" />
            Add Requirement
          </button>
        </div>

        {/* Image Upload and Preview */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />

          {loading && <p className="mt-2 text-blue-500">Uploading image, please wait...</p>}

          {imagePreview && !loading && (
            <div className="mt-4">
              <p className="text-gray-600">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Image preview"
                className="mt-2 w-1/4 h-auto rounded-lg shadow-md"
              />
            </div>
          )}
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
            type="button"
            onClick={() => onSubmit(formData)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBeneficiariesCard;
