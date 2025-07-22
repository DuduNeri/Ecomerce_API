import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import routerProducts from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", routerProducts)

export default app;
