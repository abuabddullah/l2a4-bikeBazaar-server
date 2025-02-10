import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "customer" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
