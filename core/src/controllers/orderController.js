import { createOrderService } from '../services/orderService.js';

export const createOrder = async (req, res) => {
  try {
    const { customer_id, order_date, details } = req.body;
    const newOrder = await createOrderService(customer_id, order_date, details);
    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    res.status(500).json({ error: "Order creation failed", details: error.message });
  }
};

