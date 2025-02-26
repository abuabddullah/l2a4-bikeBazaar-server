import SSLCommerzPayment from "sslcommerz-lts";
import { ApiError } from "../../utils/ApiError";
import { Order } from "../order/order.model";
import { IUser } from "../user/user.interface";
import config from "./../../config/config";

// Initialize SSLCommerzPayment
const sslcommerz = new (SSLCommerzPayment as any)(
  config.STORE_ID!,
  config.STORE_PASSWORD!,
  false
);

export const paymentService = {
  async initiatePayment(orderId: string) {
    const order = await Order.findById(orderId).populate<{ userId: IUser }>(
      "userId"
    );
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    if (order.paymentStatus == "completed") {
      throw new ApiError(400, "Payment already processed");
    }

    const transactionId = `${orderId}_${Date.now()}`;
    const data = {
      total_amount: order.totalPrice,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${config.API_URL}/api/payments/success`,
      fail_url: `${config.API_URL}/api/payments/fail`,
      cancel_url: `${config.API_URL}/api/payments/cancel`,
      ipn_url: `${config.API_URL}/api/payments/ipn`,
      shipping_method: "NO",
      product_name: "Bicycle",
      product_category: "Physical Goods",
      product_profile: "general",
      cus_name: order.userId?.name,
      cus_phone: order.userId?.phone || "+8801700000000",
      cus_email: order.userId?.email,
      cus_add1: order.shippingAddress.address,
      cus_city: order.shippingAddress.city,
      cus_postcode: order.shippingAddress.postalCode,
      cus_country: order.shippingAddress.country,
    };

    const response = await sslcommerz.init(data);
    return response;
  },

  async handlePaymentSuccess(payload: any) {
    const order = await Order.findOne({
      _id: payload.tran_id.split("_")[0],
    });
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    order.paymentStatus = "completed";
    await order.save();
    return order;
  },

  async handlePaymentFailure(payload: any) {
    const order = await Order.findOne({
      _id: payload.tran_id.split("_")[0],
    });
    if (!order) {
      throw new ApiError(404, "Order not found");
    }
    order.paymentStatus = "failed";
    await order.save();
    return order;
  },
};
