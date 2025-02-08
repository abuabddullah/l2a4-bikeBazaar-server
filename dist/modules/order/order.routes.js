"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_1 = require("../../middlewares/auth");
const isAdmin_1 = require("../../middlewares/isAdmin");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(order_validation_1.createOrderSchema), order_controller_1.orderController.createOrder);
router.get('/my-orders', (0, auth_1.auth)(), order_controller_1.orderController.getUserOrders);
router.get('/:id', (0, auth_1.auth)(), order_controller_1.orderController.getOrderById);
router.patch('/:id/cancel', (0, auth_1.auth)(), order_controller_1.orderController.cancelOrder);
router.patch('/:id/status', (0, auth_1.auth)(), isAdmin_1.isAdmin, (0, validateRequest_1.validateRequest)(order_validation_1.updateOrderStatusSchema), order_controller_1.orderController.updateOrderStatus);
exports.orderRoutes = router;
