import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { upload } from "../../middlewares/upload";
import { validateRequest } from "../../middlewares/validateRequest";
import { productController } from "./product.controller";
import { createProductSchema, updateProductSchema } from "./product.validation";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post(
  "/",
  auth(),
  isAdmin,
  upload.single("image"),
  validateRequest(createProductSchema),
  productController.createProduct
);

router.patch(
  "/:id",
  auth(),
  isAdmin,
  upload.single("image"),
  validateRequest(updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", auth(), isAdmin, productController.deleteProduct);

export const productRoutes = router;
