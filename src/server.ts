import cookieParser from "cookie-parser";
import cors from "cors";

import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import config from "./config/config";
import { connectDB } from "./config/database";
import { errorHandler } from "./middlewares/error.middleware";
import { newsletterRoutes } from "./modules/newsletter/newsletter.router";
import { orderRoutes } from "./modules/order/order.routes";
import { paymentRoutes } from "./modules/payment/payment.routes";
import { productRoutes } from "./modules/product/product.routes";
import { reviewRoutes } from "./modules/review/review.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/reviews", reviewRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("BikeBazaar API");
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
