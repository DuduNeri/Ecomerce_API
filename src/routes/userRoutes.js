import { Router } from "express";
import { createUser, getAllUsers, getUserById, deleteUserById, getAllProductsByUsername, updateUser, login } from "../controllers/userController.js";
import { verifyToken } from "../controllers/productController.js";

const router = Router();

router.post("/users", createUser);
router.post("/login", login);
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById);
router.get("/users/:username/products", verifyToken, getAllProductsByUsername);
router.delete("/users/:id", verifyToken, deleteUserById);
router.put("/users/:id", verifyToken, updateUser);



export default router;
