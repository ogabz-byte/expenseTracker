// client/components/landing/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand-green rounded-md flex items-center justify-center font-mono text-xs font-medium text-brand-navy">
            ₦
          </div>
          <span className="text-sm font-semibold text-[#F0F4F8] tracking-tight">
            NairaTrack
          </span>
        </div>

        <p className="text-xs text-brand-muted">
          Built for practice. Not a real financial product.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-xs text-brand-muted hover:text-[#F0F4F8] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-xs text-brand-muted hover:text-[#F0F4F8] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  );
}
