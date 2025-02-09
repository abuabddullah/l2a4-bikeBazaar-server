import { ApiError } from "../../utils/ApiError";
import { generateToken } from "../../utils/jwt";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const userService = {
  async register(userData: Partial<IUser>) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(400, "Email already exists");
    }

    const user = await User.create(userData);

    // Generate JWT token
    const jwtPayload = {
      email: user.email as string,
      role: user.role,
    };
    const token = generateToken(jwtPayload);

    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate JWT token
    const jwtPayload = {
      email: user.email as string,
      role: user.role,
    };
    const token = generateToken(jwtPayload);
    return { user, token };
  },

  async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  },

  async updateProfile(userId: string, updateData: Partial<IUser>) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  },

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!(await user.comparePassword(currentPassword))) {
      throw new ApiError(401, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return { message: "Password updated successfully" };
  },
};
