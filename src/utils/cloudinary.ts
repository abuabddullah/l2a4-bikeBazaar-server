import { v2 as cloudinary } from "cloudinary";
import config from "./../config/config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "bicycle-shop",
  });
  return result.secure_url;
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  const publicId = imageUrl.split("/").pop()?.split(".")[0];
  if (!publicId) return;

  await cloudinary.uploader.destroy(`bicycle-shop/${publicId}`);
};
