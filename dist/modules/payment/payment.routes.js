"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post('/initiate/:orderId', (0, auth_1.auth)(), payment_controller_1.paymentController.initiatePayment);
router.post('/success', payment_controller_1.paymentController.handlePaymentSuccess);
router.post('/fail', payment_controller_1.paymentController.handlePaymentFailure);
router.post('/cancel', payment_controller_1.paymentController.handlePaymentCancel);
router.post('/ipn', payment_controller_1.paymentController.handleIPN);
exports.paymentRoutes = router;
