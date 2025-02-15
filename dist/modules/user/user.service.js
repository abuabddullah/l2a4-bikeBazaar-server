"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const jwt_1 = require("../../utils/jwt");
const user_model_1 = require("./user.model");
exports.userService = {
    async register(userData) {
        const existingUser = await user_model_1.User.findOne({ email: userData.email });
        if (existingUser) {
            throw new ApiError_1.ApiError(400, "Email already exists");
        }
        const user = await user_model_1.User.create(userData);
        // Generate JWT token
        const jwtPayload = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        const token = (0, jwt_1.generateToken)(jwtPayload);
        return { user, token };
    },
    async login(email, password) {
        const user = await user_model_1.User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        // Generate JWT token
        const jwtPayload = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        const token = (0, jwt_1.generateToken)(jwtPayload);
        return { user, token };
    },
    async getProfile(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        return user;
    },
    async updateProfile(userId, updateData) {
        const user = await user_model_1.User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        return user;
    },
    async changePassword(userId, currentPassword, newPassword) {
        const user = await user_model_1.User.findById(userId).select("+password");
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        if (!(await user.comparePassword(currentPassword))) {
            throw new ApiError_1.ApiError(401, "Current password is incorrect");
        }
        user.password = newPassword;
        await user.save();
        return { message: "Password updated successfully" };
    },
    async getAllUsers() {
        const users = await user_model_1.User.find();
        return users;
    },
    async changeUserStatus(targetUserId, status) {
        const updateField = status === "active" || status === "inactive"
            ? { status }
            : { role: status };
        const user = await user_model_1.User.findByIdAndUpdate(targetUserId, { $set: updateField }, { new: true });
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        return user;
    },
};
