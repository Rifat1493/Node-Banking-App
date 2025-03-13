// Create User API


import { loginService, createUserService } from '../services/authService.js';

import dotenv from "dotenv";
dotenv.config();

const ADMIN_CREATION_TOKEN = process.env.ADMIN_CREATION_TOKEN;


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call the service
    const token = await loginService(email, password);

    // Return response
  //   res.status(200).json({ success: true, token });
  // } catch (error) {
  //   next(error);
  // }

  res.status(200).json({ message: "Login successful", token });
} catch (error) {
  res.status(500).json({ error: "Login failed", details: error.message });
}
};


export const createAdminController = async (req, res) => {
    const { email, password, role } = req.body;
  
    // Check if it's the first admin creation using admin token
    const adminToken = req.headers['x-admin-token'];
    const isInitialAdmin = adminToken === ADMIN_CREATION_TOKEN;
  
    if (!isInitialAdmin && !req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Ensure only admins or initial admin can create users
    if (!isInitialAdmin && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create users.' });
    }

    try {
      const newUser = await createUserService(email, password, role);
      res.status(201).json({ message: 'Admin created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
  };

  export const createUserController = async (req, res) => {
    const { email, password, role } = req.body;

    try {
    const newUser = await createUserService(email, password, role);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};