import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { validateRequest } from "../../middlewares/validateRequest";
import { orderController } from "./order.controller";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(createOrderSchema),
  orderController.createOrder
);
router.get("/my-orders", auth(), orderController.getUserOrders);
router.get("/all-orders", auth(), isAdmin, orderController.getAllOrders);
router.get("/:id", auth(), orderController.getOrderById);
router.patch("/:id/cancel", auth(), orderController.cancelOrder);
router.patch(
  "/:id/status",
  auth(),
  isAdmin,
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

export const orderRoutes = router;
