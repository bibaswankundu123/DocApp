import Specialty from "../models/specialtyModel.js";
import cloudinary from "cloudinary";

export const addSpecialty = async (req, res) => {
  try {
    const { name } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.json({ success: false, message: "Specialty name is required" });
    }

    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    const specialty = new Specialty({
      name,
      image: imageUrl
    });

    await specialty.save();
    res.json({ success: true, message: "Specialty added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find({}).sort({ name: 1 });
    res.json({ success: true, specialties });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export const deleteSpecialty = async (req, res) => {
  try {
    const { id } = req.params;
    await Specialty.findByIdAndDelete(id);
    res.json({ success: true, message: "Specialty deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};