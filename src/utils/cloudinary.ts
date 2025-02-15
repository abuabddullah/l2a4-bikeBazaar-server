import { v2 as cloudinary } from "cloudinary";
import config from "./../config/config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (imageUrl: string) => {
  const publicId = imageUrl.split("/").pop()?.split(".")[0];
  if (!publicId) return;

  await cloudinary.uploader.destroy(`bicycle-shop/${publicId}`);
};

export default cloudinary;
