"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const isAdmin_1 = require("../../middlewares/isAdmin");
const upload_1 = require("../../middlewares/upload");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.get("/", product_controller_1.productController.getAllProducts);
router.get("/brands", product_controller_1.productController.getAllBrands);
router.get("/categories", product_controller_1.productController.getAllCategories);
router.get("/:id", product_controller_1.productController.getProductById);
router.post("/", (0, auth_1.auth)(), isAdmin_1.isAdmin, upload_1.upload.single("image"), 
// validateRequest(createProductSchema),
product_controller_1.productController.createProduct);
router.patch("/:id", (0, auth_1.auth)(), isAdmin_1.isAdmin, upload_1.upload.single("image"), 
// validateRequest(updateProductSchema),
product_controller_1.productController.updateProduct);
router.delete("/:id", (0, auth_1.auth)(), isAdmin_1.isAdmin, product_controller_1.productController.deleteProduct);
exports.productRoutes = router;
