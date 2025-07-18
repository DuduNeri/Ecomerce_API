import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyToken } from "../controllers/productController.js";

const routerProducts = Router();

routerProducts.post("/products", verifyToken, createProduct);
routerProducts.get("/products", getAllProducts);
routerProducts.get("/products/:id", getProductById);
routerProducts.put("/products/:id", verifyToken, updateProduct);
routerProducts.delete("/products/:id", verifyToken, deleteProduct);


export default routerProducts;