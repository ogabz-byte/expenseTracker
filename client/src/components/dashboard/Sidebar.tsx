// client/components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/dashboard/transactions", label: "Transactions", icon: "↕" },
  { href: "/dashboard/recurring", label: "Recurring", icon: "↻" },
  { href: "/dashboard/budgets", label: "Budgets", icon: "◎" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // get initials from name
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className=" fixed top-0 left-0 bottom-0 w-[220px] bg-brand-card border-r border-brand-border flex flex-col z-40">
      {/* Brand */}
      <div className=" flex items-center gap-2.5 px-5 py-5 border-b border-brand-border">
        <div className="w-7 h-7 bg-brand-green rounded-md flex items-center justify-center font-mono text-xs font-medium text-brand-navy">
          ₦
        </div>
        <span className="text-sm font-semibold text-[#F0F4F8] tracking-tight">
          NairaTrack
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                isActive
                  ? "bg-brand-navy text-brand-green"
                  : "text-brand-muted hover:text-[#F0F4F8] hover:bg-brand-navy/60"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-green rounded-r-full" />
              )}
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-brand-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-navy border border-brand-border flex items-center justify-center text-xs font-semibold text-brand-green flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#8A9BB0] truncate">
              {user?.name}
            </p>
            <p className="text-xs text-brand-muted truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-xs text-brand-muted hover:text-red-400 transition-colors text-left py-1"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
