import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { productService } from "./product.service";

export const productController = {
  createProduct: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let imageURL =
        "https://ahoybikes.com/wp-content/uploads/2023/09/GROWLER-MS-Grey-Black-1.jpg.webp";
      if (req.file) {
        const result = await uploadToCloudinary(req.file.path);
        imageURL = result.secure_url;
      }

      const productData = {
        ...req.body,
        imageURL,
      };

      const product = await productService.createProduct(productData);
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    }
  ),

  getAllProducts: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const { category, brand, minPrice, maxPrice } = req.query;

      const filters: Record<string, any> = {};
      if (category) filters.category = category;
      if (brand) filters.brand = brand;
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
      }

      const result = await productService.getAllProducts(page, limit, filters);
      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.products,
        meta: result.meta,
      });
    }
  ),

  getProductById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        success: true,
        data: product,
      });
    }
  ),

  updateProduct: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let updateData = { ...req.body };

      if (req.file) {
        const result = await uploadToCloudinary(req.file.path);
        updateData.imageURL = result.secure_url;
      }

      const product = await productService.updateProduct(
        req.params.id,
        updateData
      );
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    }
  ),

  deleteProduct: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  ),
};
