"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const ApiError_1 = require("../utils/ApiError");
const isAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
        throw new ApiError_1.ApiError(403, "Admin access required");
    }
    next();
};
exports.isAdmin = isAdmin;
