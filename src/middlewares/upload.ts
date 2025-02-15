import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./../utils/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "bicycle-shop",
    format: file.mimetype.split("/")[1],
    public_id: `${file.fieldname}-${Date.now()}`,
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  }),
});

export const upload = multer({ storage });
