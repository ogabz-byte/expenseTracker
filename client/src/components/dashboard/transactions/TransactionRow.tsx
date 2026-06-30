// client/components/dashboard/transactions/TransactionRow.tsx
"use client";

import { Transaction } from "@/types";
import { fmt } from "@/lib/utils";

interface TransactionRowProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export default function TransactionRow({
  transaction,
  onDelete,
}: TransactionRowProps) {
  const date = new Date(transaction.createdAt).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const time = new Date(transaction.createdAt).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center gap-4 py-4 border-b border-brand-border last:border-none">
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
          transaction.type === "credit"
            ? "bg-brand-green/10 text-brand-green"
            : "bg-purple-900/20 text-purple-400"
        }`}
      >
        {transaction.type === "credit" ? "↓" : "↑"}
      </div>

      {/* Category + note */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#C0CDD8] truncate">
          {transaction.category}
        </p>
        {transaction.note && (
          <p className="text-xs text-brand-muted truncate mt-0.5">
            {transaction.note}
          </p>
        )}
      </div>

      {/* Date + time */}
      <div className="text-right hidden sm:block flex-shrink-0">
        <p className="text-xs text-[#8A9BB0]">{date}</p>
        <p className="text-xs text-brand-muted mt-0.5">{time}</p>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <p
          className={`font-mono text-sm font-medium ${
            transaction.type === "credit"
              ? "text-brand-green"
              : "text-purple-400"
          }`}
        >
          {transaction.type === "credit" ? "+" : "-"}
          {fmt(transaction.amount)}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(transaction._id)}
        className="text-brand-muted hover:text-red-400 transition-colors text-xs flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
}
