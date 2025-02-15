"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const cloudinary_1 = require("../../utils/cloudinary");
const product_model_1 = require("./product.model");
const product_service_1 = require("./product.service");
// export const createProduct = async (req: Request, res: Response) => {
//   try {
//     let imageURL = "";
//     if (req.file) imageURL = await uploadToCloudinary(req.file.path);
//     const productData = { ...req.body, imageURL };
//     const product = await Product.create(productData);
//     res
//       .status(201)
//       .json({ success: true, message: "Product created", data: product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
exports.productController = {
    createProduct: (0, catchAsync_1.catchAsync)(async (req, res) => {
        try {
            let imageURL = "";
            if (req.file)
                imageURL = await (0, cloudinary_1.uploadToCloudinary)(req.file.path);
            const productData = { ...req.body, imageURL };
            const product = await product_model_1.Product.create(productData);
            res
                .status(201)
                .json({ success: true, message: "Product created", data: product });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Product not created" });
        }
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
        const { id } = req.params;
        let updateData = { ...req.body };
        // Handle image upload
        if (req.file) {
            const newImageUrl = await (0, cloudinary_1.uploadToCloudinary)(req.file.path);
            // Delete the old image from Cloudinary
            const product = await product_service_1.productService.getProductById(id);
            if (product === null || product === void 0 ? void 0 : product.imageURL) {
                await (0, cloudinary_1.deleteFromCloudinary)(product.imageURL);
            }
            updateData.imageURL = newImageUrl;
        }
        const updatedProduct = await product_service_1.productService.updateProduct(id, updateData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }),
    deleteProduct: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        await product_service_1.productService.deleteProduct(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }),
    getAllBrands: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const brands = await product_service_1.productService.getAllBrands();
        res.status(200).json({
            success: true,
            message: "Brands retrieved successfully",
            data: brands,
        });
    }),
    getAllCategories: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const categories = await product_service_1.productService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    }),
};
