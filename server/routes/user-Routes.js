import express from "express";
import { login, signup } from "../controllers/user-Controls.js";
import {
  cartData,
  foodItems,
  myOrderData,
} from "../controllers/data-Controls.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/foodItems", foodItems);
router.post("/checkout", cartData);
router.post("/myOrder", myOrderData);

export default router;
