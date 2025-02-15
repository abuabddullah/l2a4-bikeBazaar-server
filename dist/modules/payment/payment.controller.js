"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const config_1 = __importDefault(require("./../../config/config"));
const payment_service_1 = require("./payment.service");
exports.paymentController = {
    initiatePayment: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { orderId } = req.params;
        const result = await payment_service_1.paymentService.initiatePayment(orderId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }),
    handlePaymentSuccess: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const order = await payment_service_1.paymentService.handlePaymentSuccess(req.body);
        res.redirect(`${config_1.default.FRONTEND_URL}/payment/success`);
    }),
    handlePaymentFailure: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const order = await payment_service_1.paymentService.handlePaymentFailure(req.body);
        res.redirect(`${config_1.default.FRONTEND_URL}/payment/failed`);
    }),
    handlePaymentCancel: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        res.redirect(`${config_1.default.FRONTEND_URL}/payment/cancelled`);
    }),
    handleIPN: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        // Handle IPN (Instant Payment Notification)
        res.status(200).json({ received: true });
    }),
};
