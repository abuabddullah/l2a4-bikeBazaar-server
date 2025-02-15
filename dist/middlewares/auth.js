"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const ApiError_1 = require("../utils/ApiError");
const config_1 = __importDefault(require("./../config/config"));
const auth = () => async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new ApiError_1.ApiError(401, "Authentication required");
        }
        // Verify the token and assert the type
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        // Check if the decoded object has an `id` property
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.email)) {
            throw new ApiError_1.ApiError(401, "Invalid token payload");
        }
        // Find the user by email
        const user = await user_model_1.User.findOne({ email: decoded.email });
        if (!user) {
            throw new ApiError_1.ApiError(401, "User not found");
        }
        // Attach the user to the request object
        req.user = user;
        next();
    }
    catch (error) {
        next(new ApiError_1.ApiError(401, "Invalid token"));
    }
};
exports.auth = auth;
