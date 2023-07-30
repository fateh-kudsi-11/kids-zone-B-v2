import { Router } from "express";
import { getProducts, getProductsForWishList } from "../controllers/products";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", getProducts);
router.get("/wishList", protect, getProductsForWishList);

export default router;
