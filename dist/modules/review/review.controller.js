"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getReviews = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("../order/order.model");
const product_model_1 = require("../product/product.model");
const review_model_1 = require("./review.model");
const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        // Fetch reviews
        const reviews = await review_model_1.Review.find({ productId }).populate("userId", "name");
        // Fetch product's rating
        const product = await product_model_1.Product.findById(productId).select("averageRating totalReviews");
        res.status(200).json({
            reviews,
            averageRating: (product === null || product === void 0 ? void 0 : product.averageRating) || 0,
            totalReviews: (product === null || product === void 0 ? void 0 : product.totalReviews) || 0,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
};
exports.getReviews = getReviews;
// Function to update product rating
const updateProductRating = async (productId, session) => {
    const reviews = await review_model_1.Review.find({ productId }).session(session);
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const totalReviews = reviews.length;
    const averageRating = totalReviews ? totalRating / totalReviews : 0;
    await product_model_1.Product.findByIdAndUpdate(productId, { averageRating, totalReviews }, { session });
    return { averageRating, totalReviews };
};
// Add a Review with Transaction
const addReview = async (req, res) => {
    var _a;
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { productId, rating, review } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // Check if user has purchased the product
        const order = await order_model_1.Order.findOne({
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
        const existingReview = await review_model_1.Review.findOne({ userId, productId }).session(session);
        let newReview;
        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.review = review;
            newReview = await existingReview.save({ session });
        }
        else {
            // Create new review
            newReview = new review_model_1.Review({ userId, productId, rating, review });
            await newReview.save({ session });
        }
        // Update product's average rating
        const { averageRating, totalReviews } = await updateProductRating(productId, session);
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
            averageRating,
            totalReviews,
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
};
exports.addReview = addReview;
