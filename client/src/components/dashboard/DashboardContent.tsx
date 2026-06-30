// client/components/dashboard/DashboardContent.tsx
"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import StatCard from "./StatCard";
import RecentTransactions from "./RecentTransaction";
import BudgetList from "./BudgetList";
// import { Transaction } from "@/types";
import AddTransactionModal from "./AddTransactionModal";
import { useTransactions } from "@/hooks/useTransaction";
import { useBudgets } from "@/hooks/useBudget";
import { fmt, toUSD } from "@/lib/utils";
import { useExchangeRate } from "@/hooks/useExchangeRate";

export default function DashboardContent() {
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    balance,
    loading: walletLoading,
    refetch: refetchWallet,
  } = useWallet();
  const {
    transactions,
    loading: txLoading,
    refetch: refetchTransactions,
  } = useTransactions();
  const { budgets, refetch: refrechBudgets } = useBudgets();
  const { rate } = useExchangeRate();

  const refetchAll = () => {
    refetchWallet();
    refetchTransactions();
    refrechBudgets();
  };

  const totalIn = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const usdSub = rate
    ? `≈ ${toUSD(balance, rate)} · Updated just now`
    : "Updated just now";

  return (
    <>
      <div className="p-8 flex flex-col gap-6">
        {/* Add transaction button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-card border border-brand-border text-sm text-[#F0F4F8] font-medium px-4 py-2 rounded-lg hover:border-brand-green transition-colors"
          >
            + Add transaction
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Wallet balance"
            value={walletLoading ? "Loading..." : fmt(balance)}
            sub={usdSub}
            highlight
          />
          <StatCard
            label="Total in"
            value={txLoading ? "..." : fmt(totalIn)}
            sub="This month"
          />
          <StatCard
            label="Total out"
            value={txLoading ? "..." : fmt(totalOut)}
            sub="This month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          <RecentTransactions transactions={transactions.slice(0, 6)} />
          <BudgetList budgets={budgets} onSuccess={refetchAll} />
        </div>
      </div>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={refetchAll}
        />
      )}
    </>
  );
}
