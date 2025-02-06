import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import sessionsRouter from "./sessions.routes.js";
import emailRouter from "./email.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/session", sessionsRouter);
router.use("/email", emailRouter);

export default router;
