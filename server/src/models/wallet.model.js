// server/src/models/wallet.model.js
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // balance stored in kobo to avoid decimal issues
    // e.g ₦1,000 = 100000 kobo
  },
  { timestamps: true },
);

export default mongoose.model("Wallet", walletSchema);
