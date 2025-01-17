import { Router } from "express";
import accountDao from "../dao/account.dao.js";
import { verifyToken } from "../utils/jwt.js";
import userDao from "../dao/user.dao.js";
import movementDao from "../dao/movement.dao.js";

const router = Router();
router.put("/deposit", async (req, res) => {
  try {
    const { amount, alias, number, description } = req.body;
    const queryAccount = alias ? { alias } : { number };
    const findAccount = await accountDao.getOne(queryAccount);
    if (!findAccount) res.status(404).json({ error: "Cuenta no encontrada" });

    const user = await userDao.getOne({ _id: findAccount.userId });
    if (!user) return res.status(404).json({ error: "El usuario no existe" });

    const updateAccount = await accountDao.update(findAccount._id, { balance: findAccount.balance + amount });
    const newMovement = {
      description,
      amount,
      type: "Depósito",
      originAccountId: findAccount._id,
      userId: user._id,
    };

    await movementDao.create(newMovement);
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

    if (findAccount.balance < amount) return res.status(401).json({ error: "Saldo insuficiente" });

    const updateAccount = await accountDao.update(findAccount._id, { balance: findAccount.balance - amount });
    const user = await userDao.getOne({ _id: findAccount.userId });
    if (!user) return res.status(404).json({ error: "El usuario no existe" });
    const newMovement = {
      amount,
      type: "Extracción",
      originAccountId: findAccount._id,
      userId: user._id,
    };

    await movementDao.create(newMovement);
    res.status(200).json({ status: "ok", payload: updateAccount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/transfer", async (req, res) => {
  try {
    const { amount, alias, number, description } = req.body;

    const token = verifyToken(req.cookies.token);
    const user = await userDao.getOne({ email: token.email });
    if (!user) return res.status(404).json({ error: "El usuario no existe" });
    const originalAccount = await accountDao.getOne({ userId: user._id });
    const destinationQuery = alias ? { alias } : { number };
    const destinationAccount = await accountDao.getOne(destinationQuery);

    // Validamos si el saldo es suficiente
    if (originalAccount.balance < amount) return res.status(401).json({ error: "Saldo insuficiente" });

    const updateOriginAccount = await accountDao.update(originalAccount._id, {
      balance: originalAccount.balance - amount,
    });
    const updateDestinationAccount = await accountDao.update(destinationAccount._id, {
      balance: destinationAccount.balance + amount,
    });

    
    const originMovement = {
      amount,
      description,
      type: "Transferencia",
      originAccountId: originalAccount._id,
      userId: originalAccount.userId
    }

    await movementDao.create(originMovement);

    const destinationMovement = {
      amount,
      description,
      type: "Transferencia",
      originAccountId: destinationAccount._id,
      userId: destinationAccount.userId
    }

    await movementDao.create(destinationMovement);

    res.status(200).json({ status: "ok", payload: updateOriginAccount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
