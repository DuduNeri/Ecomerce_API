import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import sequelize from "../config/db.js";

export async function createOrder(userId, items) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const result = await sequelize.transaction(async (t) => {
    const order = await Order.create(
      { userId, total },
      { transaction: t }
    );

    const orderItemsData = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItemsData, { transaction: t });

    return order;
  });

  return result;
}

export async function getOrdersByUser(userId) {
  return Order.findAll({
    where: { userId },
    include: [
      { model: OrderItem, as: "items" }
    ],
  });
}

export async function getOrderById(userId, orderId) {
  return Order.findOne({
    where: { id: orderId, userId },
    include: [
      { model: OrderItem, as: "items" }
    ],
  });
}
