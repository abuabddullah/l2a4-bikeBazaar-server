"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config/config"));
const database_1 = require("./config/database");
const error_middleware_1 = require("./middlewares/error.middleware");
const newsletter_router_1 = require("./modules/newsletter/newsletter.router");
const order_routes_1 = require("./modules/order/order.routes");
const payment_routes_1 = require("./modules/payment/payment.routes");
const product_routes_1 = require("./modules/product/product.routes");
const review_routes_1 = require("./modules/review/review.routes");
const user_routes_1 = require("./modules/user/user.routes");
const app = (0, express_1.default)();
const port = config_1.default.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Routes
app.use("/api/users", user_routes_1.userRoutes);
app.use("/api/products", product_routes_1.productRoutes);
app.use("/api/orders", order_routes_1.orderRoutes);
app.use("/api/payments", payment_routes_1.paymentRoutes);
app.use("/api/newsletter", newsletter_router_1.newsletterRoutes);
app.use("/api/reviews", review_routes_1.reviewRoutes);
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
app.use(error_middleware_1.errorHandler);
// Start server
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
