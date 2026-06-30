// server/src/routes/transaction.routes.js
import express from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  exportTransactionsCSV,
  exportTransactionsPDF,
} from "../controllers/transaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware); // protect all transaction routes

router.get("/", getTransactions);
router.post("/", createTransaction);
router.get("/export/csv", exportTransactionsCSV);
router.get("/export/pdf", exportTransactionsPDF);
router.delete("/:id", deleteTransaction);

export default router;
