import express from "express";
import { adminLogin, adminLogout, refreshToken, changeAdminPassword  } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.post("/refresh-token", refreshToken);
router.post("/change-password", changeAdminPassword); 

export default router;

