"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const order_service_1 = require("./order.service");
exports.orderController = {
    createOrder: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const order = await order_service_1.orderService.createOrder(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    }),
    getUserOrders: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const orders = await order_service_1.orderService.getUserOrders(userId);
        res.status(200).json({
            success: true,
            data: orders,
        });
    }),
    getOrderById: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const order = await order_service_1.orderService.getOrderById(req.params.id, page, limit);
        res.status(200).json({
            success: true,
            data: order,
        });
    }),
    updateOrderStatus: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { status } = req.body;
        const order = await order_service_1.orderService.updateOrderStatus(req.params.id, status);
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    }),
    cancelOrder: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const order = await order_service_1.orderService.cancelOrder(req.params.id, userId);
        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: order,
        });
    }),
    getAllOrders: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { category, name } = req.query;
        const filters = {};
        if (category)
            filters.category = category;
        if (name)
            filters.brand = name;
        const orders = await order_service_1.orderService.getAllOrders(page, limit, filters);
        res.status(200).json({
            success: true,
            data: orders,
        });
    }),
};
