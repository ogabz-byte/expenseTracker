// client/components/auth/SignupLeftBottom.tsx

const steps = [
  { title: "Create your account", sub: "Free, no card needed" },
  { title: "Fund your wallet", sub: "Test with Paystack sandbox" },
  { title: "Set budgets", sub: "Track spending by category" },
  { title: "Export anytime", sub: "PDF or CSV, your data" },
];

export default function SignupLeftBottom() {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((s) => (
        <div key={s.title} className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-[#8A9BB0]">{s.title}</p>
            <p className="text-xs text-brand-muted mt-0.5">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
