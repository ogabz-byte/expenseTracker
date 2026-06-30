// client/components/dashboard/settings/PasswordSettings.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function PasswordSettings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!form.currentPassword || !form.newPassword || !form.confirm) {
      setError("All fields are required.");
      return;
    }

    if (form.newPassword !== form.confirm) {
      setError("New passwords do not match.");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      await api.put("/api/auth/password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setSuccess("Password updated successfully.");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-[#F0F4F8] mb-1">Password</h2>
      <p className="text-xs text-brand-muted mb-6">
        Change your account password.
      </p>

      {error && (
        <div className="bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3 text-sm text-red-400 mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-brand-green/10 border border-brand-green/30 rounded-lg px-4 py-3 text-sm text-brand-green mb-4">
          {success}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
            Current password
          </label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => update("currentPassword", e.target.value)}
            className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
            New password
          </label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => update("newPassword", e.target.value)}
            className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
            Confirm new password
          </label>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 bg-brand-green text-brand-navy text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating..." : "Update password"}
      </button>
    </div>
  );
}
