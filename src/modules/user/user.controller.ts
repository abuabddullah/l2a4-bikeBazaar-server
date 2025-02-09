import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";

export const userController = {
  register: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await userService.register(req.body);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    }
  ),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  }),

  getProfile: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const user = await userService.getProfile(userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  ),

  updateProfile: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const result = await userService.updateProfile(userId, req.body);
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: result,
      });
    }
  ),

  changePassword: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const { currentPassword, newPassword } = req.body;
      const result = await userService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      res.status(200).json({
        success: true,
        message: result?.message || "Password changed successfully",
      });
    }
  ),

  getAllUsers: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await userService.getAllUsers();
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    }
  ),

  changeUserStatus: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { targetUserId, status } = req.body;
      const result = await userService.changeUserStatus(targetUserId, status);
      res.status(200).json({
        success: true,
        message: "User status changed successfully",
        data: result,
      });
    }
  ),
};
