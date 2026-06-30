// client/components/auth/SignupForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import AuthInput from "./AuthInput";
import PasswordStrength from "./PasswordStrength";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { ApiResponse, User } from "@/types/index";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function SignupForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const update = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSignup = async () => {
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<ApiResponse<User>>("/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
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
          Get started
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F4F8] mb-1">
          Create your account
        </h1>
        <p className="text-sm text-brand-muted">
          Already have one?{" "}
          <Link
            href="/login"
            className="text-brand-green hover:underline font-medium"
          >
            Log in instead
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
          id="name"
          label="Full name"
          placeholder="Full name"
          value={form.name}
          onChange={update("name")}
        />
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={update("email")}
        />
        <div>
          <AuthInput
            id="password"
            label="Password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={update("password")}
            isPassword
          />
          <PasswordStrength password={form.password} />
        </div>
        <AuthInput
          id="confirm"
          label="Confirm password"
          placeholder="Repeat your password"
          value={form.confirm}
          onChange={update("confirm")}
          isPassword
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-brand-green text-brand-navy font-semibold text-sm py-3 rounded-lg hover:bg-brand-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-xs text-center text-brand-muted leading-relaxed">
        By signing up you agree to NairaTrack&apos;s terms of use and privacy
        policy.
      </p>

      <p className="text-sm text-center text-brand-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-brand-green hover:underline font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
