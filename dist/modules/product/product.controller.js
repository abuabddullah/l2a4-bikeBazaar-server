"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const cloudinary_1 = require("../../utils/cloudinary");
const product_service_1 = require("./product.service");
exports.productController = {
    createProduct: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        let imageURL = "https://ahoybikes.com/wp-content/uploads/2023/09/GROWLER-MS-Grey-Black-1.jpg.webp";
        if (req.file) {
            const result = await (0, cloudinary_1.uploadToCloudinary)(req.file.path);
            imageURL = result.secure_url;
        }
        const productData = {
            ...req.body,
            imageURL,
        };
        const product = await product_service_1.productService.createProduct(productData);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }),
    getAllProducts: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { category, brand, minPrice, maxPrice } = req.query;
        const filters = {};
        if (category)
            filters.category = category;
        if (brand)
            filters.brand = brand;
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice)
                filters.price.$gte = Number(minPrice);
            if (maxPrice)
                filters.price.$lte = Number(maxPrice);
        }
        const result = await product_service_1.productService.getAllProducts(page, limit, filters);
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: result.products,
            meta: result.meta,
        });
    }),
    getProductById: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const product = await product_service_1.productService.getProductById(req.params.id);
        res.status(200).json({
            success: true,
            data: product,
        });
    }),
    updateProduct: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        let updateData = { ...req.body };
        if (req.file) {
            const result = await (0, cloudinary_1.uploadToCloudinary)(req.file.path);
            updateData.imageURL = result.secure_url;
        }
        const product = await product_service_1.productService.updateProduct(req.params.id, updateData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    }),
    deleteProduct: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        await product_service_1.productService.deleteProduct(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }),
};
