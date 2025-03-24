import { Schema, model } from "mongoose";

// 1. Create an interface
interface INewsletter {
  email: string;
  subscribedAt: Date;
}

// 2. Create the schema
const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Create and export the model
export const Newsletter = model<INewsletter>("Newsletter", newsletterSchema);
