// server/src/models/budget.model.js
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// one budget per category per user
budgetSchema.index({ user_id: 1, category: 1 }, { unique: true });

export default mongoose.model("Budget", budgetSchema);
