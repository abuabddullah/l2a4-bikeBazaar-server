"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
const ApiError_1 = require("../../utils/ApiError");
exports.productService = {
    async createProduct(productData) {
        return await product_model_1.Product.create(productData);
    },
    async getAllProducts(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const products = await product_model_1.Product.find(filters)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await product_model_1.Product.countDocuments(filters);
        return {
            products,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
    async getProductById(id) {
        const product = await product_model_1.Product.findById(id);
        if (!product) {
            throw new ApiError_1.ApiError(404, 'Product not found');
        }
        return product;
    },
    async updateProduct(id, updateData) {
        const product = await product_model_1.Product.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!product) {
            throw new ApiError_1.ApiError(404, 'Product not found');
        }
        return product;
    },
    async deleteProduct(id) {
        const product = await product_model_1.Product.findByIdAndDelete(id);
        if (!product) {
            throw new ApiError_1.ApiError(404, 'Product not found');
        }
        return product;
    },
};
