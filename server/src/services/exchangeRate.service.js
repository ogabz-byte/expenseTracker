// server/src/services/exchangeRate.service.js
import axios from "axios";

let cachedRate = null;
let cachedAt = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getUSDToNGNRate = async () => {
  const now = Date.now();

  // return cached rate if still fresh
  if (cachedRate && cachedAt && now - cachedAt < CACHE_DURATION) {
    return cachedRate;
  }

  try {
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`,
    );

    const rate = res.data.conversion_rates.NGN;

    cachedRate = rate;
    cachedAt = now;

    return rate;
  } catch (err) {
    console.error("Failed to fetch exchange rate:", err.message);
    // fallback rate if API fails — update this occasionally
    return cachedRate || 1500;
  }
};
