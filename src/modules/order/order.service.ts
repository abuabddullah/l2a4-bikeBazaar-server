import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError";
import { Product } from "../product/product.model";
import { IOrder, IOrderItem, TOrderStatus } from "./order.interface";
import { Order } from "./order.model";

export const orderService = {
  async createOrder(userId: string, orderData: Partial<IOrder>) {
    console.log("strating create order");
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { items } = orderData;
      let totalPrice = 0;

      // Verify stock and calculate total price
      for (const item of items as IOrderItem[]) {
        const product = await Product.findById(item.productId).session(session);
        if (!product) {
          throw new ApiError(404, `Product not found: ${item.productId}`);
        }
        if (product.stock < item.quantity) {
          throw new ApiError(
            400,
            `Insufficient stock for product: ${product.name}`
          );
        }

        // Update stock
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } },
          { session }
        );

        item.price = product.price;
        totalPrice += product.price * item.quantity;
      }

      const order = await Order.create(
        [
          {
            ...orderData,
            userId,
            totalPrice,
            status: "Pending",
            paymentStatus: "Pending",
          },
        ],
        { session }
      );

      await session.commitTransaction();
      return order[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  async getUserOrders(userId: string) {
    return await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });
  },

  async getOrderById(orderId: string) {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    return order;
  },

  async updateOrderStatus(orderId: string, status: TOrderStatus) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.status === "Cancelled") {
      throw new ApiError(400, "Cannot update cancelled order");
    }

    order.status = status;
    await order.save();
    return order;
  },

  async cancelOrder(orderId: string, userId: string) {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.status !== "Pending") {
      throw new ApiError(400, "Can only cancel pending orders");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Restore stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }

      order.status = "Cancelled";
      await order.save({ session });

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
};
