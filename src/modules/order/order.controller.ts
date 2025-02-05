import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { orderService } from "./order.service";

export const orderController = {
  createOrder: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const order = await orderService.createOrder(userId, req.body);
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    }
  ),

  getUserOrders: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const orders = await orderService.getUserOrders(userId);
      res.status(200).json({
        success: true,
        data: orders,
      });
    }
  ),

  getOrderById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const order = await orderService.getOrderById(req.params.id);
      res.status(200).json({
        success: true,
        data: order,
      });
    }
  ),

  updateOrderStatus: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(req.params.id, status);
      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    }
  ),

  cancelOrder: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const order = await orderService.cancelOrder(req.params.id, userId);
      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
      });
    }
  ),
};
