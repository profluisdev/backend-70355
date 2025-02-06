import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", productsController.getAll);

router.get("/:pid",productsController.getById );

router.delete("/:pid", passportCall("jwt"), authorization("admin"), productsController.deleteOne);

router.put("/:pid", passportCall("jwt"), authorization("admin"), productsController.update);

router.post("/", passportCall("jwt"), authorization("admin"), checkProductData, productsController.create);
export default router;
