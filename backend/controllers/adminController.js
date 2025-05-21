import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

// ✅ Admin Login with Refresh Token
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate Access Token (Short-lived)
    const accessToken = jwt.sign({ id: admin._id,role: "ADMIN" }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // ✅ Generate Refresh Token (Long-lived)
    const refreshToken = jwt.sign({ id: admin._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // ✅ Store Refresh Token in Admin DB
    admin.refreshToken = refreshToken;
    await admin.save();

    res.status(200).json({ 
      message: "Login successful", 
      accessToken, 
      refreshToken 
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};


export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(403).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // ✅ Generate a new Access Token
    const newAccessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: "Token refresh failed", error });
  }
};


export const adminLogout = async (req, res) => {
  try {
    const { token } = req.body; // Get refresh token from request

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const admin = await Admin.findOne({ refreshToken: token });
    if (!admin) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // ✅ Remove refresh token from the database
    admin.refreshToken = "";
await admin.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};





export const changeAdminPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 🔑 Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // 🔐 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;

    // ❌ Invalidate old refresh token
    admin.refreshToken = null;
    await admin.save();

    // 🔄 Generate new tokens
    const newAccessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign({ id: admin._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // ✅ Store new refresh token in DB
    admin.refreshToken = newRefreshToken;
    await admin.save();

    res.status(200).json({ 
      message: "Password updated successfully. Please log in again.", 
      accessToken: newAccessToken, 
      refreshToken: newRefreshToken 
    });

  } catch (error) {
    res.status(500).json({ message: "Password update failed", error });
  }
};


