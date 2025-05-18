import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/swagger.json" assert { type: 'json' };
import customerRoutes from "./src/routes/customerRoute.js";
import productRoutes from "./src/routes/productRoute.js";
import orderRoutes from "./src/routes/orderRoute.js";
import client from "prom-client";

dotenv.config();

const app = express();

// Prometheus Metrics Setup
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
register.registerMetric(httpRequestCounter);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request Monitoring Middleware
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});

// Base API Router
const apiRouter = express.Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/customer", customerRoutes);
apiRouter.use("/product", productRoutes);
apiRouter.use("/order", orderRoutes);
app.use("/api", apiRouter);

// Swagger Docs
swaggerDocument.host = process.env.HOST || "localhost:3000";
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Prometheus Metrics Endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',() => {
  console.log(`🚀 Server running on port ${PORT}`);
});

