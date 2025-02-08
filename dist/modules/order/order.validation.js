"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z.array(zod_1.z.object({
            productId: zod_1.z.string(),
            quantity: zod_1.z.number().int().positive(),
        })),
        shippingAddress: zod_1.z.object({
            address: zod_1.z.string(),
            city: zod_1.z.string(),
            postalCode: zod_1.z.string(),
            country: zod_1.z.string(),
        }),
    }),
});
exports.updateOrderStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["Pending", "Shipped", "Delivered", "Cancelled"]),
    }),
});
