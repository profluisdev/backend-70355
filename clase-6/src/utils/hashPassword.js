import bcrypt from "bcrypt";

// Función que hashea la contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Función que compara contraseña
export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
}   