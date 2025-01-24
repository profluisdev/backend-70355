import { cartsServices } from "../services/carts.service.js";

class CartsControllers{

  async create(req, res) {
    try {
        const cart = await cartsServices.create();

        res.status(201).json({ status: "success", cart });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
  }



  async getById(req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsServices.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
    
        res.status(200).json({ status: "success", cart });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
  }
  async addProductToCart(req, res) {
    try {
        const { cid, pid } = req.params;
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        const cart = await cartsServices.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
        const cartUpdate = await cartsServices.addProductToCart(cid, pid);
    
        res.status(200).json({ status: "success", payload: cartUpdate });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
  }

  async deleteProductToCart(req, res) {
     try {
        const { cid, pid } = req.params;
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        const cart = await cartsServices.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
        const cartUpdate = await cartsServices.deleteProductToCart(cid, pid);
    
        res.status(200).json({ status: "success", payload: cartUpdate });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
  }

  async updateQuantityProductInCart(req, res) {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
    
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        const cart = await cartsServices.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
    
        const cartUpdate = await cartsServices.updateQuantityProductInCart(cid, pid, Number(quantity));
    
        res.status(200).json({ status: "success", payload: cartUpdate });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
  }

  async clearProductsToCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartsServices.clearProductsToCart(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
      res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

}

export const cartsControllers = new CartsControllers();