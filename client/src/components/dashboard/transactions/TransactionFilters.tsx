// client/components/dashboard/transactions/TransactionFilters.tsx
"use client";

interface Filters {
  search: string;
  type: string;
  category: string;
}

interface TransactionFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Savings",
  "Wallet funding",
  "Other",
];

export default function TransactionFilters({
  filters,
  onChange,
}: TransactionFiltersProps) {
  const update = (field: keyof Filters, value: string) =>
    onChange({ ...filters, [field]: value });

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by note or category..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="flex-1 bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-sm text-[#F0F4F8] placeholder-[#2E4060] outline-none focus:border-brand-green transition-colors"
      />

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
        className="bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
      >
        <option value="">All types</option>
        <option value="credit">Income</option>
        <option value="debit">Expense</option>
      </select>

      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
        className="bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
