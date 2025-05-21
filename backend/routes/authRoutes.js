import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";

router.post("/signup", authController.register);
router.post("/signin", authController.login);
router.get("/me", authenticate, authController.getCurrentUser);

export default router;
