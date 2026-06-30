// client/components/dashboard/StatCard.tsx

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

export default function StatCard({
  label,
  value,
  sub,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl p-6  border ${
        highlight
          ? "bg-brand-green/10 border-brand-green/20"
          : "bg-brand-card border-brand-border"
      }`}
    >
      <p className="text-xs text-brand-muted capitalize tracking-widest mb-3">
        {label}
      </p>
      <p
        className={`font-mono text-xl font-medium tracking-tight ${
          highlight ? "text-brand-green" : "text-[#F0F4F8]"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-brand-muted mt-2">{sub}</p>}
    </div>
  );
}
