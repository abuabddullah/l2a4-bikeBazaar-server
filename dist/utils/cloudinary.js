"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary_1.v2.uploader.upload(filePath, {
            folder: "bicycle-shop",
        });
        fs_1.default.unlinkSync(filePath);
        return result;
    }
    catch (error) {
        fs_1.default.unlinkSync(filePath);
        throw error;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
