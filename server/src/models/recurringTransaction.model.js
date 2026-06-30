// server/src/models/recurringTransaction.model.js
import mongoose from "mongoose";

const recurringTransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number, // in kobo
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    next_run_date: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model(
  "RecurringTransaction",
  recurringTransactionSchema,
);
