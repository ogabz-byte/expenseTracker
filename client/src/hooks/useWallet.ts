// client/hooks/useWallet.ts
import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useWallet = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      const res = await api.get("/api/wallet");
      setBalance(res.data.data.balance);
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { balance, loading, refetch: fetchBalance };
};
