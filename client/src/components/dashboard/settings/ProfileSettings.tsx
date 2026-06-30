// client/components/dashboard/settings/ProfileSettings.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function ProfileSettings() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.put("/api/auth/profile", { name, email });
      setUser(res.data.data);
      setSuccess("Profile updated successfully.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-[#F0F4F8] mb-1">Profile</h2>
      <p className="text-xs text-brand-muted mb-6">
        Update your name and email address.
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
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-brand-muted uppercase tracking-wide block mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] outline-none focus:border-brand-green transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 bg-brand-green text-brand-navy text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
