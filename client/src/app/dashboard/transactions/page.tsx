// client/app/(dashboard)/transactions/page.tsx
"use client";

import { useState, useMemo } from "react";
import Topbar from "@/components/dashboard/Topbar";
import TransactionFilters from "@/components/dashboard/transactions/TransactionFilters";
import TransactionTable from "@/components/dashboard/transactions/TransactionTable";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";
import { useTransactions } from "@/hooks/useTransaction";
import api from "@/lib/api";
import ExportButton from "@/components/dashboard/transactions/ExportButton";

interface Filters {
  search: string;
  type: string;
  category: string;
}

export default function TransactionsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "",
    category: "",
  });

  const { transactions, loading, refetch } = useTransactions();

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        !filters.search ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.note.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = !filters.type || tx.type === filters.type;

      const matchesCategory =
        !filters.category || tx.category === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, filters]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/transactions/${id}`);
      refetch();
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Transactions" />

      <div className="p-8 flex flex-col gap-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#F0F4F8]">
              All transactions
            </h2>
            <p className="text-xs text-brand-muted mt-0.5">
              {filtered.length} of {transactions.length} transactions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ExportButton />
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-brand-green text-brand-navy text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-hover transition-colors"
            >
              + Add transaction
            </button>
          </div>
        </div>

        {/* Filters */}
        <TransactionFilters filters={filters} onChange={setFilters} />

        {/* Table */}
        <div className="bg-brand-card border border-brand-border rounded-2xl px-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-brand-muted">
                Loading transactions...
              </p>
            </div>
          ) : (
            <TransactionTable transactions={filtered} onDelete={handleDelete} />
          )}
        </div>
      </div>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
