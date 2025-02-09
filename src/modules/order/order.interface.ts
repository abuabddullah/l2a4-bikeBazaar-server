import mongoose, { Document } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export type TOrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  items: IOrderItem[];
  totalPrice: number;
  status: TOrderStatus;
  paymentStatus: "pending" | "completed" | "failed";
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
