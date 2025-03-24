"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
// src/modules/review/review.routes.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("./../../middlewares/auth");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(), review_controller_1.addReview);
router.get("/:productId", review_controller_1.getReviews);
exports.reviewRoutes = router;
