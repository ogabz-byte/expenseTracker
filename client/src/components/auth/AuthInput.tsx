// client/components/auth/AuthInput.tsx
"use client";

import { useState } from "react";

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
}

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  isPassword = false,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium text-brand-muted uppercase tracking-wide"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-brand-navy border border-brand-border rounded-lg px-4 py-3 text-sm text-[#F0F4F8] placeholder-[#2E4060] outline-none focus:border-brand-green transition-colors"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-green transition-colors"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
