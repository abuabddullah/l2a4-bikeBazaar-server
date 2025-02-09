import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { ApiError } from "../utils/ApiError";
import config from "./../config/config";

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

      // Verify the token and assert the type
      const decoded = jwt.verify(token, config.JWT_SECRET!) as JwtPayload;

      // Check if the decoded object has an `id` property
      if (!decoded?.email) {
        throw new ApiError(401, "Invalid token payload");
      }

      // Find the user by email
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        throw new ApiError(401, "User not found");
      }

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      next(new ApiError(401, "Invalid token"));
    }
  };
