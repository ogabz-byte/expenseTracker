// client/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { ApiResponse, User } from "@/types/index";

import Link from "next/link";
import AuthInput from "./AuthInput";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<ApiResponse<User>>("/api/auth/login", {
        email,
        password,
      });

      if (res.data.success && res.data.data) {
        setUser(res.data.data);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <p className="text-xs uppercase tracking-widest text-brand-green font-medium mb-2">
          Welcome back
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F4F8] mb-1">
          Log in to NairaTrack
        </h1>
        <p className="text-sm text-brand-muted">
          No account yet?{" "}
          <Link
            href="/signup"
            className="text-brand-green hover:underline font-medium"
          >
            Create one free
          </Link>
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Fields */}
      <div className="flex flex-col gap-4">
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
        />
        <div className="flex flex-col gap-1">
          <AuthInput
            id="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            isPassword
          />
          <Link
            href="/forgot-password"
            className="text-xs text-brand-muted hover:text-brand-green transition-colors self-end mt-1"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-brand-green text-brand-navy font-semibold text-sm py-3 rounded-lg hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-brand-border" />
        <span className="text-xs text-brand-muted">or</span>
        <div className="flex-1 h-px bg-brand-border" />
      </div>

      <p className="text-sm text-center text-brand-muted">
        New here?{" "}
        <Link
          href="/signup"
          className="text-brand-green hover:underline font-medium"
        >
          Create a free account
        </Link>
      </p>
    </div>
  );
}
