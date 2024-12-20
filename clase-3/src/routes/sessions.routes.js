import { Router } from "express";
import { userDao } from "../dao/mongo/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate("register"),  async (req, res) => {
  try {
  
      res.status(201).json({ status: "success", payload: "Usuario Registrado"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
  
})

router.post("/login", passport.authenticate("login") , async (req, res) => {
  try {
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: "user"
    }
    
    res.status(200).json({status: "success", payload: req.session.user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
})


router.get("/profile", async (req, res) => {

  try {

    if(!req.session.user) return res.status(404).json({ status: "error", msg: "Usuario no logueado"});

    if(req.session.user.role !== "user") return res.status(403).json({ status: "error", msg: "Usuario no autorizado"});

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

router.put("/restore-password", async (req, res) => {

  try {

    const {email, password} = req.body;
    const user = await userDao.getByEmail(email);

    await userDao.update(user._id, { password: createHash(password)})

    res.status(200).json({status: "success", payload: "Password actualizado"})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
  
})


export default router;