import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus} from 'react-icons/fa';

const EditAboutCard = ({ about, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: about.title,
    description: about.description,
    content: about.content || [],
    imageSrc: about.imageSrc, // Main image URL
  });

  const [loading, setLoading] = useState(false); // Loading state for image upload
  const [imagePreview, setImagePreview] = useState(null); // Preview for main image upload
  const [contentImagePreviews, setContentImagePreviews] = useState([]); // Previews for content images

  useEffect(() => {
    setFormData({
      title: about.title,
      description: about.description,
      content: about.content || [],
      imageSrc: about.imageSrc,
    });
  }, [about]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vhealfoundation_about"); // Cloudinary preset

    setLoading(true); // Show loading during upload

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgidetrcl/image/upload",
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

  // Handle image upload for both main and content images
  const handleImageUpload = async (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const previewUrl = URL.createObjectURL(file);

      // Show preview before uploading
      if (index !== null) {
        // Content image upload logic
        const newPreviews = [...contentImagePreviews];
        newPreviews[index] = previewUrl;
        setContentImagePreviews(newPreviews);
      } else {
        // Main image upload logic
        setImagePreview(previewUrl);
      }

      const { url } = await uploadImageToCloudinary(file);

      if (index !== null) {
        // Update content image URL
        const updatedContent = [...formData.content];
        updatedContent[index].image = url;
        const newFormData = { ...formData, content: updatedContent };
        setFormData(newFormData); // Update local state
      } else {
        // Update main image URL
        const newFormData = { ...formData, imageSrc: url };
        setFormData(newFormData); // Update local state
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleImageDelete = (index = null) => {
    if (index !== null) {
      // Delete content image
      const updatedContent = [...formData.content];
      updatedContent[index].image = ""; // Reset the image URL
      const newFormData = { ...formData, content: updatedContent };
      setFormData(newFormData); // Update local state
    } else {
      // Delete main image
      const newFormData = { ...formData, imageSrc: "" };
      setFormData(newFormData); // Update local state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index][field] = value;
    setFormData({ ...formData, content: updatedContent });
  };

  const handleAddContentBlock = () => {
    const newContentBlock = {
      image: "", // Initialize empty or valid image URL
      title: "", // Initialize empty or valid title
      description: "", // Initialize empty or valid description
    };

    setFormData({
      ...formData,
      content: [...formData.content, newContentBlock],
    });
  };

  const handleRemoveContentBlock = (index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      content: updatedContent,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="mt-4 mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit About Card</h2>

      <form onSubmit={handleSubmit}>
        {/* Title and Description Fields */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Main Image Section */}
        <div className="mb-4">
          <label htmlFor="imageSrc" className="block text-gray-700">Main Image</label>
          <input
            type="file"
            id="imageSrc"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)} // Handle main image upload
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {loading && <p className="mt-2 text-blue-500">Uploading images, please wait...</p>} {/* Loading message */}

          {/* Main Image Preview */}
          {formData.imageSrc && !loading && (
            <div className="mt-4 flex items-center gap-4 ">
              <img
                src={formData.imageSrc}
                alt="Main Image"
                className="mt-2 w-1/4 h-auto rounded-lg shadow-md"
              />

              <button
                onClick={() => handleImageDelete()}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Content Image Sections */}
        {formData.content.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Content {index + 1}</h3>

            <div className="mb-2">
              <label htmlFor={`content-title-${index}`} className="block text-gray-700">Content Title</label>
              <input
                type="text"
                id={`content-title-${index}`}
                name="content-title"
                value={item.title}
                onChange={(e) => handleContentChange(index, "title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor={`content-description-${index}`} className="block text-gray-700">Content Description</label>
              <textarea
                id={`content-description-${index}`}
                name="content-description"
                value={item.description}
                onChange={(e) => handleContentChange(index, "description", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required

        
              />
            </div>

            {/* Content Image Upload and Delete */}
            <div className="mb-4">
              <label className="block text-gray-700">Content Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)} // Handle content image upload
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            {loading && <p className="mt-2 text-blue-500">Uploading images, please wait...</p>}
              {/* Content Image Preview */}
              {item.image && !loading && (
                <div className="mt-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={`Content Image ${index + 1}`}
                    className="mt-2 w-1/4 h-auto rounded-lg shadow-md"
                  />

                  <button
                    onClick={() => handleImageDelete(index)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Remove content block */}
            <button
              type="button"
              onClick={() => handleRemoveContentBlock(index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete Content Block
            </button>
          </div>
        ))}

        {/* Add Content Block Button */}
        <div className="mb-4">
    
          <button
          type="button"
          onClick={handleAddContentBlock}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-4"
        >
           <FaPlus className="mr-2" />
          Add Content Block
        </button>
        </div>
        

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAboutCard;
