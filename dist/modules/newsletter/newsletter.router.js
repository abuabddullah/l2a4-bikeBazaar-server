"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const newletter_model_1 = require("./newletter.model");
const router = express_1.default.Router();
// POST: Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;
        // Check if already subscribed
        const existingSubscriber = await newletter_model_1.Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                success: false,
                message: "Email is already subscribed to newsletter",
            });
        }
        const newsletter = await newletter_model_1.Newsletter.create({ email });
        res.status(201).json({
            success: true,
            message: "Successfully subscribed to newsletter",
            data: newsletter,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to subscribe",
            error: error,
        });
    }
});
// GET: Get all subscribers
router.get("/subscribers", async (req, res) => {
    try {
        const subscribers = await newletter_model_1.Newsletter.find();
        res.status(200).json({
            success: true,
            data: subscribers,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch subscribers",
            error: error,
        });
    }
});
// DELETE: Unsubscribe from newsletter
router.delete("/unsubscribe/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const result = await newletter_model_1.Newsletter.findOneAndDelete({ email });
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Subscriber not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successfully unsubscribed from newsletter",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to unsubscribe",
            error: error,
        });
    }
});
exports.newsletterRoutes = router;
