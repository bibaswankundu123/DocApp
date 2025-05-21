import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import connectDB from "./config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB(); 

    const email = "kepro@gmail.com";
    const password = "kepro@12345";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    console.log("✅ Admin created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.connection.close(); // Ensure DB connection is closed after operation
  }
};

createAdmin();
