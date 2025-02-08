"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
const catchAsync_1 = require("../../utils/catchAsync");
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
        res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
    }),
    handlePaymentFailure: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const order = await payment_service_1.paymentService.handlePaymentFailure(req.body);
        res.redirect(`${process.env.FRONTEND_URL}/payment/failed`);
    }),
    handlePaymentCancel: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        res.redirect(`${process.env.FRONTEND_URL}/payment/cancelled`);
    }),
    handleIPN: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        // Handle IPN (Instant Payment Notification)
        res.status(200).json({ received: true });
    }),
};
