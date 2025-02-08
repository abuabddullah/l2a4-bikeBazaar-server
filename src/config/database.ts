import mongoose from "mongoose";
import config from "./config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
