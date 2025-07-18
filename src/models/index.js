import User from "./User.js";
import Product from "./Product.js";

User.associate?.({ Product });
Product.associate?.({ User });

export { User, Product };