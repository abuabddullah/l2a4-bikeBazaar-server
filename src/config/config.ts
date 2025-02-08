import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  MONGODB_URI: process.env.MONGODB_URI,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  STORE_ID: process.env.STORE_ID,
  STORE_PASSWORD: process.env.STORE_PASSWORD,
  SSL_PAYMENT_URL: process.env.SSL_PAYMENT_URL,
  SSL_VALIDATION_URL: process.env.SSL_VALIDATION_URL,

  API_URL: process.env.API_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
