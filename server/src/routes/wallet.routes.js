// server/src/routes/wallet.routes.js
import express from "express";
import {
  getWallet,
  fundWallet,
  paystackWebhook,
  getExchangeRate,
} from "../controllers/wallet.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// webhook must use raw body — before express.json() parses it
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paystackWebhook,
);

router.get("/", authMiddleware, getWallet);
router.post("/fund", authMiddleware, fundWallet);
router.get("/exchange-rate", authMiddleware, getExchangeRate);

export default router;
