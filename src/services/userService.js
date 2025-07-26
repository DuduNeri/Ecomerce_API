import { User, Product } from "../models/index.js";
import bcrypt from "bcryptjs";

export async function hashedPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function isEmailEmUso(email, userId = null) {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;
  if (userId && user.id === userId) return false;
  return true;
}

export async function buscarUserComProdutos(username) {
  return User.findOne({
    where: { username },
    include: [{ model: Product, attributes: { exclude: ["userId"] } }],
  });
}

export async function compararSenha(password, hashed) {
  return bcrypt.compare(password, hashed);
}
