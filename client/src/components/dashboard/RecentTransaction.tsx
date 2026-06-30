// client/components/dashboard/RecentTransactions.tsx
import { Transaction } from "@/types";
import { fmt } from "@/lib/utils";
import Link from "next/link";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

// const fmt = (n: number) =>
//   "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 });

const timeAgo = (iso: string) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
};

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-[#F0F4F8] mb-6">
          Recent transactions
        </h2>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-2xl mb-3">↕</p>
          <p className="text-sm font-medium text-[#8A9BB0]">
            No transactions yet
          </p>
          <p className="text-xs text-brand-muted mt-1">
            Fund your wallet to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-[#F0F4F8]">
          Recent transactions
        </h2>
        <Link
          href="/dashboard/transactions"
          className="text-xs text-brand-green hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col">
        {transactions.map((tx, i) => (
          <div
            key={tx._id}
            className={`flex items-center gap-4 py-3 ${
              i !== transactions.length - 1
                ? "border-b border-brand-border"
                : ""
            }`}
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                tx.type === "credit"
                  ? "bg-brand-green/10 text-brand-green"
                  : "bg-purple-900/20 text-purple-400"
              }`}
            >
              {tx.type === "credit" ? "↓" : "↑"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#C0CDD8] truncate">
                {tx.category}
              </p>
              <p className="text-xs text-brand-muted truncate mt-0.5">
                {tx.note}
              </p>
            </div>

            {/* Amount + time */}
            <div className="text-right flex-shrink-0">
              <p
                className={`font-mono text-sm font-medium ${
                  tx.type === "credit" ? "text-brand-green" : "text-purple-400"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"}
                {fmt(tx.amount)}
              </p>
              <p className="text-xs text-brand-muted mt-0.5">
                {timeAgo(tx.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
