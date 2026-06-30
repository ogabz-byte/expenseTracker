// server/src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import walletRoutes from "./routes/wallet.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import recurringTransactionRoutes from "./routes/recurringTransaction.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { startRecurringTransactionJob } from "./jobs/recurringTransactionJob.js";

const app = express();

// connect to DB before anything else
connectDB();
//recurring transaction
startRecurringTransactionJob();

// webhook must be registered before express.json()
import("./routes/wallet.routes.js").then(({ default: walletRoutes }) => {});

app.use("/api/wallet/webhook", express.raw({ type: "application/json" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/recurring-transactions", recurringTransactionRoutes);
app.use("/api/budgets", budgetRoutes);

// temporary test route
app.get("/test-db", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});
app.use(errorMiddleware);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`),
);
