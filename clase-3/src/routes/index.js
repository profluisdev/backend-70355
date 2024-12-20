import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import sessionsRouter from "./sessions.routes.js"

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/sessions", sessionsRouter);


export default router;
