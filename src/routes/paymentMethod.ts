import { Router } from "express";
import {
  createPaymentMethod,
  findPaymentMethod,
  findPaymentMethodById,
  deletePaymentMethodById,
} from "../controllers/paymentMethod";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, createPaymentMethod);
router.get("/", protect, findPaymentMethod);
router.get("/:id", protect, findPaymentMethodById);
router.delete("/:id", protect, deletePaymentMethodById);

export default router;
