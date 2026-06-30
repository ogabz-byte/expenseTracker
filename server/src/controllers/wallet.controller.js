// server/src/controllers/wallet.controller.js
import crypto from "crypto";
import Transaction from "../models/transaction.model.js";
import Wallet from "../models/wallet.model.js";
import {
  initializeTransaction,
  verifyTransaction,
} from "../services/paymentGateway.service.js";
import { getUSDToNGNRate } from "../services/exchangeRate.service.js";

// GET BALANCE — sum of all user transactions
export const getWallet = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user_id: userId });

    const balance = transactions.reduce((sum, tx) => {
      return tx.type === "credit" ? sum + tx.amount : sum - tx.amount;
    }, 0);

    res.json({ success: true, data: { balance } });
  } catch (err) {
    next(err);
  }
};

// INITIALIZE PAYSTACK PAYMENT
export const fundWallet = async (req, res, next) => {
  try {
    const { amount } = req.body; // amount in naira from frontend
    const user = req.user;

    if (!amount || amount < 100) {
      return res.status(400).json({
        success: false,
        message: "Minimum amount is ₦100.",
      });
    }

    const amountInKobo = Math.round(amount * 100);

    const data = await initializeTransaction({
      email: user.email,
      amount: amountInKobo,
      metadata: {
        user_id: user._id.toString(),
        type: "wallet_funding",
      },
    });

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PAYSTACK WEBHOOK
export const paystackWebhook = async (req, res) => {
  try {
    // verify the request is actually from Paystack
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.status(401).send("Invalid signature");
    }

    const event = req.body;

    if (event.event === "charge.success") {
      const { metadata, amount, reference } = event.data;

      // verify transaction with Paystack directly
      const verified = await verifyTransaction(reference);

      if (verified.status === "success") {
        const userId = metadata.user_id;
        const amountInKobo = amount; // already in kobo from Paystack

        // log credit transaction
        await Transaction.create({
          user_id: userId,
          type: "credit",
          amount: amountInKobo,
          category: "Wallet funding",
          note: `Paystack payment — ref: ${reference}`,
        });
      }
    }

    // always return 200 to Paystack immediately
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(200); // still return 200 so Paystack doesn't retry
  }
};

//EXCHANGE RATE
export const getExchangeRate = async (req, res, next) => {
  try {
    const rate = await getUSDToNGNRate();
    res.json({ success: true, data: { rate } });
  } catch (err) {
    next(err);
  }
};
