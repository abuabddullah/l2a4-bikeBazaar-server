import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { upload } from "../../middlewares/upload";
import { productController } from "./product.controller";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post(
  "/",
  auth(),
  isAdmin,
  upload.single("image"),
  // validateRequest(createProductSchema),
  productController.createProduct
);

router.patch(
  "/:id",
  auth(),
  isAdmin,
  upload.single("image"),
  // validateRequest(updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", auth(), isAdmin, productController.deleteProduct);

export const productRoutes = router;
