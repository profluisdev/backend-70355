import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const {_id, email} = user;

  const token = jwt.sign({_id, email}, "codigoSecreto", { expiresIn: "1hs" })
  return token;
}

export const verifyToken = (token) => {
  try {

    return jwt.verify(token, "codigoSecreto");
    
  } catch (error) {
    console.log(error);
    return null;
  }
} 