import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorDashboard = () => {
  const { dToken, dashData,setDashData ,getDashData } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  
  return dashData &&  (
    <div className="p-5 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Doctor Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border rounded shadow p-4 text-center">
          <p className="text-xl font-semibold text-gray-800">{dashData.earnings} ₹</p>
          <p className="text-sm text-gray-500">Total Earnings</p>
        </div>
        <div className="bg-white border rounded shadow p-4 text-center">
          <p className="text-xl font-semibold text-gray-800">{dashData.appointments}</p>
          <p className="text-sm text-gray-500">Total Appointments</p>
        </div>
        <div className="bg-white border rounded shadow p-4 text-center">
          <p className="text-xl font-semibold text-gray-800">{dashData.patients}</p>
          <p className="text-sm text-gray-500">Unique Patients</p>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white border rounded shadow p-4">
        <h3 className="text-lg font-medium mb-4">Latest Appointments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Patient</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashData.latestAppointments.map((appt, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{appt?.userData?.name || 'N/A'}</td>
                  <td className="p-2">{appt.slotDate}</td>
                  <td className="p-2">{appt.slotTime}</td>
                  <td className="p-2">{appt.amount} ₹</td>
                  <td className="p-2">
                    {appt.isCompleted ? (
                      <span className="text-green-600 font-medium">Completed</span>
                    ) : appt.cancelled ? (
                      <span className="text-red-600 font-medium">Cancelled</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
              {dashData.latestAppointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No recent appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
