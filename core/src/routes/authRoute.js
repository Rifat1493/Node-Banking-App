import express from 'express';
import { loginController, createUserController } from '../controllers/authController.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Login route
router.post('/login', authenticateToken,loginController);

//create-user route
router.post('/create-user',authenticateToken, authorizeAdmin,createUserController);


export default router;
