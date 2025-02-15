"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
exports.userController = {
    register: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const result = await user_service_1.userService.register(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }),
    login: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { email, password } = req.body;
        const result = await user_service_1.userService.login(email, password);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    }),
    getProfile: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const user = await user_service_1.userService.getProfile(userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    }),
    updateProfile: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const result = await user_service_1.userService.updateProfile(userId, req.body);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: result,
        });
    }),
    changePassword: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { currentPassword, newPassword } = req.body;
        const result = await user_service_1.userService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({
            success: true,
            message: (result === null || result === void 0 ? void 0 : result.message) || "Password changed successfully",
        });
    }),
    getAllUsers: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const users = await user_service_1.userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    }),
    changeUserStatus: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { targetUserId, status } = req.body;
        const result = await user_service_1.userService.changeUserStatus(targetUserId, status);
        res.status(200).json({
            success: true,
            message: "User status changed successfully",
            data: result,
        });
    }),
};
