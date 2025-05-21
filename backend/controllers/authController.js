import userService from "../services/userService.js";
import jwtProvider from "../config/jwtProvider.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);

    // Return user data (excluding sensitive fields)
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    return res.status(200).send({
      jwt,
      user: userData,
      message: "register success"
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: 'user not found with email:', email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'password is not valid' });
    }

    const jwt = jwtProvider.generateToken(user._id);
    
    // Return user data (excluding sensitive fields)
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    return res.status(200).send({
      jwt,
      user: userData,
      message: "login success"
    });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.findUserById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    
    // Return user data (excluding sensitive fields)
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    return res.status(200).send({ user: userData });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default { register, login,getCurrentUser };