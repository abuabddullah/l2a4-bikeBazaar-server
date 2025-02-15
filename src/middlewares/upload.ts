// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// export const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) cb(null, true);
//     else cb(new Error("Only images are allowed!"));
//   },
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

/* new code */
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import config from "./../config/config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bicycle-shop",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

export const upload = multer({ storage });
