import { Product } from "../models/index.js";

export async function isProductOwner(req, res, next) {
  const { id } = req.params; 
  const userId = req.user.id; 

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (product.userId !== userId) {
      return res.status(403).json({ message: "Você não tem permissão para alterar esse produto" });
    }

    req.product = product;

    next();
  } catch (error) {
    console.error("Erro no middleware isProductOwner:", error);
    res.status(500).json({ message: "Erro ao verificar propriedade do produto" });
  }
}
