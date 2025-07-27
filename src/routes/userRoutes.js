import { Router } from "express";
import { createUser, getAllUsers, getUserById, deleteUserById, getAllProductsByUsername, updateUser, login } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/users",
    createUser);

router.post("/login",
    login);

router.get("/users",
    getAllUsers);

router.get("/users/:id",
    getUserById);

router.get("/users/:username/products",
    getAllProductsByUsername);

router.delete("/users/:id",
    authMiddleware,
    deleteUserById);

router.put("/users/:id",
    authMiddleware,
    updateUser);

export default router;
