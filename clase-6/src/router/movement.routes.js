import { Router } from "express";
import movementDao from "../dao/movement.dao.js";

const router = Router();

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movements = await movementDao.getAll({ userId: id });

    res.status(200).json({ status: "ok", payload: movements});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

export default router;