import express from "express";
import * as orderController from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // ✅ certo


const OrderRouter = express.Router();

OrderRouter.post("/orders", authMiddleware, orderController.createOrder);
OrderRouter.get("/orders", authMiddleware, orderController.listOrders);
OrderRouter.get("/orders/:id", authMiddleware, orderController.getOrder);

export default OrderRouter;
