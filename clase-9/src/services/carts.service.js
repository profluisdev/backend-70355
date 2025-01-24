import { cartDao } from "../dao/mongo/cart.dao.js";

class CartsServices {
  async create() {
    return await cartDao.create();
  }

  async getById(id) {
    return await cartDao.getById(id);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);

    const productInCart = cart.products.find((element) => element.product == pid);
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    return await cartDao.update(cid, { products: cart.products });
  }

  async deleteProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    cart.products = cart.products.filter((element) => element.product != pid);

    return await cartDao.update(cid, { products: cart.products });
  }

  async updateQuantityProductInCart(cid, pid, quantity) {
    const cart = await cartDao.findById(cid);
    const product = cart.products.find((element) => element.product == pid);
    product.quantity = quantity;

    return await cartDao.update(cid, { product: cart.products });
  }

  async clearProductsToCart(cid) {
    return await cartDao.update(cid, { products: [] });
  }
}

export const cartsServices = new CartsServices();
