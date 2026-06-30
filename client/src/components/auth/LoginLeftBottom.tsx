// client/components/auth/LoginLeftBottom.tsx

const stats = [
  { value: "₦0.00", label: "Wasted on fees" },
  { value: "100%", label: "Your data" },
  { value: "Free", label: "Always" },
];

export default function LoginLeftBottom() {
  return (
    <div className="flex gap-8">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="font-mono text-lg font-medium text-brand-green">
            {s.value}
          </p>
          <p className="text-xs text-brand-muted mt-1 uppercase tracking-wide">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
