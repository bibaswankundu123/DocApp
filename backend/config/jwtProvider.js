import dotenv from "dotenv";
dotenv.config();

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;
console.log("JWT_SECRET:", SECRET_KEY); 

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '48h' });
};

const getUserIdFromToken = (token) => {
    return jwt.verify(token, SECRET_KEY).userId;
};

export default { generateToken, getUserIdFromToken };
