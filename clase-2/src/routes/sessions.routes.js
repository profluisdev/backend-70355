import { Router } from "express";
import { userDao } from "../dao/mongo/user.dao.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
      const userData = req.body;
      const findUser = await userDao.getByEmail(userData.email);
      if(findUser) return res.status(400).json({ status: "error", msg: "El usuario con el email ya existe"});

      const user = await userDao.create(userData);

      res.status(201).json({ status: "success", payload: user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
  
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getByEmail(email);
    if(!user || user.password !== password) return res.status(401).json({status: "error", msg: "Email o password no válido"});

    // Guardamos la información del usuario en la session
    req.session.user = {
      email,
      role: "user"
    }

    res.status(200).json({status: "success", payload: user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
})


router.get("/profile", async (req, res) => {

  try {

    if(!req.session.user) return res.status(404).json({ status: "error", msg: "Usuario no logueado"});

    if(req.session.user.role !== "user") return res.status(401).json({ status: "error", msg: "Usuario no autorizado"});

    res.status(200).json({status: "success", payload: req.session.user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
  
})

router.get("/logout", async (req, res) => {

  try {

    req.session.destroy();

    res.status(200).json({status: "success", payload: "Session cerrada"})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
  
})


export default router;