// import jwt from 'jsonwebtoken';

// export const generateToken = (id: string): string => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

/* new code */

import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";

dotenv.config();

const JWT_SECRET: Secret | undefined = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1d";

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions); // Explicitly casting to SignOptions
};
