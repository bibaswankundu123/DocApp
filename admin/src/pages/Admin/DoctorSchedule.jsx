// Assuming this is placed in src/pages/Admin/DoctorSchedule.jsx or similar
import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const DoctorSchedule = () => {
  const { doctors, addDoctorSchedule, getAllDoctors, removeDoctorSchedule } = useContext(AdminContext);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (doctors.length === 0) {
      getAllDoctors();
    }
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const selectedDoc = doctors.find((doc) => doc._id === selectedDoctor);
      const slotDate = computeSlotDate(selectedDate);
      const existing = selectedDoc?.availableSlots?.[slotDate] || [];
      setTimeSlots([...existing].sort((a, b) => parseTime(a) - parseTime(b)));
    } else {
      setTimeSlots([]);
    }
  }, [selectedDoctor, selectedDate, doctors]);

  const parseTime = (t) => {
    const [time, ampm] = t.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  const validateTime = (t) => {
    return /^(\d{1,2}):(\d{2}) (AM|PM)$/.test(t);
  };

  const computeSlotDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    return `${day}_${month}_${year}`;
  };

  const toFormatDate = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleAddTimeSlot = () => {
    if (!timeSlot || timeSlots.includes(timeSlot) || !validateTime(timeSlot)) {
      toast.warn("Invalid or duplicate time slot. Use format HH:MM AM/PM");
      return;
    }
    const newSlots = [...timeSlots, timeSlot].sort((a, b) => parseTime(a) - parseTime(b));
    setTimeSlots(newSlots);
    setTimeSlot("");
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
    setSelectedDate("");
    setTimeSlots([]);
  };

  const handleEdit = (slotDate) => {
    const dateStr = toFormatDate(slotDate);
    setSelectedDate(dateStr);
  };

  const handleDelete = async (slotDate) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      const date = toFormatDate(slotDate);
      await removeDoctorSchedule(selectedDoctor, date);
    }
  };

  const selectedDoc = doctors.find((doc) => doc._id === selectedDoctor);
  const schedules = selectedDoc?.availableSlots || {};
  const scheduleList = Object.keys(schedules)
    .map((key) => ({
      slotDate: key,
      date: new Date(key.split('_').reverse().join('-')),
      slots: schedules[key],
    }))
    .sort((a, b) => a.date - b.date);

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

      {selectedDoctor && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Existing Schedules for {selectedDoc.name}</h3>
          {scheduleList.length === 0 ? (
            <p>No schedules available.</p>
          ) : (
            scheduleList.map((schedule, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{schedule.date.toLocaleDateString()}</p>
                  <div>
                    <button
                      onClick={() => handleEdit(schedule.slotDate)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.slotDate)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <ul className="list-disc pl-5 mt-2">
                  {schedule.slots.map((slot, sIndex) => (
                    <li key={sIndex}>{slot}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;