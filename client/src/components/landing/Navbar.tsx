// client/components/landing/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border bg-brand-navy/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center font-mono text-sm font-medium text-brand-navy">
            ₦
          </div>
          <span className="font-semibold text-[#F0F4F8] tracking-tight">
            NairaTrack
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-brand-muted hover:text-[#F0F4F8] transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-brand-green text-brand-navy px-4 py-2 rounded-lg hover:bg-brand-green-hover transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
