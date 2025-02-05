import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(401, "Authentication required");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new ApiError(401, "User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      next(new ApiError(401, "Invalid token"));
    }
  };
