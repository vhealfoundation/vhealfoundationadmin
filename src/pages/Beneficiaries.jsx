import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../hoc/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const Beneficiaries = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beneficiary`);
                setBeneficiaries(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching beneficiaries:", error);
                setError("Error fetching beneficiaries");
                setLoading(false);
            }
        };

        fetchBeneficiaries();
    }, []);

    // Pagination calculations
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = beneficiaries?.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(beneficiaries.length / rowsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleEdit = (id) => {
        navigate(`/beneficiary/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            setShowModal(false);
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/beneficiary/${id}`);
            setBeneficiaries((prevData) => prevData.filter((beneficiary) => beneficiary._id !== id));

            toast.success("Beneficiary deleted successfully!");
        } catch (error) {
            console.error("Error deleting beneficiary:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Beneficiaries</h1>
                <button
                    onClick={() => navigate("/beneficiary/new")}
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    <FaPlus className="mr-2" />
                    Add New
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <table className="mt-4 min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="py-3 px-4 text-left">S.No</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Age</th>
                                <th className="py-3 px-4 text-left">Amount Raised</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((beneficiary, index) => (
                                <>
                                    <tr
                                        key={beneficiary._id}
                                        className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                    >
                                        <td className="px-4 py-2 text-sm text-gray-700">{indexOfFirstRow + index + 1}</td>
                                        <td className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700">
                                            <img
                                                src={beneficiary.image}
                                                alt={beneficiary.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            {beneficiary.name}

                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{beneficiary.age}</td>
                                        
                                        <td className="px-4 py-2 text-sm text-gray-700">{beneficiary.amount_raised}</td>
                                        <td className="px-4 py-2 flex space-x-4">
                                            <button
                                                onClick={() => handleEdit(beneficiary._id)}
                                                className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                                            >
                                                <FaEdit className="text-xl" />
                                            </button>
                                            <button
                                                onClick={() => setShowModal(true)}
                                                className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                                            >
                                                <FaTrashAlt className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                    {showModal && (
                                        <ConfirmDeleteModal
                                            isOpen={showModal}
                                            onConfirm={() => handleDelete(beneficiary._id)}
                                            onCancel={() => setShowModal(false)}
                                        />
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <nav>
                            <ul className="flex list-none space-x-2">
                                <li>
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                    >
                                        Prev
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => paginate(index + 1)}
                                            className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-700"
                                                } hover:bg-blue-400`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
};

export default Layout(Beneficiaries);
