// client/hooks/useRecurringTransactions.ts
import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface RecurringTransaction {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  category: string;
  note: string;
  frequency: "daily" | "weekly" | "monthly";
  next_run_date: string;
  active: boolean;
}

export const useRecurringTransactions = () => {
  const [recurring, setRecurring] = useState<RecurringTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecurring = async () => {
    try {
      const res = await api.get("/api/recurring-transactions");
      setRecurring(res.data.data);
    } catch (err) {
      console.error("Failed to fetch recurring transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecurring();
  }, []);

  return { recurring, loading, refetch: fetchRecurring };
};
