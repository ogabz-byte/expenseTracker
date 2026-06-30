// client/hooks/useBudgets.ts
import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface Budget {
  _id: string;
  category: string;
  limit: number;
  spent: number;
}

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    try {
      const res = await api.get("/api/budgets");
      setBudgets(res.data.data);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { budgets, loading, refetch: fetchBudgets };
};
