import { createProducts} from '../services/productService.js';

export const createProduct = async (req, res) => {
  try {
    const { productName } = req.body;

    const newUser = await createProducts(productName);
  res.status(200).json({ message: "Customer created successfully", newUser });
} catch (error) {
  res.status(500).json({ error: "Customer creation failed", details: error.message });
}
};