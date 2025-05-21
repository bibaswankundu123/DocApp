// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized, no token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized, invalid token" });
//   }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify Access Token
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export default authMiddleware;
