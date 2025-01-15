import { Router } from "express";
import userDao from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import accountDao from "../dao/account.dao.js";
import { createToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    const user = await userDao.getOne({ email });
    if (user) return res.status(401).json({ error: "El usuario con el mail ya existe" });

    // Creamos la cuenta del usuario
    const newAccount = {
      number: Math.floor(Math.random() * 1000000000),
      alias: `${name.toLowerCase()}${lastName.toLowerCase()}.${Math.floor(Math.random() * 1000)}`,
      balance: 0,
    };

    const account = await accountDao.create(newAccount);

    const newUser = {
      name,
      lastName,
      email,
      password: createHash(password),
      account: account._id,
    };

    const createUser = await userDao.create(newUser);

    await accountDao.update(account._id, { userId: createUser._id });

    res.status(201).json({ status: "ok", payload: createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getOne({ email });
    if (!user || !isValidPassword(password, user))
      return res.status(401).json({ error: "Email o contraseña no válidos" });

    const token = createToken(user);
    res.cookie("token", token);

    res.status(200).json({ status: "ok", payload: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
