import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, markAppointmentCompleted, dashData, getDashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

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

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const refund = window.confirm("Would you like to refund this appointment?");
      await cancelAppointment(appointmentId, refund);
    }
  };

  return (
    dashData && (
      <div className="m-6 max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
          {/* <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-600 font-medium">Patients</p>
            </div>
          </div> */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <img src={assets.patients_icon} alt="Today's Collection" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">₹{dashData.todaysCollection}</p>
              <p className="text-gray-600 font-medium">Today's Collection</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} alt="List" className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Latest Bookings</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
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
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      item.status === "Unpaid" ? "text-blue-500 bg-blue-50" :
                      item.status === "Paid" ? "text-green-500 bg-green-50" :
                      item.status === "Cancelled" ? "text-red-500 bg-red-50" :
                      item.status === "Cancelled with Refund" ? "text-red-500 bg-red-50" :
                      "text-orange-500 bg-orange-50"
                    }`}>
                      {item.status}
                    </span>
                    {item.status === "Unpaid" && (
                      <div className="flex gap-2">
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
                No appointments found
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;