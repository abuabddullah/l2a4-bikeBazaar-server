// src/modules/review/review.routes.ts
import express from "express";
import { auth } from "./../../middlewares/auth";
import { addReview, getReviews } from "./review.controller";

const router = express.Router();

router.post("/", auth(), addReview);
router.get("/:productId", getReviews);

export const reviewRoutes = router;
