"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = require("../../utils/ApiError");
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
exports.orderService = {
    async createOrder(userId, orderData) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const { items } = orderData;
            let totalPrice = 0;
            // Verify stock and calculate total price
            for (const item of items) {
                const product = await product_model_1.Product.findById(item.productId).session(session);
                if (!product) {
                    throw new ApiError_1.ApiError(404, `Product not found: ${item.productId}`);
                }
                if (product.stock < item.quantity) {
                    throw new ApiError_1.ApiError(400, `Insufficient stock for product: ${product.name}`);
                }
                // Update stock
                await product_model_1.Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } }, { session });
                item.price = product.price;
                totalPrice += product.price * item.quantity;
            }
            const order = await order_model_1.Order.create([
                {
                    ...orderData,
                    userId,
                    totalPrice,
                    status: "pending",
                    paymentStatus: "pending",
                },
            ], { session });
            await session.commitTransaction();
            return order[0];
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    },
    async getUserOrders(userId) {
        return await order_model_1.Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 });
    },
    async getOrderById(orderId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const order = await order_model_1.Order.findById(orderId)
            .skip(skip)
            .limit(limit)
            .populate("items.productId");
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        const total = await order_model_1.Order.countDocuments({ _id: orderId });
        return {
            order,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
    async updateOrderStatus(orderId, status) {
        const order = await order_model_1.Order.findById(orderId);
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        if (order.status === "cancelled") {
            throw new ApiError_1.ApiError(400, "Cannot update cancelled order");
        }
        order.status = status;
        await order.save();
        return order;
    },
    async cancelOrder(orderId, userId) {
        const order = await order_model_1.Order.findOne({ _id: orderId, userId });
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        if (order.status !== "pending") {
            throw new ApiError_1.ApiError(400, "Can only cancel pending orders");
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Restore stock
            for (const item of order.items) {
                await product_model_1.Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } }, { session });
            }
            order.status = "cancelled";
            await order.save({ session });
            await session.commitTransaction();
            return order;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    },
    async getAllOrders(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const orders = await order_model_1.Order.find(filters)
            .skip(skip)
            .limit(limit)
            .populate("items.productId")
            .populate("userId")
            .sort({ createdAt: -1 });
        const total = await order_model_1.Order.countDocuments(filters);
        return {
            orders,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
};
