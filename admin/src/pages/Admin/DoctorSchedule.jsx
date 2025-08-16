// Assuming this is placed in src/pages/Admin/DoctorSchedule.jsx or similar
import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const DoctorSchedule = () => {
  const { doctors, addDoctorSchedule } = useContext(AdminContext);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const handleAddTimeSlot = () => {
    if (timeSlot && !timeSlots.includes(timeSlot)) {
      setTimeSlots([...timeSlots, timeSlot]);
      setTimeSlot("");
    } else {
      toast.warn("Invalid or duplicate time slot");
    }
  };

  const handleRemoveTimeSlot = (slot) => {
    setTimeSlots(timeSlots.filter((s) => s !== slot));
  };

  const handleSaveSchedule = async () => {
    if (!selectedDoctor || !selectedDate || timeSlots.length === 0) {
      return toast.error("Please select doctor, date, and add at least one time slot");
    }

    await addDoctorSchedule(selectedDoctor, selectedDate, timeSlots);
    // Reset form
    setSelectedDoctor("");
    setSelectedDate("");
    setTimeSlots([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Doctor Schedule</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="">Choose Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} - {doc.speciality}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Add Time Slot (e.g., 10:00 AM)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value.toUpperCase())}
              placeholder="10:00 AM"
              className="mt-1 p-2 flex-1 border rounded"
            />
            <button
              type="button"
              onClick={handleAddTimeSlot}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Added Time Slots</h3>
          <ul className="list-disc pl-5">
            {timeSlots.map((slot, index) => (
              <li key={index} className="flex justify-between">
                {slot}
                <button
                  onClick={() => handleRemoveTimeSlot(slot)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleSaveSchedule}
          className="px-6 py-2 bg-primary text-white rounded"
        >
          Save Schedule
        </button>
      </div>
    </div>
  );
};

export default DoctorSchedule;