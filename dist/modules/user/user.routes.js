"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_1 = require("../../middlewares/auth");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.registerSchema), user_controller_1.userController.register);
router.post('/login', (0, validateRequest_1.validateRequest)(user_validation_1.loginSchema), user_controller_1.userController.login);
router.get('/profile', (0, auth_1.auth)(), user_controller_1.userController.getProfile);
router.patch('/profile', (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(user_validation_1.updateProfileSchema), user_controller_1.userController.updateProfile);
router.post('/change-password', (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(user_validation_1.changePasswordSchema), user_controller_1.userController.changePassword);
exports.userRoutes = router;
