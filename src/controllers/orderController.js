import * as orderService from "../services/orderService.js";

export async function createOrder(req, res) {
  try {
    const userId = req.user.id; 
    const items = req.body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Itens do pedido são obrigatórios" });
    }

    const order = await orderService.createOrder(userId, items);
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar pedido" });
  }
}

export async function listOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await orderService.getOrdersByUser(userId);
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar pedidos" });
  }
}

export async function getOrder(req, res) {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await orderService.getOrderById(userId, orderId);
    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar pedido" });
  }
}
