import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { isAdmin } from "./../../middlewares/isAdmin";
import { userController } from "./user.controller";
import {
  changePasswordSchema,
  changeUserStatusSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  userController.register
);
router.post("/login", validateRequest(loginSchema), userController.login);
router.get("/profile", auth(), userController.getProfile);
router.patch(
  "/profile",
  auth(),
  validateRequest(updateProfileSchema),
  userController.updateProfile
);
router.get("/all-users", auth(), isAdmin, userController.getAllUsers);
router.post(
  "/change-password",
  auth(),
  validateRequest(changePasswordSchema),
  userController.changePassword
);
router.patch(
  "/update-status",
  auth(),
  isAdmin,
  validateRequest(changeUserStatusSchema),
  userController.changeUserStatus
);

export const userRoutes = router;
