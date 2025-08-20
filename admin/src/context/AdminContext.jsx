import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const addSpecialty = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-specialty",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getSpecialties();
      }
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSpecialties = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/specialties", {
        headers: { aToken },
      });
      if (data.success) {
        setSpecialties(data.specialties);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateSpecialty = async (id, formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-specialty",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteSpecialty = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/specialties/${id}`,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getSpecialties();
      }
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availablility",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateDoctor = async (docId, formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteDoctor = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-doctor",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    }
  };

  const cancelAppointment = async (appointmentId, refund) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId, refund },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const markAppointmentCompleted = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/mark-completed",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addDoctorSchedule = async (docId, date, timeSlots) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-schedule",
        { docId, date, timeSlots },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeDoctorSchedule = async (docId, date) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-schedule",
        { docId, date },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    updateDoctor,
    deleteDoctor,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    markAppointmentCompleted,
    dashData,
    getDashData,
    specialties,
    addSpecialty,
    getSpecialties,
    updateSpecialty,
    deleteSpecialty,
    addDoctorSchedule,
    removeDoctorSchedule
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;