import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "./../models/appointmentModel.js";
import userModel from "./../models/userModel.js";
import contactModel from "../models/contactModel.js";


const getSpecialities = async (req, res) => {
  try {
    const specialities = await doctorModel.distinct("speciality");

    res.json({
      success: true,
      specialities,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// API FOR ADDING DOCTOR
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Give a strong password" });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error logging in",
    });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to update doctor details
const updateDoctor = async (req, res) => {
  try {
    const {
      docId,
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (!docId || !name || !email || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const updateData = {
      name,
      email,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
    };

    // Update password if provided
    if (password && password.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // Update image if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await doctorModel.findByIdAndUpdate(docId, updateData);
    res.json({
      success: true,
      message: "Doctor updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Check if doctor has active appointments
    const appointments = await appointmentModel.find({ docId, status: { $in: ["Unpaid", "Paid"] } });
    if (appointments.length > 0) {
      return res.json({
        success: false,
        message: "Cannot delete doctor with active appointments",
      });
    }

    await doctorModel.findByIdAndDelete(docId);
    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all appointment list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId, refund } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const updateData = {
      cancelled: true,
      isRefunded: refund,
      status: refund ? "Cancelled with Refund" : "Cancelled with Paid",
    };

    await appointmentModel.findByIdAndUpdate(appointmentId, updateData);

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: `Appointment cancelled ${refund ? "with refund" : "without refund"}`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to mark appointment as completed
const markAppointmentCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isPaid: true,
      status: "Paid",
    });

    res.json({ success: true, message: "Appointment marked as Paid" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    // Calculate total collection (Paid + Cancelled with Paid)
    const totalCollection = await appointmentModel.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Cancelled with Paid"] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Calculate month-wise report
    const monthWiseReport = await appointmentModel.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Cancelled with Paid"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: { $toDate: "$date" } },
            month: { $month: { $toDate: "$date" } },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 },
      },
    ]);

    // Calculate today's collection
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysCollection = await appointmentModel.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Cancelled with Paid"] },
          date: {
            $gte: today.getTime(),
            $lt: tomorrow.getTime(),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
      totalCollection: totalCollection.length > 0 ? totalCollection[0].total : 0,
      monthWiseReport: monthWiseReport.map(item => ({
        year: item._id.year,
        month: item._id.month,
        total: item.total,
      })),
      todaysCollection: todaysCollection.length > 0 ? todaysCollection[0].total : 0,
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// API to get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const messages = await contactModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getSpecialities,
  addDoctor,
  loginAdmin,
  allDoctors,
  updateDoctor,
  deleteDoctor,
  appointmentsAdmin,
  appointmentCancel,
  markAppointmentCompleted,
  adminDashboard,
  getAllContactMessages,
};