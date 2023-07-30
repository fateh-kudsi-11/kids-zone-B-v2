import { Router } from "express";
import {
  addProductToBag,
  deleteProductfromBag,
  fetchBag,
  updateQtyOrderItem,
  moveProductToWishlist,
} from "../controllers/bag";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, addProductToBag);
router.get("/", protect, fetchBag);
router.delete("/:id", protect, deleteProductfromBag);
router.put("/orderItem/:id", protect, deleteProductfromBag);
router.post("/orderItem/:id", protect, updateQtyOrderItem);
router.post("/wishList", protect, moveProductToWishlist);

export default router;
