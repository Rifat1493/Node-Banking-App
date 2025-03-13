import express from 'express';
import {createCustomer } from '../controllers/customerController.js';
// import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';




const router = express.Router();

// Login route
router.post('/create-customer',createCustomer);
export default router;