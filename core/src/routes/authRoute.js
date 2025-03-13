import express from 'express';
import { loginController, createAdminController,createUserController } from '../controllers/authController.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Login route
router.post('/login',loginController);

//create-user route
router.post('/create-user', authenticateToken, authorizeAdmin,createUserController);

//create-user route
router.post('/create-admin',createAdminController);


export default router;
