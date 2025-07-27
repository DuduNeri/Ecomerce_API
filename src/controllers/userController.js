import { generateToken } from "../utils/generateTokens.js";
import {
  createUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
  getUserWithProductsService,
  deleteUserByIdService,
  updateUserService,
} from "../services/userService.js";

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    const user = await createUserService({ username, email, password });
    const { password: _, ...userWithoutPassword } = user.dataValues;
    res.status(201).json({ message: "Usuário criado com sucesso!", user: userWithoutPassword });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const { error, status, user } = await loginUserService(email, password);
    if (error) return res.status(status).json({ message: error });

    const token = await generateToken({ id: user.id, email: user.email });
    return res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(user);
  } catch (error) {
    console.log("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ message: "Erro ao buscar usuário por ID" });
  }
}

export async function getAllProductsByUsername(req, res) {
  const { username } = req.params;
  try {
    const user = await getUserWithProductsService(username);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json({
      user: user.username,
      produtos: user.Products,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos do usuário:", error);
    res.status(500).json({ message: "Erro ao buscar produtos do usuário" });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const deleted = await deleteUserByIdService(id);
    if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.log("Erro ao deletar usuário por ID:", error);
    res.status(500).json({ message: "Erro ao deletar usuário por ID" });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const { error, status } = await updateUserService(id, { username, email, password });
    if (error) return res.status(status).json({ message: error });

    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar usuário por ID:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário por ID" });
  }
}
