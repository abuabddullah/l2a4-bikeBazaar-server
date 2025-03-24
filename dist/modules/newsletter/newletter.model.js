"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
const mongoose_1 = require("mongoose");
// 2. Create the schema
const newsletterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});
// 3. Create and export the model
exports.Newsletter = (0, mongoose_1.model)("Newsletter", newsletterSchema);
