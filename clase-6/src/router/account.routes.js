import { Router } from "express";
import accountDao from "../dao/account.dao.js";
import { verifyToken } from "../utils/jwt.js";
import userDao from "../dao/user.dao.js";

const router = Router();
router.put("/deposit", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    const queryAccount = alias ? { alias } : { number };
    const findAccount = await accountDao.getOne(queryAccount);
    if (!findAccount) res.status(404).json({ error: "Cuenta no encontrada" });

    const updateAccount = await accountDao.update(findAccount._id, { balance: findAccount.balance + amount });
    res.status(200).json({ status: "ok", payload: updateAccount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/extract", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    const queryAccount = alias ? { alias } : { number };
    const findAccount = await accountDao.getOne(queryAccount);
    if (!findAccount) res.status(404).json({ error: "Cuenta no encontrada" });

    const updateAccount = await accountDao.update(findAccount._id, { balance: findAccount.balance - amount });
    res.status(200).json({ status: "ok", payload: updateAccount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/transfer", async (req, res) => {
  try {
    const { amount, alias, number } = req.body;
    
    const token = verifyToken(req.cookies.token);
    const user = await userDao.getOne({ email: token.email });
    if (!user) return res.status(404).json({ error: "El usuario no existe" });
    const originalAccount = await accountDao.getOne({ userId: user._id})
    const destinationQuery = alias ? { alias } : { number };
    const destinationAccount = await accountDao.getOne(destinationQuery);

    const updateOriginAccount = await accountDao.update(originalAccount._id, {balance: originalAccount.balance - amount})
    const updateDestinationAccount = await accountDao.update(destinationAccount._id, {balance: destinationAccount.balance + amount})
  
    res.status(200).json({ status: "ok", payload: updateOriginAccount});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
