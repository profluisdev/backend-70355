import jwt from "jsonwebtoken";
import envsConfig from "../config/envs.config.js";

export const createToken = (user) => {
  const {_id, email} = user;

  const token = jwt.sign({_id, email}, envsConfig.JWT_SECRET, { expiresIn: "1h" })
  return token;
}

export const verifyToken = (token) => {
  try {

    return jwt.verify(token, envsConfig.JWT_SECRET);
    
  } catch (error) {
    console.log(error);
    return null;
  }
} 