import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import path from "path";
import cors from "cors";

dotenv.config();
console.log("SERVER: JWT_SECRET =", process.env.JWT_SECRET);
const app = express();
connectDB();

app.use(
  cors({
    origin: "*", // Change to specific domain if needed
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies & authorization headers
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads"))); // Serve files
app.use("/", routes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
