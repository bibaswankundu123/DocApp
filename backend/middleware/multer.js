import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage Settings
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'kepro_ecom',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`
  }
});

// Export upload middleware
const upload = multer({ storage });
export default upload;
