import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary";
import { Product } from "./product.model";
import { productService } from "./product.service";

export const productController = {
  /* createProduct: catchAsync(async (req: Request, res: Response) => {
    try {
      let imageURL = "";
      if (req.file) imageURL = await uploadToCloudinary(req.file.path);

      const productData = { ...req.body, imageURL };
      const product = await Product.create(productData);

      res
        .status(201)
        .json({ success: true, message: "Product created", data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Product not created" });
    }
  }),
  

  updateProduct: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      let updateData = { ...req.body };

      // Handle image upload
      if (req.file) {
        const newImageUrl = await uploadToCloudinary(req.file.path);

        // Delete the old image from Cloudinary
        const product = await productService.getProductById(id);
        if (product?.imageURL) {
          await deleteFromCloudinary(product.imageURL);
        }

        updateData.imageURL = newImageUrl;
      }

      const updatedProduct = await productService.updateProduct(id, updateData);

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    }
  ), */

  /* new code  */

  createProduct: catchAsync(async (req: Request, res: Response) => {
    try {
      let imageURL = req.file ? req.file.path : "";

      const productData = { ...req.body, imageURL };
      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        message: "Product created",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Product not created" });
    }
  }),

  updateProduct: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.file) {
      const newImageUrl = req.file.path;

      const product = await productService.getProductById(id);
      if (product?.imageURL) {
        await deleteFromCloudinary(product.imageURL);
      }

      updateData.imageURL = newImageUrl;
    }

    const updatedProduct = await productService.updateProduct(id, updateData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  }),

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

  deleteProduct: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  ),

  getAllBrands: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const brands = await productService.getAllBrands();
      res.status(200).json({
        success: true,
        message: "Brands retrieved successfully",
        data: brands,
      });
    }
  ),

  getAllCategories: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const categories = await productService.getAllCategories();
      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      });
    }
  ),
};
