"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const ApiError_1 = require("../../utils/ApiError");
const order_model_1 = require("../order/order.model");
const config_1 = __importDefault(require("./../../config/config"));
// Initialize SSLCommerzPayment
const sslcommerz = new sslcommerz_lts_1.default(config_1.default.STORE_ID, config_1.default.STORE_PASSWORD, false);
exports.paymentService = {
    async initiatePayment(orderId) {
        var _a, _b, _c;
        const order = await order_model_1.Order.findById(orderId).populate("userId");
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        if (order.paymentStatus !== "Pending") {
            throw new ApiError_1.ApiError(400, "Payment already processed");
        }
        const transactionId = `${orderId}_${Date.now()}`;
        const data = {
            total_amount: order.totalPrice,
            currency: "BDT",
            tran_id: transactionId,
            success_url: `${config_1.default.API_URL}/api/payments/success`,
            fail_url: `${config_1.default.API_URL}/api/payments/fail`,
            cancel_url: `${config_1.default.API_URL}/api/payments/cancel`,
            ipn_url: `${config_1.default.API_URL}/api/payments/ipn`,
            shipping_method: "NO",
            product_name: "Bicycle",
            product_category: "Physical Goods",
            product_profile: "general",
            cus_name: (_a = order.userId) === null || _a === void 0 ? void 0 : _a.name,
            cus_phone: ((_b = order.userId) === null || _b === void 0 ? void 0 : _b.phone) || "+8801700000000",
            cus_email: (_c = order.userId) === null || _c === void 0 ? void 0 : _c.email,
            cus_add1: order.shippingAddress.address,
            cus_city: order.shippingAddress.city,
            cus_postcode: order.shippingAddress.postalCode,
            cus_country: order.shippingAddress.country,
        };
        const response = await sslcommerz.init(data);
        return response;
    },
    async handlePaymentSuccess(payload) {
        const order = await order_model_1.Order.findOne({
            _id: payload.tran_id.split("_")[0],
        });
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        order.paymentStatus = "Completed";
        await order.save();
        return order;
    },
    async handlePaymentFailure(payload) {
        const order = await order_model_1.Order.findOne({
            _id: payload.tran_id.split("_")[0],
        });
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        order.paymentStatus = "Failed";
        await order.save();
        return order;
    },
};
