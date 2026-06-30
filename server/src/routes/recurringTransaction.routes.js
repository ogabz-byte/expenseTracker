// server/src/routes/recurringTransaction.routes.js
import express from "express";
import {
  getRecurringTransactions,
  createRecurringTransaction,
  toggleRecurringTransaction,
  deleteRecurringTransaction,
} from "../controllers/recurringTransaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getRecurringTransactions);
router.post("/", createRecurringTransaction);
router.put("/:id/toggle", toggleRecurringTransaction);
router.delete("/:id", deleteRecurringTransaction);

export default router;
