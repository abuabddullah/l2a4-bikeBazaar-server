import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    brand: z.string().min(2),
    price: z.number().positive(),
    productModel: z.string().min(2),
    stock: z.number().int().min(0),
    category: z.string().min(2),
    description: z.string().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    brand: z.string().min(2).optional(),
    price: z.number().positive().optional(),
    productModel: z.string().optional(),
    stock: z.number().int().min(0).optional(),
    category: z.string().optional(),
    imageURL: z.string().url().optional(),
    description: z.string().optional(),
  }),
});
