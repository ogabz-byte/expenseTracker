// client/components/dashboard/FundWalletModal.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

interface FundWalletModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface PaystackData {
  authorization_url: string;
  reference: string;
}

export default function FundWalletModal({
  onClose,
  onSuccess,
}: FundWalletModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const quickAmounts = [1000, 2000, 5000, 10000];

  const handleFund = async () => {
    setError("");
    const parsed = parseFloat(amount);

    if (!parsed || parsed < 100) {
      setError("Minimum amount is ₦100.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<ApiResponse<PaystackData>>(
        "/api/wallet/fund",
        { amount: parsed },
      );

      if (res.data.success && res.data.data) {
        // redirect to Paystack checkout
        window.location.href = res.data.data.authorization_url;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-[#F0F4F8]">
            Fund wallet
          </h2>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-[#F0F4F8] transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">
            {error}
          </div>
        )}

        {/* Quick amounts */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickAmounts.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q.toString())}
              className={`py-2 rounded-lg text-xs font-medium transition-colors border ${
                amount === q.toString()
                  ? "bg-brand-green text-brand-navy border-brand-green"
                  : "bg-brand-navy border-brand-border text-brand-muted hover:text-[#F0F4F8]"
              }`}
            >
              ₦{q.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="mb-6">
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
            Or enter amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-mono text-sm">
              ₦
            </span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-brand-navy border border-brand-border rounded-lg pl-8 pr-4 py-3 text-sm text-[#F0F4F8] font-mono placeholder-[#2E4060] outline-none focus:border-brand-green transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg border border-brand-border text-sm text-brand-muted hover:text-[#F0F4F8] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleFund}
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-brand-green text-brand-navy text-sm font-semibold hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting..." : "Proceed to pay"}
          </button>
        </div>

        <p className="text-xs text-center text-brand-muted mt-4">
          Secured by Paystack. Use test card 4084 0840 8408 4081.
        </p>
      </div>
    </>
  );
}
