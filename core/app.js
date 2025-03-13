import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/swagger.json"  assert { type: 'json' };;
import customerRoutes from "./src/routes/customerRoute.js";
import productRoutes from "./src/routes/productRoute.js";
import orderRoutes from "./src/routes/orderRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a base router for `/api`
const apiRouter = express.Router();

// Register sub-routes under `/api`
apiRouter.use("/auth", authRoutes);
apiRouter.use("/customer", customerRoutes);
apiRouter.use("/product", productRoutes);
apiRouter.use("/order", orderRoutes);
// Use `/api` as the base route
app.use("/api", apiRouter);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
