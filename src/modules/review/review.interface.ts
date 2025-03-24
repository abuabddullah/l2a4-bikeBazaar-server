import mongoose from "mongoose";

export interface IReview extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  rating: number;
  review: string;
}
