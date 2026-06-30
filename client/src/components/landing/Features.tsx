// client/components/landing/Features.tsx

const features = [
  {
    icon: "₦",
    title: "Wallet funding",
    description:
      "Top up your wallet via Paystack and track every kobo that comes in.",
  },
  {
    icon: "↕",
    title: "Transaction history",
    description:
      "Every credit and debit logged automatically with category and notes.",
  },
  {
    icon: "◎",
    title: "Budget goals",
    description:
      "Set monthly limits per category. Get visual warnings before you overspend.",
  },
  {
    icon: "↻",
    title: "Recurring transactions",
    description:
      "Schedule fixed income or expenses and let NairaTrack log them for you.",
  },
  {
    icon: "$",
    title: "Multi-currency view",
    description:
      "See your Naira balance alongside its live USD equivalent at a glance.",
  },
  {
    icon: "↓",
    title: "Export your data",
    description:
      "Download your transaction history as PDF or CSV anytime you need it.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 border-t border-brand-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-brand-green font-medium mb-3">
            What you get
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#F0F4F8]">
            Everything in one place
          </h2>
          <p className="text-sm text-brand-muted mt-3 max-w-md mx-auto leading-relaxed">
            No bloat. Just the features that actually help you stay on top of
            your money.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-brand-card border border-brand-border rounded-2xl p-6 hover:border-brand-green/30 transition-colors"
            >
              <div className="w-9 h-9 bg-brand-navy rounded-lg flex items-center justify-center font-mono text-brand-green text-base mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#F0F4F8] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
