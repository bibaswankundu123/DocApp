import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, markAppointmentCompleted, dashData, getDashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  // Confirmation handlers
  const handleMarkPaid = (appointmentId) => {
    if (window.confirm("Are you sure you want to mark this appointment as paid?")) {
      markAppointmentCompleted(appointmentId);
    }
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(appointmentId);
    }
  };

  // Filter appointments
  const filteredAppointments = dashData?.latestAppointments?.filter((appointment) => {
    const matchesSearch =
      appointment.docData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.slotDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.slotTime.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter ? appointment.slotDate === dateFilter : true;
    const matchesDoctor = doctorFilter ? appointment.docData.name === doctorFilter : true;

    return matchesSearch && matchesDate && matchesDoctor;
  }) || [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique dates and doctors for filter options
  const uniqueDates = [...new Set(dashData?.latestAppointments?.map(item => item.slotDate))];
  const uniqueDoctors = [...new Set(dashData?.latestAppointments?.map(item => item.docData.name))];

  return (
    dashData && (
      <div className="m-6 max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-600 font-medium">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <img src={assets.appointments_icon} alt="Appointments" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-600 font-medium">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-600 font-medium">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={assets.list_icon} alt="List" className="w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-800">Latest Bookings</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    className="border rounded-lg px-4 py-2 pl-10 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          </div>
          <div className="divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <div
                  className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                  key={index}
                >
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-medium text-gray-800">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.isRefunded ? (
                      <span className="text-red-500 text-xs font-medium px-3 py-1 rounded-full bg-red-50">
                        Refund
                      </span>
                    ) : item.isPaid ? (
                      <span className="text-green-500 text-xs font-medium px-3 py-1 rounded-full bg-green-50">
                        Paid
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <span className="text-blue-500 text-xs font-medium px-3 py-1 rounded-full bg-blue-50">
                          Unpaid
                        </span>
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
                      </div>
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
    )
  );
};

export default Dashboard;