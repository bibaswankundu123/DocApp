import express from "express";
import { addDoctor, loginAdmin, allDoctors, updateDoctor,
  deleteDoctor, appointmentsAdmin, appointmentCancel, markAppointmentCompleted, adminDashboard , getAllContactMessages, getSpecialities, addDoctorSchedule, deleteDoctorSchedule } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";
import { addSpecialty, getSpecialties,deleteSpecialty } from "../controllers/specialtyController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/update-doctor", authAdmin, upload.single('image'), updateDoctor);
adminRouter.post("/delete-doctor", authAdmin, deleteDoctor);
adminRouter.post("/change-availablility", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.post("/mark-completed", authAdmin, markAppointmentCompleted);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.get("/contact-messages", authAdmin, getAllContactMessages); 
adminRouter.get("/specialities", authAdmin, getSpecialities);
adminRouter.post("/add-specialty", authAdmin, upload.single('image'), addSpecialty);
adminRouter.get("/specialties", getSpecialties);
adminRouter.delete("/specialties/:id", authAdmin, deleteSpecialty);
adminRouter.post("/add-schedule", authAdmin, addDoctorSchedule);
adminRouter.post("/delete-schedule", authAdmin, deleteDoctorSchedule);

export default adminRouter;