import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text:sm max-h-[80vh]">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3">
          <p>#</p>
          <p>Booking Details</p>
          <p>Customer Details</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center py-3 px-2 border-t text-sm"
          >
            <p>{index + 1}</p>

            {/* Booking Details */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Customer Details */}
            <div>
              <p>
                <b>{item.customerDetails.name}</b>
              </p>
              <p>{item.customerDetails.phone}</p>
              <p className="truncate w-[140px]">
                {item.customerDetails.address}
              </p>
            </div>

            {/* Age */}
            <div>
              <p>
                {item.userData.dob
                  ? `${
                      new Date().getFullYear() -
                      new Date(item.userData.dob).getFullYear()
                    } yr`
                  : "N/A"}
              </p>
            </div>

            {/* Date & Time */}
            <div>
              <p>{item.slotDate.replace(/_/g, "/")}</p>
              <p>{item.slotTime}</p>
            </div>

            {/* Fees */}
            <div>
              <p>₹{item.amount}</p>
            </div>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
