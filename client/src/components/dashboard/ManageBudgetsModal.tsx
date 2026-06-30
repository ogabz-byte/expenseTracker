// client/components/dashboard/ManageBudgetsModal.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Budget } from "@/hooks/useBudget";
import { fmt } from "@/lib/utils";

interface ManageBudgetsModalProps {
  budgets: Budget[];
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

// const fmt = (n: number) =>
//   "₦" + (n / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 });

export default function ManageBudgetsModal({
  budgets,
  onClose,
  onSuccess,
}: ManageBudgetsModalProps) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLimit, setEditLimit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const existingCategories = budgets.map((b) => b.category);
  const availableCategories = CATEGORIES.filter(
    (c) => !existingCategories.includes(c),
  );

  const handleCreate = async () => {
    setError("");

    if (!category || !limit) {
      setError("Category and limit are required.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/budgets", {
        category,
        limit: parseFloat(limit),
      });
      setCategory("");
      setLimit("");
      await onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setError("");

    if (!editLimit) {
      setError("Limit is required.");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/api/budgets/${id}`, {
        limit: parseFloat(editLimit),
      });
      setEditingId(null);
      setEditLimit("");
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/api/budgets/${id}`);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-[#F0F4F8]">
            Manage budgets
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

        {/* Existing budgets */}
        {budgets.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">
              Current budgets
            </p>
            {budgets.map((b) => (
              <div
                key={b._id}
                className="bg-brand-navy border border-brand-border rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-[#C0CDD8]">
                    {b.category}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingId(b._id);
                        setEditLimit((b.limit / 100).toString());
                      }}
                      className="text-xs text-brand-muted hover:text-brand-green transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="text-xs text-brand-muted hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editingId === b._id ? (
                  <div className="flex gap-2 mt-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted font-mono text-xs">
                        ₦
                      </span>
                      <input
                        type="number"
                        value={editLimit}
                        onChange={(e) => setEditLimit(e.target.value)}
                        className="w-full bg-brand-card border border-brand-border rounded-lg pl-7 pr-3 py-2 text-xs text-[#F0F4F8] font-mono outline-none focus:border-brand-green transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => handleUpdate(b._id)}
                      disabled={loading}
                      className="px-3 py-2 bg-brand-green text-brand-navy text-xs font-semibold rounded-lg hover:bg-brand-green-hover transition-colors disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-2 border border-brand-border text-xs text-brand-muted rounded-lg hover:text-[#F0F4F8] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="text-xs font-mono text-brand-muted">
                    Limit: {fmt(b.limit)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add new budget */}
        {availableCategories.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-brand-muted uppercase tracking-wide">
              Add new budget
            </p>

            <div>
              <label className="text-xs text-brand-muted block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
              >
                <option value="">Select a category</option>
                {availableCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-brand-muted block mb-1.5">
                Monthly limit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-mono text-sm">
                  ₦
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full bg-brand-navy border border-brand-border rounded-lg pl-8 pr-4 py-3 text-sm text-[#F0F4F8] font-mono placeholder-[#2E4060] outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full py-3 bg-brand-green text-brand-navy text-sm font-semibold rounded-lg hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add budget"}
            </button>
          </div>
        ) : (
          <p className="text-sm text-center text-brand-muted py-4">
            All categories have budgets set.
          </p>
        )}
      </div>
    </>
  );
}
