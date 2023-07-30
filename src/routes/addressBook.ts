import { Router } from "express";
import {
  createAddressBook,
  findAddressBook,
  findAddressBookById,
  deleteAddressBookById,
} from "../controllers/addressBook";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/", protect, createAddressBook);
router.get("/", protect, findAddressBook);
router.get("/:id", protect, findAddressBookById);
router.delete("/:id", protect, deleteAddressBookById);

export default router;
