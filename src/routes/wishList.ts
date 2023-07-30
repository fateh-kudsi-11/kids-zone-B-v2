import { Router } from "express";
import {
  createWishList,
  addProductToWishList,
  deletProductFromWishList,
  getWishList,
} from "../controllers/wishList";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, createWishList);
router.get("/", protect, getWishList);
router.post("/:id", protect, addProductToWishList);
router.delete("/:id", protect, deletProductFromWishList);

export default router;
