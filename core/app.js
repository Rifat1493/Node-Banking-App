import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/swagger.json"  assert { type: 'json' };;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/", authRoutes);

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
