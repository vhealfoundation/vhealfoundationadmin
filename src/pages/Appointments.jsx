import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../hoc/Layout";
import axios from "axios";
import Loader from "../components/Loader";
import AppointmentsTable from "../components/AppointmentsTable";
import { FaPlus } from "react-icons/fa";


const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/appointments`);
        setAppointments(response.data.data || []); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Appointments</h1>

        {/* Add New AboutCard Button */}
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => navigate("/slot/new")}
        >
          <FaPlus className="mr-2" />
          Add New Slot
        </button>
      </div>

      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <AppointmentsTable appointmentsData={appointments} />
        )}
      </div>
    </div>
  );
};

export default Layout(Appointments);
