// client/app/(dashboard)/recurring/page.tsx
"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import RecurringTransactionRow from "@/components/dashboard/recurring/RecurringTransactionRow";
import AddRecurringModal from "@/components/dashboard/recurring/AddRecurringModal";
import { useRecurringTransactions } from "@/hooks/useRecurringTransaction";
import api from "@/lib/api";

export default function RecurringPage() {
  const [showModal, setShowModal] = useState(false);
  const { recurring, loading, refetch } = useRecurringTransactions();

  const handleToggle = async (id: string) => {
    try {
      await api.put(`/api/recurring-transactions/${id}/toggle`);
      refetch();
    } catch (err) {
      console.error("Failed to toggle:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/recurring-transactions/${id}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Recurring transactions" />

      <div className="p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#F0F4F8]">
              Scheduled transactions
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              Automatically logged on their next run date
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-green text-brand-navy text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-hover transition-colors"
          >
            + Add schedule
          </button>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl px-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-brand-muted">Loading...</p>
            </div>
          ) : recurring.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-2xl mb-3">↻</p>
              <p className="text-sm font-medium text-[#8A9BB0]">
                No recurring transactions yet
              </p>
              <p className="text-xs text-brand-muted mt-1">
                Schedule income or expenses that repeat automatically
              </p>
            </div>
          ) : (
            recurring.map((item) => (
              <RecurringTransactionRow
                key={item._id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <AddRecurringModal
          onClose={() => setShowModal(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
