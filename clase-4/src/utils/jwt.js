import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const {_id, email} = user;

  const token = jwt.sign({_id, email}, "codigoSecreto", { expiresIn: "1m" })
  return token;
}

export const verifyToken = (token) => {
  try {

    return jwt.verify(token, "codigoSecreto");
    
  } catch (error) {
    return null;
  }
} 