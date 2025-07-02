import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
    markAppointmentCompleted,
  } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  // State for search, filters, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Filter appointments based on search term, status, date, and doctor
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.docData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.customerDetails?.name &&
        appointment.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      appointment.slotDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.slotTime.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unpaid" && appointment.status === "Unpaid") ||
      (statusFilter === "paid" && appointment.status === "Paid") ||
      (statusFilter === "cancelled" && appointment.status === "Cancelled") ||
      (statusFilter === "cancelled_with_refunded" && appointment.status === "Cancelled with Refund") ||
      (statusFilter === "cancelled_with_paid" && appointment.status === "Cancelled with Paid");

    const matchesDate = dateFilter ? appointment.slotDate === dateFilter : true;
    const matchesDoctor = doctorFilter ? appointment.docData.name === doctorFilter : true;

    return matchesSearch && matchesStatus && matchesDate && matchesDoctor;
  }).slice().reverse();

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Confirmation handlers
  const handleMarkPaid = (appointmentId) => {
    if (window.confirm("Are you sure you want to mark this appointment as paid?")) {
      markAppointmentCompleted(appointmentId);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const refund = window.confirm("Would you like to refund this appointment?");
      await cancelAppointment(appointmentId, refund);
    }
  };

  // Get unique dates and doctors for filter options
  const uniqueDates = [...new Set(appointments.map(item => item.slotDate))];
  const uniqueDoctors = [...new Set(appointments.map(item => item.docData.name))];

  return (
    <div className="w-full max-w-7xl m-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <p className="text-lg font-semibold text-gray-800">All Appointments</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search appointments..."
              className="border rounded-lg px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          {/* Status Filter */}
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Status</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
            <option value="cancelled_with_refunded">Cancelled with Refund</option>
            <option value="cancelled_with_paid">Cancelled with Paid</option>
          </select>

          {/* Date Filter */}
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date, index) => (
              <option key={index} value={date}>{slotDateFormat(date)}</option>
            ))}
          </select>

          {/* Doctor Filter */}
          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={doctorFilter}
            onChange={(e) => {
              setDoctorFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Doctors</option>
            {uniqueDoctors.map((doctor, index) => (
              <option key={index} value={doctor}>{doctor}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-700">#</p>
          <p className="text-sm font-semibold text-gray-700">Patient Name</p>
          <p className="text-sm font-semibold text-gray-700">Date & Time</p>
          <p className="text-sm font-semibold text-gray-700">Doctor Name</p>
          <p className="text-sm font-semibold text-gray-700">Customer Details</p>
          <p className="text-sm font-semibold text-gray-700">Fees</p>
          <p className="text-sm font-semibold text-gray-700">Status</p>
          <p className="text-sm font-semibold text-gray-700">Action</p>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              className="grid grid-cols-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 gap-2 transition-colors duration-200"
              key={index}
            >
              <p className="max-sm:hidden">{indexOfFirstItem + index + 1}</p>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <p className="text-sm">{item.userData.name}</p>
              </div>
              <p className="col-span-2 sm:col-span-1 text-sm">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <img
                  className="w-8 h-8 rounded-full bg-gray-200 object-cover"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <p className="text-sm">{item.docData.name}</p>
              </div>
              <div className="col-span-2 sm:col-span-1 text-sm">
                {item.customerDetails?.name ? (
                  <div>
                    <p><strong>Name:</strong> {item.customerDetails.name}</p>
                    <p><strong>Phone:</strong> {item.customerDetails.phone}</p>
                    <p><strong>Address:</strong> {item.customerDetails.address}</p>
                    <p><strong>Reason:</strong> {item.customerDetails.reason}</p>
                  </div>
                ) : (
                  <p>No details provided</p>
                )}
              </div>
              <p className="col-span-1 text-sm">
                {currency}{item.amount}
              </p>
              <div className="col-span-1">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  item.status === "Unpaid" ? "text-blue-500 bg-blue-50" :
                  item.status === "Paid" ? "text-green-500 bg-green-50" :
                  item.status === "Cancelled" ? "text-red-500 bg-red-50" :
                  item.status === "Cancelled with Refund" ? "text-red-500 bg-red-50" :
                  "text-orange-500 bg-orange-50"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="col-span-1 flex justify-end gap-2">
                {item.status === "Unpaid" && (
                  <>
                    <button
                      onClick={() => handleMarkPaid(item._id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors duration-200"
                      title="Mark as Paid"
                    >
                      Mark Paid
                    </button>
                    <img
                      onClick={() => handleCancel(item._id)}
                      className="w-8 h-8 p-1 rounded-full bg-red-100 hover:bg-red-500 hover:scale-110 transition-all duration-200 cursor-pointer"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel"
                    />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No appointments found matching your criteria
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAppointments.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                  currentPage === number
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;