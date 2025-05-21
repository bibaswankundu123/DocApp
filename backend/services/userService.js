import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwtProvider from "../config/jwtProvider.js";

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("User already exists with this email :", email);
    }

    password = await bcrypt.hash(password, 8);

    const user = await User.create({ firstName, lastName, email, password });
    console.log("User created successfully:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new error(error.message);
  }
};

 const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    // .populate("address");
    if (!user) {
      throw new Error("User not found with this id:", userId);
    }
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new error(error.message);
  }
};
 const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with this email:", email);
    }
    return user;
  } catch (error) {
    throw new error(error.message);
  }
};

 const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);

    if (!user) {
      throw new Error("user not found with id : ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

 const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createUser,
  getUserByEmail,
  findUserById,
  getUserProfileByToken,
  getAllUsers
};
