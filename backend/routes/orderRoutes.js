import express from "express";
import {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/", getAllOrders);
router.get("/user/:email", getUserOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;