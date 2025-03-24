import express from "express";
import { Newsletter } from "./newletter.model";

const router = express.Router();

// POST: Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: "Email is already subscribed to newsletter",
      });
    }
    const newsletter = await Newsletter.create({ email });
    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: newsletter,
    });
  } catch (error) {
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
    const subscribers = await Newsletter.find();
    res.status(200).json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
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
    const result = await Newsletter.findOneAndDelete({ email });
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to unsubscribe",
      error: error,
    });
  }
});

export const newsletterRoutes = router;
