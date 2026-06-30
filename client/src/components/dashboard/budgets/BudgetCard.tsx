// client/components/dashboard/budgets/BudgetCard.tsx
"use client";

import { Budget } from "@/hooks/useBudget";
import { fmt } from "@/lib/utils";

interface BudgetCardProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

const getBarColor = (pct: number) => {
  if (pct >= 90) return "bg-red-500";
  if (pct >= 70) return "bg-amber-500";
  return "bg-brand-green";
};

const getStatusText = (pct: number) => {
  if (pct >= 100) return "Limit reached";
  if (pct >= 90) return "Almost at limit";
  if (pct >= 70) return "Getting close";
  return "On track";
};

const getStatusColor = (pct: number) => {
  if (pct >= 90) return "text-red-400";
  if (pct >= 70) return "text-amber-400";
  return "text-brand-green";
};

export default function BudgetCard({
  budget,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const pct = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);
  const remaining = Math.max(budget.limit - budget.spent, 0);

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#F0F4F8]">
            {budget.category}
          </h3>
          <p className={`text-xs mt-1 ${getStatusColor(pct)}`}>
            {getStatusText(pct)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(budget)}
            className="text-xs text-brand-muted hover:text-brand-green transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(budget._id)}
            className="text-xs text-brand-muted hover:text-red-400 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="h-2 bg-brand-navy rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getBarColor(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-brand-muted">Spent</p>
          <p className="font-mono text-sm font-medium text-[#F0F4F8] mt-0.5">
            {fmt(budget.spent)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-brand-muted">Limit</p>
          <p className="font-mono text-sm font-medium text-[#8A9BB0] mt-0.5">
            {fmt(budget.limit)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-brand-muted">Remaining</p>
          <p className="font-mono text-sm font-medium text-brand-green mt-0.5">
            {fmt(remaining)}
          </p>
        </div>
      </div>
    </div>
  );
}
