// client/app/(dashboard)/layout.tsx
import Sidebar from "@/components/dashboard/Sidebar";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-navy flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 md:ml-[220px] flex flex-col min-h-screen">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
