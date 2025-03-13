import { createCustomers} from '../services/customerService.js';

export const createCustomer = async (req, res) => {
  try {
    const { customerName } = req.body;

    const newUser = await createCustomers(customerName);
  res.status(200).json({ message: "Customer created successfully", newUser });
} catch (error) {
  res.status(500).json({ error: "Customer creation failed", details: error.message });
}
};