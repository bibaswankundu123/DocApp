import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // Importing the Cloudinary configuration

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "doc_app", // Folder name in Cloudinary
    format: async (req, file) => "png", // Set file format
    public_id: (req, file) => file.originalname, // File name
  },
});

const upload = multer({ storage });

export default upload;
