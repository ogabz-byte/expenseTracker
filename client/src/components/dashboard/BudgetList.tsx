// client/components/dashboard/BudgetList.tsx

// interface Budget {
//   category: string;
//   limit: number;
//   spent: number;
// }

// interface BudgetListProps {
//   budgets: Budget[];
// }

"use client";

import { useState } from "react";
import { Budget } from "@/hooks/useBudget";
import ManageBudgetsModal from "./ManageBudgetsModal";
import { fmt } from "@/lib/utils";
import Link from "next/link";

interface BudgetListProps {
  budgets: Budget[];
  onSuccess: () => void;
}

// const fmt = (n: number) =>
//   "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 });

const getBarColor = (pct: number) => {
  if (pct >= 90) return "bg-red-500";
  if (pct >= 70) return "bg-amber-500";
  return "bg-brand-green";
};

const getLabelColor = (pct: number) => {
  if (pct >= 90) return "text-red-400";
  if (pct >= 70) return "text-amber-400";
  return "text-brand-green";
};

export default function BudgetList({ budgets, onSuccess }: BudgetListProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-[#F0F4F8]">Budget goals</h2>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/budgets"
              className="text-xs text-brand-muted hover:text-[#F0F4F8] transition-colors"
            >
              View all
            </Link>
            <button
              className="text-xs text-brand-green hover:underline"
              onClick={() => setShowModal(true)}
            >
              Manage
            </button>
          </div>
        </div>

        {budgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-2xl mb-3">◎</p>
            <p className="text-sm font-medium text-[#8A9BB0]">
              No budgets set yet
            </p>
            <p className="text-xs text-brand-muted mt-1">
              Click manage to set a monthly limit
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {budgets.map((b) => {
              const pct = Math.min(Math.round((b.spent / b.limit) * 100), 100);

              return (
                <div key={b._id}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-[#C0CDD8]">
                      {b.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-medium ${getLabelColor(pct)}`}
                      >
                        {pct}%
                      </span>
                      <span className="text-xs font-mono text-brand-muted">
                        {fmt(b.spent)} / {fmt(b.limit)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-brand-navy rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getBarColor(pct)}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <ManageBudgetsModal
          budgets={budgets}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            onSuccess();
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
