// client/components/dashboard/settings/DangerZone.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function DangerZone() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="bg-brand-card border border-red-900/30 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-[#F0F4F8] mb-1">Account</h2>
      <p className="text-xs text-brand-muted mb-6">
        Log out of your NairaTrack account on this device.
      </p>

      <button
        onClick={handleLogout}
        className="border border-red-900/50 text-red-400 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-red-950/30 transition-colors"
      >
        Log out
      </button>
    </div>
  );
}
