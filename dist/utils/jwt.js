"use strict";
// import jwt from 'jsonwebtoken';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
// export const generateToken = (id: string): string => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };
/* new code */
const config_1 = __importDefault(require("./../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = config_1.default.JWT_SECRET;
const JWT_EXPIRES_IN = config_1.default.JWT_EXPIRES_IN || "1d";
// Ensure JWT_SECRET is defined
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    }); // Explicitly casting to SignOptions
};
exports.generateToken = generateToken;
