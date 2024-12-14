import React, { useState } from "react";

const AddAboutCard = ({ formData, onFormChange, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false); // State to track if image is uploading
  const [imagePreview, setImagePreview] = useState(null); // State to track image preview for main image
  const [contentImagePreviews, setContentImagePreviews] = useState([]); // State to track image previews for content images

  // Cloudinary image upload function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dymphnafoundation_about"); // Your Cloudinary preset

    setLoading(true); // Show loading when image is uploading

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

  // Handle image upload for both main and content images
  const handleImageUpload = async (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Set image preview before uploading
      const previewUrl = URL.createObjectURL(file);

      if (index !== null) {
        // Content image upload logic
        const newPreviews = [...contentImagePreviews];
        newPreviews[index] = previewUrl;
        setContentImagePreviews(newPreviews);
      } else {
        // Main image upload logic
        setImagePreview(previewUrl);
      }

      // Upload the image to Cloudinary
      const { url, public_id } = await uploadImageToCloudinary(file);
      console.log("Uploaded image URL:", url);

      if (index !== null) {
        // Update the content image URL and publicId
        const updatedContent = [...formData.content];
        updatedContent[index].image = url;
        updatedContent[index].publicId = public_id; // Add publicId
        const newFormData = { ...formData, content: updatedContent };
        onFormChange(newFormData); // Update parent component state
      } else {
        // Update the main image URL and publicId
        const newFormData = { ...formData, imageSrc: url, image: url, publicId: public_id }; // Add publicId
        onFormChange(newFormData); // Update parent component state
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    onFormChange(newFormData); // Update parent component state
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index][field] = value;
    const newFormData = { ...formData, content: updatedContent };
    onFormChange(newFormData); // Update parent component state
  };

  const addContent = () => {
    const newFormData = {
      ...formData,
      content: [
        ...formData.content,
        { title: "", description: "", publicId: "", image: "" },
      ],
    };
    onFormChange(newFormData); // Update parent component state
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add About Card</h2>

      {/* Title and Description Fields */}
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
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

        {/* Main Image Upload and Preview */}
        <div className="mb-4">
          <label htmlFor="imageSrc" className="block text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="imageSrc"
            name="imageSrc"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)} // Handle main image upload
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          
          {loading && <p className="mt-2 text-blue-500">Uploading images, please wait...</p>} {/* Display loading text while uploading */}
          
          {/* Main Image Preview */}
          {imagePreview && !loading && (
            <div className="mt-4">
              <p className="text-gray-600">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Image preview"
                className="mt-2 w-full h-auto max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Content Fields */}
        {formData.content.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Content {index + 1}
            </h3>

            <div className="mb-2">
              <label
                htmlFor={`content-title-${index}`}
                className="block text-gray-700"
              >
                Content Title
              </label>
              <input
                type="text"
                id={`content-title-${index}`}
                name="content-title"
                value={item.title}
                onChange={(e) =>
                  handleContentChange(index, "title", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor={`content-description-${index}`}
                className="block text-gray-700"
              >
                Content Description
              </label>
              <textarea
                id={`content-description-${index}`}
                name="content-description"
                value={item.description}
                onChange={(e) =>
                  handleContentChange(index, "description", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Content Image Upload and Preview */}
            <div className="mb-2">
              <label
                htmlFor={`content-image-${index}`}
                className="block text-gray-700"
              >
                Content Image
              </label>
              <input
                type="file"
                id={`content-image-${index}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)} // Handle content image upload
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              {contentImagePreviews[index] && !loading && (
                <div className="mt-2">
                  <p className="text-gray-600">Content Image Preview:</p>
                  <img
                    src={contentImagePreviews[index]}
                    alt="Content image preview"
                    className="mt-2 w-full h-auto max-w-xs rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Content Block Button */}
        <button
          type="button"
          onClick={addContent}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-4"
        >
          Add Content Block
        </button>

        {/* Action Buttons */}
        <div className="flex justify-between">
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAboutCard;
