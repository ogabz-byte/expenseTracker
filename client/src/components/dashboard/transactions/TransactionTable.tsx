// client/components/dashboard/transactions/TransactionTable.tsx
"use client";

import { Transaction } from "@/types";
import TransactionRow from "./TransactionRow";

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionTable({
  transactions,
  onDelete,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-2xl mb-3">↕</p>
        <p className="text-sm font-medium text-[#8A9BB0]">
          No transactions found
        </p>
        <p className="text-xs text-brand-muted mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div>
      {transactions.map((tx) => (
        <TransactionRow key={tx._id} transaction={tx} onDelete={onDelete} />
      ))}
    </div>
  );
}
