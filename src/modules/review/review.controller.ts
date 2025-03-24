import { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../order/order.model";
import { Product } from "../product/product.model";
import { Review } from "./review.model";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Fetch reviews
    const reviews = await Review.find({ productId }).populate("userId", "name");

    // Fetch product's rating
    const product = await Product.findById(productId).select(
      "averageRating totalReviews"
    );

    res.status(200).json({
      reviews,
      averageRating: product?.averageRating || 0,
      totalReviews: product?.totalReviews || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// Function to update product rating
const updateProductRating = async (
  productId: string,
  session: mongoose.ClientSession
) => {
  const reviews = await Review.find({ productId }).session(session);
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const totalReviews = reviews.length;
  const averageRating = totalReviews ? totalRating / totalReviews : 0;

  await Product.findByIdAndUpdate(
    productId,
    { averageRating, totalReviews },
    { session }
  );
  return { averageRating, totalReviews };
};

// Add a Review with Transaction
export const addReview = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, rating, review } = req.body;
    const userId = req.user?._id;

    // Check if user has purchased the product
    const order = await Order.findOne({
      userId,
      "items.productId": productId,
      paymentStatus: "completed",
      status: { $in: ["pending", "delivered"] },
    }).session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "You can only review purchased products." });
    }

    // Create new review
    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ userId, productId }).session(
      session
    );

    let newReview;
    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.review = review;
      newReview = await existingReview.save({ session });
    } else {
      // Create new review
      newReview = new Review({ userId, productId, rating, review });
      await newReview.save({ session });
    }

    // Update product's average rating
    const { averageRating, totalReviews } = await updateProductRating(
      productId,
      session
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
      averageRating,
      totalReviews,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
