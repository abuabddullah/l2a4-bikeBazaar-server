"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2),
        brand: zod_1.z.string().min(2),
        price: zod_1.z.number().positive(),
        productModel: zod_1.z.string(),
        stock: zod_1.z.number().int().min(0),
        category: zod_1.z.string(),
        imageURL: zod_1.z.string().url().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        brand: zod_1.z.string().min(2).optional(),
        price: zod_1.z.number().positive().optional(),
        productModel: zod_1.z.string().optional(),
        stock: zod_1.z.number().int().min(0).optional(),
        category: zod_1.z.string().optional(),
        imageURL: zod_1.z.string().url().optional(),
        description: zod_1.z.string().optional(),
    }),
});
