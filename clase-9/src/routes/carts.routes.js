import { Router } from "express";
import { cartDao } from "../dao/mongo/cart.dao.js";
import { cartsControllers } from "../controllers/carts.controller.js";



const router = Router();

router.post("/", cartsControllers.create);

router.get("/:cid", cartsControllers.getById);

router.post("/:cid/product/:pid", cartsControllers.addProductToCart);

router.delete("/:cid/product/:pid", cartsControllers.deleteProductToCart);

router.put("/:cid/product/:pid", cartsControllers.updateQuantityProductInCart);

router.delete("/:cid", cartsControllers.clearProductsToCart);

export default router;
