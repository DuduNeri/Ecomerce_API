import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, "sua_chave_secreta_aqui", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user; 
        next();
    });
}

export async function createProduct(req, res) {
    const { title, description, price, image, category } = req.body;
    if (!title || !description || !price || !image || !category) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    try {
        const isertProduct = await Product.create({
            title,
            description,
            price,
            image,
            category,
        });
        res.status(201).json(isertProduct);
    } catch (error) {
        console.log(error)
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