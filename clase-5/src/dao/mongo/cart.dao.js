import { cartModel } from "./models/cart.model.js";

class CartDao {
  // Método para obtener todos los carritos
  async getAll() {
    const carts = await cartModel.find();
    return carts;
  }

  // Método para obtener un carrito por su ID
  async getById(id) {
    const cart = await cartModel.findById(id).populate("products.product");
    return cart;
  }

  // Método para crear un nuevo carrito
  async create() {
    const cart = await cartModel.create({});
    return cart;
  }

  // Método para actualizar un carrito por su ID
  async update(id, data) {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
    return cartUpdate;
  }

  // Método para eliminar un carrito por su ID
  async deleteOne(id) {
    const cart = await cartModel.deleteOne({ _id: id });
    return cart;
  }

  // Método para agregar un producto a un carrito
  async addProductToCart(cid, pid) {
    const cart = await cartModel.findById(cid);

    const productInCart = cart.products.find((element) => element.product == pid);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save(); // Guardamos los cambios realizado en la base de datos de mongo
    return cart;
  }

  // Método para eliminar un producto de un carrito
  async deleteProductToCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    cart.products = cart.products.filter((element) => element.product != pid);
    await cart.save();

    return cart;
  }

  // Método para actualizar la cantidad de un producto en un carrito
  async updateQuantityProductInCart(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    const product = cart.products.find((element) => element.product == pid);
    product.quantity = quantity;

    await cart.save();
    return cart;
  }

  // Método para eliminar todos los productos de un carrito
  async clearProductsToCart(cid) {
    const cart = await cartModel.findById(cid);
    cart.products = [];

    await cart.save();
    return cart;
  }
}

export const cartDao = new CartDao();

