// client/hooks/useTransactions.ts
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Transaction } from "@/types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/api/transactions");
      setTransactions(res.data.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, refetch: fetchTransactions };
};
