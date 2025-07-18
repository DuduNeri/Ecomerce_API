import { Router } from "express";
import { createUser, getAllUsers, getUserById, deleteUserById, updateUser, login } from "../controllers/userController.js";
import { verifyToken } from "../controllers/productController.js";

const router = Router();

router.post("/users", createUser);
router.post("/login", login);
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById);
router.delete("/users/:id", verifyToken, deleteUserById);
router.put("/users/:id", verifyToken, updateUser);



export default router;
