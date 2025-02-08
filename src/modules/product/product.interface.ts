import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
  category: string;
  imageURL: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
