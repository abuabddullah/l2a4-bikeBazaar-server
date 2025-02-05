import { Document } from "mongoose";

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export type TOrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

export interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  totalPrice: number;
  status: TOrderStatus;
  paymentStatus: "Pending" | "Completed" | "Failed";
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
