import express from "express";
import {
  getCart,
  saveCart,
  clearSavedCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:email", getCart);
router.post("/", saveCart);
router.delete("/:email", clearSavedCart);

export default router;