// client/components/dashboard/Topbar.tsx
"use client";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import FundWalletModal from "./FundWalletModal";
import { fmt, toUSD } from "@/lib/utils";
import { useExchangeRate } from "@/hooks/useExchangeRate";

interface TopbarProps {
  title: string;
}

// const fmt = (n: number) =>
//   "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 });

// mock balance — will come from API/store in Week 2
// const balance = 142300;

export default function Topbar({ title }: TopbarProps) {
  const [showModal, setShowModal] = useState(false);
  const { balance, refetch } = useWallet();
  const { rate } = useExchangeRate();

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-brand-border bg-brand-card sticky top-0 z-30">
      {/* Left — page title */}
      <div>
        <h1 className="text-base font-semibold text-[#F0F4F8] tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-brand-muted mt-0.5">{today}</p>
      </div>

      {/* Right — balance + fund button */}
      <div className="flex items-center gap-5">
        <div className="text-right hidden sm:block">
          <p className="text-xs text-brand-muted uppercase tracking-wide">
            Balance
          </p>
          <p className="font-mono text-sm font-medium text-brand-green">
            {fmt(balance)}
          </p>
          {rate && (
            <p className="font-mono text-[10px] text-brand-muted">
              ≈ {toUSD(balance, rate)}
            </p>
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-green text-brand-navy text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-green-hover transition-colors"
        >
          + Fund wallet
        </button>
      </div>
      {showModal && (
        <FundWalletModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            refetch();
            setShowModal(false);
          }}
        />
      )}
    </header>
  );
}
