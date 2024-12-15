import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaUpload } from "react-icons/fa";

const EditStoriesCard = ({ story, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    coverimage: "",
    title: "",
    description: "",
    content: [],
  });
  const [uploading, setUploading] = useState(false);

  // Populate formData when story is passed in as a prop
  useEffect(() => {
    if (story) {
      setFormData({
        coverimage: story.coverimage || "",
        title: story.title || "",
        description: story.description || "",
        content: story.content || [],
      });
    }
  }, [story]); // This will run when `story` changes

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dymphnafoundation_gallery"); // Replace with your Cloudinary preset

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/drgmx7x3w/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return null;
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await uploadImageToCloudinary(file);
    if (uploadedUrl) {
      setFormData({ ...formData, coverimage: uploadedUrl });
    }
    setUploading(false);
  };

  const handleSectionImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await uploadImageToCloudinary(file);
    if (uploadedUrl) {
      const updatedContent = [...formData.content];
      updatedContent[index].image = uploadedUrl;
      setFormData({ ...formData, content: updatedContent });
    }
    setUploading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index][field] = value;
    setFormData({ ...formData, content: updatedContent });
  };

  const addContent = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { image: "", title: "", description: "" }],
    });
  };

  const removeContent = (index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index);
    setFormData({ ...formData, content: updatedContent });
  };

  const handleSave = () => {
    onSave(formData); // Pass the final data to the parent component
  };

  return (
    <div className="mt-4 bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Story</h2>

      {/* Cover Image */}
      <div className="mb-4">
        <label htmlFor="coverimage" className="block text-gray-700">Cover Image</label>
        <input
          type="file"
          id="coverimage"
          onChange={handleCoverImageUpload}
          className="mb-2"
        />
        {uploading && <p className="text-blue-500">Uploading...</p>}
        {formData.coverimage && (
          <img
            src={formData.coverimage}
            alt="Cover"
            className="w-1/3 h-auto object-cover rounded-lg mt-2"
          />
        )}
      </div>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
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

      {/* Content Sections */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Content Sections</h3>
        {formData.content.map((section, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg">
            {/* Section Image */}
            <div className="mb-2">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                onChange={(e) => handleSectionImageUpload(index, e)}
                className="mb-2"
              />
              {uploading && <p className="text-blue-500">Uploading...</p>}
              {section.image && (
                <img
                  src={section.image}
                  alt={`Section ${index}`}
                  className="w-1/3 h-auto object-cover rounded-lg mt-2"
                />
              )}
            </div>

            {/* Section Title */}
            <div className="mb-2">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleContentChange(index, "title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Section Description */}
            <div className="mb-2">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={section.description}
                onChange={(e) => handleContentChange(index, "description", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Remove Content Button */}
            <button
              type="button"
              onClick={() => removeContent(index)}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              <FaTrash className="mr-2" />
              Remove Section
            </button>
          </div>
        ))}
      </div>

      {/* Add Content Button */}
      <button
        type="button"
        onClick={addContent}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-4"
      >
        <FaPlus className="mr-2" />
        Add Content Section
      </button>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditStoriesCard;
