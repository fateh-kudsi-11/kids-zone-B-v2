import { Router } from "express";
import {
  getMe,
  login,
  register,
  updatePassword,
  updateUser,
} from "../controllers/user";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/me", protect, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/update-user", protect, updateUser);
router.post("/update-password", protect, updatePassword);

export default router;
