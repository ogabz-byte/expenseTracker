// client/components/landing/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-brand-card border border-brand-border rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
          <span className="text-xs text-brand-muted font-medium">
            Built for the Nigerian experience
          </span>
        </div>

        <h1 className="text-5xl font-semibold tracking-tight text-[#F0F4F8] leading-tight mb-6">
          Know where your <span className="text-brand-green font-mono">₦</span>{" "}
          goes
        </h1>

        <p className="text-base text-brand-muted leading-relaxed mb-10 max-w-lg mx-auto">
          Track spending, set budgets, and fund your wallet — all in one clean
          dashboard built around the Naira.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="bg-brand-green text-brand-navy font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-green-hover transition-colors"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="text-sm text-brand-muted hover:text-[#F0F4F8] transition-colors"
          >
            Already have an account →
          </Link>
        </div>
      </div>

      {/* Wallet balance preview card */}
      <div className="mt-20 w-full max-w-sm bg-brand-card border border-brand-border rounded-2xl p-6 text-left">
        <p className="text-xs text-brand-muted uppercase tracking-widest mb-3">
          Wallet balance
        </p>
        <p className="font-mono text-4xl font-medium text-brand-green tracking-tight">
          ₦142,300.00
        </p>
        <div className="mt-6 flex flex-col gap-3">
          {[
            { label: "Food", spent: "₦15,200", limit: "₦30,000", pct: 51 },
            { label: "Transport", spent: "₦3,200", limit: "₦15,000", pct: 21 },
            { label: "Bills", spent: "₦15,000", limit: "₦20,000", pct: 75 },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#C0CDD8]">{b.label}</span>
                <span className="font-mono text-xs text-brand-muted">
                  {b.spent} / {b.limit}
                </span>
              </div>
              <div className="h-1.5 bg-brand-navy rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-green"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
