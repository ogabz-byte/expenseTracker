// client/components/dashboard/AddTransactionModal.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ApiResponse, Transaction } from "@/types/index";

interface AddTransactionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Savings",
  "Other",
];

export default function AddTransactionModal({
  onClose,
  onSuccess,
}: AddTransactionModalProps) {
  const [form, setForm] = useState({
    type: "debit" as "credit" | "debit",
    amount: "",
    category: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setError("");

    if (!form.amount || !form.category) {
      setError("Amount and category are required.");
      return;
    }

    if (parseFloat(form.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      await api.post<ApiResponse<Transaction>>("/api/transactions", {
        type: form.type,
        amount: parseFloat(form.amount),
        category: form.category,
        note: form.note,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-[#F0F4F8]">
            Add transaction
          </h2>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-[#F0F4F8] transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* Type toggle */}
          <div>
            <p className="text-xs font-medium text-brand-muted uppercase tracking-wide mb-2">
              Type
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["debit", "credit"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => update("type", t)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                    form.type === t
                      ? t === "credit"
                        ? "bg-brand-green/10 border-brand-green text-brand-green"
                        : "bg-purple-900/20 border-purple-500 text-purple-400"
                      : "bg-brand-navy border-brand-border text-brand-muted hover:text-[#F0F4F8]"
                  }`}
                >
                  {t === "credit" ? "↓ Income" : "↑ Expense"}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-mono text-sm">
                ₦
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                className="w-full bg-brand-navy border border-brand-border rounded-lg pl-8 pr-4 py-3 text-sm text-[#F0F4F8] font-mono placeholder-[#2E4060] outline-none focus:border-brand-green transition-colors"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
              Note{" "}
              <span className="normal-case text-brand-muted/50">
                (optional)
              </span>
            </label>
            <input
              type="text"
              placeholder="What was this for?"
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] placeholder-[#2E4060] outline-none focus:border-brand-green transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border border-brand-border text-sm text-brand-muted hover:text-[#F0F4F8] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-brand-green text-brand-navy text-sm font-semibold hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save transaction"}
          </button>
        </div>
      </div>
    </>
  );
}
