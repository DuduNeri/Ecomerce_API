import { Product, User } from "../models/index.js";

import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

export async function createProduct(req, res) {
    const { title, description, price, image, category } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.create({
            title,
            description,
            price,
            image,
            category,
            userId
        });

        res.status(201).json({ message: "Produto criado com sucesso!", product });
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ message: "Erro ao criar produto" });
    }
}

export async function getAllProducts(req, res) {
    try {
        const getProducts = await Product.findAll();
        res.status(200).json(getProducts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
}

export async function getProductById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID do produto não informado" });
    }
    try {
        const getProduct = await Product.findByPk(id);
        if (!getProduct) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        res.status(200).json(getProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar produto" });
    }
}

export async function getAllProductsWithOwner(req, res) {
  try {
    const products = await Product.findAll({
      include: [{
        model: User,
        as: "user", 
        attributes: ["username"]
      }],
    });

    const resultado = products.map(prod => ({
      id: prod.id,
      nome: prod.name,
      preco: prod.price,
      dono: prod.user?.username || "Desconhecido", 
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.log("Erro detalhado:", error);
    res.status(500).json({ message: "Erro ao buscar produtos com donos" });
  }
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const { title, description, price, image, category } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        if (!title || !description || !price || !image || !category) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        product.title = title;
        product.description = description;
        product.price = price;
        product.image = image;
        product.category = category;
        await product.save();
        res.status(200).json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao atualizar produto" });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        const deleteProducts = await Product.findByPk(id);
        if (!deleteProducts) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
        await deleteProducts.destroy();
        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao deletar produto" });
    }
}