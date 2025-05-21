import jwtProvider from "../config/jwtProvider.js";
import userService from "../services/userService.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Authentication required" });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await userService.findUserById(userId);
    
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
};

export default authenticate;