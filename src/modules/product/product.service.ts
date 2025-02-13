import { ApiError } from "../../utils/ApiError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

export const productService = {
  async createProduct(productData: Partial<IProduct>) {
    return await Product.create(productData);
  },

  async getAllProducts(
    page: number = 1,
    limit: number = 10,
    filters: Record<string, any> = {}
  ) {
    const skip = (page - 1) * limit;
    const products = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filters);

    return {
      products,
      meta: {
        page,
        limit,
        total,
      },
    };
  },

  async getProductById(id: string) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return product;
  },

  async updateProduct(id: string, updateData: Partial<IProduct>) {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return product;
  },

  async deleteProduct(id: string) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return product;
  },

  async getAllBrands() {
    const brands = await Product.distinct("brand");
    return brands;
  },

  async getAllCategories() {
    const categories = await Product.distinct("category");
    return categories;
  },
};
