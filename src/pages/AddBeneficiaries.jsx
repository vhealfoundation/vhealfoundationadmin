import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../hoc/Layout";
import AddBeneficiariesCard from "../components/AddBeneficiariesCard";

const AddBeneficiaries = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        description: "",
        requirements: [],
        image: "",
    });

    // Handle form data change
    const handleFormChange = (updatedData) => {
        setFormData(updatedData);
    };

    // Handle form submission
    const handleSubmit = async (newBeneficiary) => {

        if (!formData.name || !formData.age || !formData.description || formData.requirements.length === 0) {

            toast.error("Please fill all the fields!");
            return;
        }

        try {

            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/beneficiary`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBeneficiary),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add beneficiary");
            }

            const data = await response.json();
            toast.success("About card added successfully!");
            navigate("/beneficiaries");
        } catch (error) {
            console.error("Error adding beneficiary:", error);
            alert("Failed to add beneficiary.");
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        setFormData({
            name: "",
            age: "",
            description: "",
            requirements: [],
            image: "",
        });
        navigate("/beneficiaries");
    };

    return (
        <div className="p-6 ">
            <h1 className="text-3xl font-bold">Add New</h1>

            <AddBeneficiariesCard
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default Layout(AddBeneficiaries);
