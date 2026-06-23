import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/:id", updateProfile);
router.put("/:id/change-password", changePassword);

export default router;