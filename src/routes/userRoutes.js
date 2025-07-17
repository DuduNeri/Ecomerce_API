import { Router } from "express";
import { createUser, getAllUsers, getUserById, deleteUserById, updateUser, login } from "../controllers/userController.js";

const router = Router();

router.post("/users", createUser);
router.post("/login", login);
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUserById);
router.put("/users/:id", updateUser);



export default router;
