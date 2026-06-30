// client/components/auth/PasswordStrength.tsx

const getStrength = (password: string): number => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

const strengthConfig = [
  { label: "", color: "bg-brand-border" },
  { label: "Weak", color: "bg-red-500" },
  { label: "Fair", color: "bg-amber-500" },
  { label: "Good", color: "bg-lime-500" },
  { label: "Strong", color: "bg-brand-green" },
];

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password);
  const config = strengthConfig[strength];

  if (!password) return null;

  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              i <= strength ? config.color : "bg-brand-border"
            }`}
          />
        ))}
      </div>
      <span
        className={`text-xs font-medium min-w-[36px] ${
          strength <= 1
            ? "text-red-400"
            : strength === 2
              ? "text-amber-400"
              : strength === 3
                ? "text-lime-400"
                : "text-brand-green"
        }`}
      >
        {config.label}
      </span>
    </div>
  );
}
