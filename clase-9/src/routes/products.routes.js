import { Router } from "express";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { productsServices } from "../services/products.service.js";
import { productsController } from "../controllers/products.controller.js";

const router = Router();

router.get("/", productsController.getAll);

router.get("/:pid",productsController.getById );

router.delete("/:pid", productsController.deleteOne);

router.put("/:pid", productsController.update);

router.post("/", checkProductData, productsController.create);
export default router;
