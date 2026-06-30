// client/components/dashboard/recurring/RecurringTransactionRow.tsx
"use client";

import { RecurringTransaction } from "@/hooks/useRecurringTransaction";
import { fmt } from "@/lib/utils";

interface RecurringTransactionRowProps {
  item: RecurringTransaction;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function RecurringTransactionRow({
  item,
  onToggle,
  onDelete,
}: RecurringTransactionRowProps) {
  const nextRun = new Date(item.next_run_date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4 py-3 border-b border-brand-border last:border-none">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
          item.type === "credit"
            ? "bg-brand-green/10 text-brand-green"
            : "bg-purple-900/20 text-purple-400"
        }`}
      >
        {item.type === "credit" ? "↓" : "↑"}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#C0CDD8] truncate">
          {item.category}
          {!item.active && (
            <span className="ml-2 text-[10px] text-brand-muted uppercase tracking-wide">
              Paused
            </span>
          )}
        </p>
        <p className="text-xs text-brand-muted mt-0.5">
          {item.frequency} · Next: {nextRun}
        </p>
      </div>

      <p
        className={`font-mono text-sm font-medium flex-shrink-0 ${
          item.type === "credit" ? "text-brand-green" : "text-purple-400"
        }`}
      >
        {item.type === "credit" ? "+" : "-"}
        {fmt(item.amount)}
      </p>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => onToggle(item._id)}
          className="text-xs text-brand-muted hover:text-brand-green transition-colors"
        >
          {item.active ? "Pause" : "Resume"}
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="text-xs text-brand-muted hover:text-red-400 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
