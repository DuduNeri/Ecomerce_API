import { Product, User } from "../models/index.js";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "../services/productService.js";

export async function createProduct(req, res) {
  try {
    const { title, description, price, image, category } = req.body;
    const userId = req.user.id;

    const product = await createProductService({ title, description, price, image, category, userId });
    res.status(201).json({ message: "Produto criado com sucesso!", product });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
}

export async function getAllProductsWithOwner(req, res) {
  try {
    const products = await Product.findAll({
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });

    const resultado = products.map((prod) => ({
      id: prod.id,
      nome: prod.title,
      preco: prod.price,
      dono: prod.user?.username || "Desconhecido",
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos com donos" });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  try {
    const updates = req.body;
    const updated = await updateProductService(id, updates);
    if (!updated) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json({ message: "Produto atualizado com sucesso", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deleted = await deleteProductService(id);
    if (!deleted) return res.status(404).json({ message: "Produto não encontrado" });
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto" });
  }
}

export async function isProductOwner(req, res, next) {
  const { id } = req.params;
  try {
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    if (product.userId !== req.user.id) {
      return res.status(403).json({ message: "Você não tem permissão para alterar esse produto" });
    }
    req.product = product;
    next();
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar propriedade do produto" });
  }
}
