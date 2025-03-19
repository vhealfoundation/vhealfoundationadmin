import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const EditBeneficiariesCard = ({ beneficiary, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    requirements: [],
    image: "",
    publicId: "",
  });

  const [imagePreview, setImagePreview] = useState(null); // State to track image preview
  const [loading, setLoading] = useState(false); // State for image uploading

  useEffect(() => {
    // Set initial formData with the beneficiary data
    setFormData({
      name: beneficiary.name,
      age: beneficiary.age,
      description: beneficiary.description,
      requirements: beneficiary.requirements || [],
      image: beneficiary.image || "",
      publicId: beneficiary.publicId || "",
    });
    setImagePreview(beneficiary.image); // Set initial image preview
  }, [beneficiary]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleRequirementsChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addRequirement = () => {
    const newRequirements = [...formData.requirements, ""];
    setFormData({ ...formData, requirements: newRequirements });
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      // Similar to the AddBeneficiariesCard's image upload function
      const { url, public_id } = await uploadImageToCloudinary(file);
      setImagePreview(url);
      setFormData((prevData) => ({
        ...prevData,
        image: url,
        publicId: public_id,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vhealfoundation_beneficiaries");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgidetrcl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return { url: data.secure_url, public_id: data.public_id };
  };

  return (
    <div className="mt-4 mx-auto bg-white shadow-lg rounded-lg p-6 mb-12">
      <form>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="requirements" className="block text-gray-700">
            Requirements
          </label>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={requirement}
                onChange={(e) => handleRequirementsChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
            className="mt-2 flex items-center text-blue-500"
          >
            <FaPlus className="mr-2" />
            Add Requirement
          </button>
        </div>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onUpdate(formData)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBeneficiariesCard;
