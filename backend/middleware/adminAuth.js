
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminAuth = async (req, res, next) => {
  try {
    console.log("req",req)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Authentication required" });
    }

    // Verify admin token (different from user token)
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid or expired admin token" });
  }
};

export default adminAuth;