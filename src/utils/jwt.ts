// import jwt from 'jsonwebtoken';

// export const generateToken = (id: string): string => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

/* new code */

import config from "./../config/config";

import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret | undefined = config.JWT_SECRET;
const JWT_EXPIRES_IN: string = config.JWT_EXPIRES_IN || "1d";

// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}
export type TJWTPayload = {
  _id: string;
  email: string;
  role: "user" | "admin";
};
export const generateToken = (jwtPayload: TJWTPayload): string => {
  return jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions); // Explicitly casting to SignOptions
};
