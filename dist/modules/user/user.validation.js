"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserStatusSchema = exports.changePasswordSchema = exports.updateProfileSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(50),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(50).optional(),
        avatar: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string(),
        newPassword: zod_1.z.string().min(6),
    }),
});
exports.changeUserStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        targetUserId: zod_1.z.string(),
        status: zod_1.z.string(),
    }),
});
