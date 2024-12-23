// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const MainData = () => {
//   // Static data for donations
//   const donationData = [
//     { month: 'January', amount: 15000, beneficiary: 'Charity A' },
//     { month: 'February', amount: 20000, beneficiary: 'Charity B' },
//     { month: 'March', amount: 25000, beneficiary: 'Charity C' },
//     { month: 'April', amount: 18000, beneficiary: 'Charity D' },
//     { month: 'May', amount: 22000, beneficiary: 'Charity E' },
//     { month: 'June', amount: 30000, beneficiary: 'Charity F' },
//     { month: 'July', amount: 27000, beneficiary: 'Charity G' },
//     { month: 'August', amount: 24000, beneficiary: 'Charity H' },
//     { month: 'September', amount: 21000, beneficiary: 'Charity I' },
//     { month: 'October', amount: 26000, beneficiary: 'Charity J' },
//     { month: 'November', amount: 29000, beneficiary: 'Charity K' },
//     { month: 'December', amount: 32000, beneficiary: 'Charity L' },
//   ];

//   // Chart data and configurations
//   const totalAmount = donationData.reduce((total, item) => total + item.amount, 0);

//   // Bar Chart for Donations by Month
//   const barData = {
//     labels: donationData.map((data) => data.month),
//     datasets: [
//       {
//         label: 'Amount Raised (₹)',
//         data: donationData.map((data) => data.amount),
//         backgroundColor: '#4caf50',
//         borderColor: '#388e3c',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Line Chart for Cumulative Donations
//   const cumulativeData = donationData.map((data, index) =>
//     donationData.slice(0, index + 1).reduce((sum, item) => sum + item.amount, 0)
//   );
//   const lineData = {
//     labels: donationData.map((data) => data.month),
//     datasets: [
//       {
//         label: 'Cumulative Donations (₹)',
//         data: cumulativeData,
//         borderColor: '#3b82f6',
//         backgroundColor: '#93c5fd',
//         fill: true,
//       },
//     ],
//   };

//   // Pie Chart for Donation Distribution
//   const pieData = {
//     labels: donationData.map((data) => data.beneficiary),
//     datasets: [
//       {
//         data: donationData.map((data) => data.amount),
//         backgroundColor: [
//           '#ef4444',
//           '#f59e0b',
//           '#10b981',
//           '#3b82f6',
//           '#8b5cf6',
//           '#ec4899',
//           '#22c55e',
//           '#9333ea',
//           '#eab308',
//           '#14b8a6',
//           '#f43f5e',
//           '#84cc16',
//         ],
//         hoverBackgroundColor: [
//           '#dc2626',
//           '#d97706',
//           '#059669',
//           '#2563eb',
//           '#7c3aed',
//           '#db2777',
//           '#15803d',
//           '#7e22ce',
//           '#ca8a04',
//           '#0f766e',
//           '#be123c',
//           '#65a30d',
//         ],
//       },
//     ],
//   };

//   // Doughnut Chart for Donors to Beneficiaries Ratio (Static Example)
//   const doughnutData = {
//     labels: ['Donors', 'Beneficiaries'],
//     datasets: [
//       {
//         data: [100, donationData.length],
//         backgroundColor: ['#6366f1', '#f97316'],
//         hoverBackgroundColor: ['#4338ca', '#ea580c'],
//       },
//     ],
//   };

//   return (
//     <div className="pt-6 ">
//       {/* Summary Section */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         <div className="flex flex-col bg-green-500 text-white rounded-lg shadow-lg p-6">
//           <h4 className="text-lg font-medium">Total Donations</h4>
//           <h2 className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</h2>
//         </div>
//         <div className="flex flex-col bg-blue-500 text-white rounded-lg shadow-lg p-6">
//           <h4 className="text-lg font-medium">Total Months</h4>
//           <h2 className="text-3xl font-bold">{donationData.length}</h2>
//         </div>
//         <div className="flex flex-col bg-orange-500 text-white rounded-lg shadow-lg p-6">
//           <h4 className="text-lg font-medium">Total Beneficiaries</h4>
//           <h2 className="text-3xl font-bold">{donationData.length}</h2>
//         </div>
//         <div className="flex flex-col bg-purple-500 text-white rounded-lg shadow-lg p-6">
//           <h4 className="text-lg font-medium">Total Donors</h4>
//           <h2 className="text-3xl font-bold">100</h2>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="flex flex-col sm:flex-row gap-6">
//         {/* Line Chart */}
//         <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">Cumulative Donations</h3>
//           <Line data={lineData} />
//         </div>

//         {/* Pie Chart */}
//         <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">Donation Distribution</h3>
//           <Pie data={pieData} />
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-6 mt-6">
//         {/* Bar Chart */}
//         <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">Monthly Donations</h3>
//           <Bar data={barData} />
//         </div>

//         {/* Doughnut Chart */}
//         <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">Donors vs Beneficiaries</h3>
//           <Doughnut data={doughnutData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainData;


import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const MainData = () => {
  const [summary, setSummary] = useState({ totalDonations: 0, totalBeneficiaries: 0, totalDonors: 0 });
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [cumulativeDonations, setCumulativeDonations] = useState([]);
  const [donationDistribution, setDonationDistribution] = useState([]);
  const [donorBeneficiaryRatio, setDonorBeneficiaryRatio] = useState({ donors: 0, beneficiaries: 0 });

  useEffect(() => {
    // Fetch all data from the APIs
    const fetchData = async () => {
      try {
        const [summaryRes, monthlyRes, cumulativeRes, distributionRes, ratioRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/summary`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/monthly-donations`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/cumulative-donations`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/donation-distribution`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/donor-beneficiary-ratio`),
        ]);


        setSummary(summaryRes.data.data);
        setMonthlyDonations(monthlyRes.data.data);
        setCumulativeDonations(cumulativeRes.data.data);
        setDonationDistribution(distributionRes.data.data);
        setDonorBeneficiaryRatio(ratioRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(summary, monthlyDonations, cumulativeDonations, donationDistribution, donorBeneficiaryRatio);

  // Prepare data for charts

  // Bar Chart for Donations by Month
  const barData = {
    labels: monthlyDonations.map((data) => data.month),
    datasets: [
      {
        label: 'Amount Raised (₹)',
        data: monthlyDonations.map((data) => data.totalAmount),
        backgroundColor: '#4caf50',
        borderColor: '#388e3c',
        borderWidth: 1,
      },
    ],
  };

  // Line Chart for Cumulative Donations
  const lineData = {
    labels: cumulativeDonations.map((data) => data.date),
    datasets: [
      {
        label: 'Cumulative Donations (₹)',
        data: cumulativeDonations.map((data) => data.cumulativeAmount),
        borderColor: '#3b82f6',
        backgroundColor: '#93c5fd',
        fill: true,
      },
    ],
  };

  // Pie Chart for Donation Distribution
  const pieData = {
    labels: donationDistribution.map((data) => data.beneficiary),
    datasets: [
      {
        data: donationDistribution.map((data) => data.totalAmount),
        backgroundColor: [
          '#ef4444',
          '#f59e0b',
          '#10b981',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#22c55e',
          '#9333ea',
          '#eab308',
          '#14b8a6',
          '#f43f5e',
          '#84cc16',
        ],
        hoverBackgroundColor: [
          '#dc2626',
          '#d97706',
          '#059669',
          '#2563eb',
          '#7c3aed',
          '#db2777',
          '#15803d',
          '#7e22ce',
          '#ca8a04',
          '#0f766e',
          '#be123c',
          '#65a30d',
        ],
      },
    ],
  };


  const doughnutData = {
    labels: ['Donors', 'Beneficiaries'],
    datasets: [
      {
        data: [donorBeneficiaryRatio.donors, donorBeneficiaryRatio.beneficiaries],
        backgroundColor: ['#6366f1', '#f97316'],
        hoverBackgroundColor: ['#4338ca', '#ea580c'],
      },
    ],
  };

  return (
    <div className="pt-6 ">
      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col bg-green-500 text-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-medium">Total Donations</h4>
          <h2 className="text-3xl font-bold">₹{summary.totalDonations.toLocaleString()}</h2>
        </div>
        <div className="flex flex-col bg-blue-500 text-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-medium">Total Months</h4>
          <h2 className="text-3xl font-bold">{monthlyDonations.length}</h2>
        </div>
        <div className="flex flex-col bg-orange-500 text-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-medium">Total Beneficiaries</h4>
          <h2 className="text-3xl font-bold">{summary.totalBeneficiaries}</h2>
        </div>
        <div className="flex flex-col bg-purple-500 text-white rounded-lg shadow-lg p-6">
          <h4 className="text-lg font-medium">Total Donors</h4>
          <h2 className="text-3xl font-bold">{summary.totalDonors}</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Line Chart */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Cumulative Donations</h3>
          <Line data={lineData} />
        </div>

        {/* Pie Chart */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Donation Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        {/* Bar Chart */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Monthly Donations</h3>
          <Bar data={barData} />
        </div>

        {/* Doughnut Chart */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Donors vs Beneficiaries</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default MainData;
