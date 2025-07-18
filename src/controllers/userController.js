import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";


export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Sennha ou email incorretos" });
    }

    const token = await generateToken({ id: user.id, email: user.email });
    return res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const get = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(get);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const userByid = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!userByid) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(userByid);
  } catch (error) {
    console.log("Erro ao buscar usuário por ID:", error);
    res.status(500).json({ message: "Erro ao buscar usuário por ID" });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByPk(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    await deleteUser.destroy();
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.log("Erro ao deletar usuário por ID:", error)
    res.status(500).json({ message: "Erro ao deletar usuário por ID" });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    const emailEmUso = await User.findOne({ where: { email } });
    if (emailEmUso && emailEmUso.id !== user.id) {
      return res.status(409).json({ message: "E-mail já está em uso por outro usuário" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar usuário por ID:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário por ID" });
  }
}

