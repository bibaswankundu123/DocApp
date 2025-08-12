import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Specialty = mongoose.models.specialty || mongoose.model('specialty', specialtySchema);
export default Specialty;