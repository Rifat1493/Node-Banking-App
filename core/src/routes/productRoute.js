import express from 'express';
import {createProduct } from '../controllers/productController.js';
// import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';




const router = express.Router();

// Login route
router.post('/create-product',createProduct);
export default router;