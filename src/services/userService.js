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

export async function createUserService({ username, email, password }) {
  const hashed = await hashedPassword(password);
  return await User.create({ username, email, password: hashed });
}

export async function loginUserService(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return { error: "Usuário não encontrado", status: 404 };

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return { error: "Senha ou email incorretos", status: 401 };

  return { user };
}

export async function getAllUsersService() {
  return await User.findAll({ attributes: { exclude: ["password"] } });
}

export async function getUserByIdService(id) {
  return await User.findByPk(id, { attributes: { exclude: ["password"] } });
}

export async function getUserWithProductsService(username) {
  return await User.findOne({
    where: { username },
    include: [{ model: Product, attributes: { exclude: ["userId"] } }],
  });
}

export async function deleteUserByIdService(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
}

export async function updateUserService(id, { username, email, password }) {
  const user = await User.findByPk(id);
  if (!user) return { error: "Usuário não encontrado", status: 404 };

  if (!username || !email || !password) {
    return { error: "Todos os campos são obrigatórios", status: 400 };
  }

  const emailJaUsado = await isEmailEmUso(email, id);
  if (emailJaUsado) {
    return { error: "E-mail já está em uso por outro usuário", status: 409 };
  }

  user.username = username;
  user.email = email;
  user.password = await hashedPassword(password);
  await user.save();

  return { user };
}
