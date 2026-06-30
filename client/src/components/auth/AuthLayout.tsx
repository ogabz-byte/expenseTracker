// client/components/auth/AuthLayout.tsx
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  leftTitle: string;
  leftTitleAccent: string;
  leftSubtitle: string;
  leftBottom: React.ReactNode;
}

export default function AuthLayout({
  children,
  leftTitle,
  leftTitleAccent,
  leftSubtitle,
  leftBottom,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-brand-navy">
      <div className="flex h-screen w-screen  justify-center ">
        {/* Left panel */}
        <div className="hidden lg:flex  w-[40.5%] flex-col justify-between p-12 border-r border-brand-border relative overflow-hidden">
          {/* Background ₦ */}
          <span className="absolute -right-8 top-1/2 -translate-y-1/2 font-mono text-[280px] font-medium text-brand-green opacity-[0.05] select-none pointer-events-none leading-none">
            ₦
          </span>

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center font-mono text-sm font-medium text-brand-navy">
              ₦
            </div>
            <span className="font-semibold text-[#F0F4F8] tracking-tight">
              NairaTrack
            </span>
          </Link>

          {/* Middle text */}
          <div className="relative z-10">
            <h2 className="text-4xl font-semibold tracking-tight text-[#F0F4F8] leading-snug mb-4">
              {leftTitle}{" "}
              <span className="text-brand-green">{leftTitleAccent}</span>
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
              {leftSubtitle}
            </p>
          </div>

          {/* Bottom slot — different per page */}
          <div className="relative z-10">{leftBottom}</div>
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-[480px] flex flex-col justify-center px-8 sm:px-12 py-12">
          {/* Mobile brand */}
          <Link
            href="/"
            className="flex lg:hidden items-center gap-2.5 mb-10 w-fit"
          >
            <div className="w-7 h-7 bg-brand-green rounded-md flex items-center justify-center font-mono text-xs font-medium text-brand-navy">
              ₦
            </div>
            <span className="text-sm font-semibold text-[#F0F4F8] tracking-tight">
              NairaTrack
            </span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}
