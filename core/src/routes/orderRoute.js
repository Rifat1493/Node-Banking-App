import express from 'express';
import {createOrder } from '../controllers/orderController.js';
import prisma from "../configs/prisma.js";
// import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';




const router = express.Router();

// Login route
router.post('/create-order',createOrder);
router.get('/show-orders', async (req, res) => {
    try {
    const customers = await prisma.customer.findMany({
        select: {
        customer_id: true,
        customer_name: true,
        orders: {
            select: {
            orderDetails: {
                select: {
                quantity: true,
                unit_price: true,
                },
            },
            },
        },
        },
    });

    // Compute total spending per customer
    const customerSpending = customers.map((customer) => {
        const totalSpent = customer.orders.reduce((total, order) => {
        return (
            total +
            order.orderDetails.reduce((sum, detail) => sum + detail.quantity * detail.unit_price, 0)
        );
        }, 0);

        return {
        customer_id: customer.customer_id,
        customer_name: customer.customer_name,
        total_spent: totalSpent,
        };
    });

    // Sort and get top 5 customers
    const top5Customers = customerSpending
        .sort((a, b) => b.total_spent - a.total_spent)
        .slice(0, 5);

    res.status(200).json(top5Customers);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top customers', details: error.message });
    }
});
  

export default router;