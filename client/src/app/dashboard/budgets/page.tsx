// client/app/(dashboard)/budgets/page.tsx
"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import BudgetCard from "@/components/dashboard/budgets/BudgetCard";
import ManageBudgetsModal from "@/components/dashboard/ManageBudgetsModal";
import { useBudgets, Budget } from "@/hooks/useBudget";
import api from "@/lib/api";

export default function BudgetsPage() {
  const [showModal, setShowModal] = useState(false);
  const { budgets, loading, refetch } = useBudgets();

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/budgets/${id}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete budget:", err);
    }
  };

  // edit just opens the same modal — it already supports inline editing
  const handleEdit = () => {
    setShowModal(true);
  };

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPct =
    totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Budgets" />

      <div className="p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#F0F4F8]">
              Budget goals
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              {budgets.length}{" "}
              {budgets.length === 1 ? "category" : "categories"} tracked
              {totalLimit > 0 && ` · ${overallPct}% of total budget used`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-green text-brand-navy text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-hover transition-colors"
          >
            + Manage budgets
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-brand-muted">Loading budgets...</p>
          </div>
        ) : budgets.length === 0 ? (
          <div className="bg-brand-card border border-brand-border rounded-2xl flex flex-col items-center justify-center py-16 text-center">
            <p className="text-2xl mb-3">◎</p>
            <p className="text-sm font-medium text-[#8A9BB0]">
              No budgets set yet
            </p>
            <p className="text-xs text-brand-muted mt-1 mb-4">
              Set a monthly limit per category to start tracking
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-brand-green text-brand-navy text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-hover transition-colors"
            >
              + Add your first budget
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((b) => (
              <BudgetCard
                key={b._id}
                budget={b}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ManageBudgetsModal
          budgets={budgets}
          onClose={() => setShowModal(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
