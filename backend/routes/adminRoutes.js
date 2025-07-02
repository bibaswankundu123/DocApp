import express from "express";
import { addDoctor, loginAdmin, allDoctors, updateDoctor,
  deleteDoctor, appointmentsAdmin, appointmentCancel, markAppointmentCompleted, adminDashboard , getAllContactMessages,} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

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

export default adminRouter;