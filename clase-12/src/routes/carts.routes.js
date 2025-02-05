import { Router } from "express";
import { cartsControllers } from "../controllers/carts.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";



const router = Router();

router.post("/", cartsControllers.create);

router.get("/:cid", cartsControllers.getById);

router.post("/:cid/product/:pid",passportCall("jwt"), authorization("user"), cartsControllers.addProductToCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsControllers.deleteProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsControllers.updateQuantityProductInCart);

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsControllers.clearProductsToCart);

router.post("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);

export default router;
