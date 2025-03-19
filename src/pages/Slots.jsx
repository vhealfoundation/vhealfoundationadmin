import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../hoc/Layout";
import SlotCard from "../components/SlotCard";
import Loader from "../components/Loader";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FaPlus } from "react-icons/fa";
import moment from "moment";

const Slot = () => {
    const [slots, setSlots] = useState([]);
    const [filteredSlots, setFilteredSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [error, setError] = useState(null);
    const [searchDate, setSearchDate] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    const navigate = useNavigate();

    // Fetch slots on component mount
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/slots`);
                const formattedSlots = response.data.data.map(slot => ({
                    ...slot,
                    date: moment(slot.date).format("DD-MM-YYYY") // Format date to DD-MM-YYYY
                }));
                setSlots(formattedSlots);
                setFilteredSlots(formattedSlots);
                setLoading(false);
            } catch (err) {
                setError("Error fetching slots data");
                setLoading(false);
            }
        };

        fetchSlots();
    }, []);

    // Delete a slot
    const deleteSlot = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/slots/${id}`);
            setSlots(slots.filter((slot) => slot._id !== id));
            setFilteredSlots(filteredSlots.filter((slot) => slot._id !== id));
            toast.success("Slot deleted successfully!");
        } catch (err) {
            console.error("Error deleting slot:", err);
            toast.error("Failed to delete slot");
        }
    };

    // Get unique months from slots for the dropdown
    const months = [...new Set(slots.map(slot => moment(slot.date, "DD-MM-YYYY").format("MMMM YYYY")))];

    // Filter slots by selected month or search date
    useEffect(() => {
        let filtered = slots;

        if (selectedMonth) {
            filtered = filtered.filter(slot => moment(slot.date, "DD-MM-YYYY").format("MMMM YYYY") === selectedMonth);
        }

        if (searchDate) {
            const formattedSearchDate = moment(searchDate, "YYYY-MM-DD").format("DD-MM-YYYY");
            filtered = filtered.filter(slot => slot.date === formattedSearchDate);
        }

        setFilteredSlots(filtered);
    }, [selectedMonth, searchDate, slots]);

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Available Slots</h1>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Filter by Month Dropdown */}
                    <select
                        className="px-4 py-2 border rounded"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>

                    {/* Search by Date Input */}
                    <input
                        type="date"
                        className="px-4 py-2 border rounded"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />

                    {/* Add New Slot Button */}
                    <button
                        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => navigate("/slots/new")}
                    >
                        <FaPlus className="mr-2" />
                        Add New Slot
                    </button>
                </div>
            </div>

            {/* Display loading or slots */}
            {loading ? (
                <Loader />
            ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredSlots.length > 0 ? (
                        filteredSlots.map((slot) => (
                            <SlotCard
                                key={slot._id}
                                slot={slot}
                                onDelete={(slot) => {
                                    setSelectedSlot(slot);
                                    setShowModal(true);
                                }}
                                onEdit={(slot) => {
                                    navigate(`/slots/${slot.date}/${slot._id}`);
                                }}
                                
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">No slots available for the selected criteria.</p>
                    )}
                </div>
            )}

            {/* Confirm Delete Modal */}
            {showModal && selectedSlot && (
                <ConfirmDeleteModal
                    isOpen={showModal}
                    onConfirm={() => {
                        deleteSlot(selectedSlot._id);
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default Layout(Slot);
