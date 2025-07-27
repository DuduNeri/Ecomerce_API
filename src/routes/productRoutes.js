import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, getAllProductsWithOwner, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isProductOwner } from "../middlewares/isProductOwner.js";
import { validateBody } from "../middlewares/validateSchema.js";
import { productSchema } from "../validations/productValidation.js";
import { upload } from "../middlewares/uploadsImage.js";

const routerProducts = Router();

routerProducts.post("/products",
    authMiddleware,
    upload.single("image"),
    validateBody(productSchema),
    createProduct);

routerProducts.get("/products",
    getAllProducts);

routerProducts.get("/products/:id",
    getProductById);

routerProducts.get("/products-with-owners",
    getAllProductsWithOwner);

routerProducts.put("/products/:id",
    authMiddleware, validateBody(productSchema),
    isProductOwner,
    updateProduct);

routerProducts.delete("/products/:id",
    authMiddleware,
    isProductOwner,
    deleteProduct);

export default routerProducts;