import { Product } from "../models/index.js";

export async function createProductService({ title, description, price, image, category, userId }) {
  return await Product.create({
    title,
    description,
    price,
    image,
    category,
    userId,
  });
}

export async function getAllProductsService() {
  return await Product.findAll();
}

export async function getProductByIdService(id) {
  return await Product.findByPk(id);
}

export async function updateProductService(id, updates) {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(updates);
}

export async function deleteProductService(id) {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
}

export async function getProductsByUserId(userId) {
  return await Product.findAll({ where: { userId } });
}
