// server/src/services/paystack.service.js
import axios from "axios";

const PAYSTACK_BASE = "https://api.paystack.co";

const paystackClient = axios.create({
  baseURL: PAYSTACK_BASE,
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

// initialize a transaction — returns authorization_url
export const initializeTransaction = async ({ email, amount, metadata }) => {
  const res = await paystackClient.post("/transaction/initialize", {
    email,
    amount, // in kobo
    metadata,
    callback_url: `${process.env.CLIENT_URL}/dashboard?payment=success`,
  });
  return res.data.data;
};

// verify a transaction by reference
export const verifyTransaction = async (reference) => {
  const res = await paystackClient.get(`/transaction/verify/${reference}`);
  return res.data.data;
};
