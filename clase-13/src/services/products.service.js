import { productDao } from "../dao/mongo/product.dao.js";

// Capa de lógica de negocio
class ProductsServices {
  async getAll(filter, options) {
    return await productDao.getAll(filter, options);
  }

  async getById(id) {
    return await productDao.getById(id);
  }

  async deleteOne(id) {
    return await productDao.deleteOne(id);
  }

  async update(id, data) {
    return await productDao.update(id, data);
  }

  async create(data) {
    return await productDao.create(data);
  }
}

export const productsServices = new ProductsServices();
