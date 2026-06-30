// client/hooks/useExchangeRate.ts
import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await api.get("/api/wallet/exchange-rate");
        setRate(res.data.data.rate);
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  return { rate, loading };
};
