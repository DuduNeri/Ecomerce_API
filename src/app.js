import express from "express";
import userRoutes from "./routes/userRoutes.js";
import routerProducts from "./routes/productRoutes.js";

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(routerProducts)

export default app;
