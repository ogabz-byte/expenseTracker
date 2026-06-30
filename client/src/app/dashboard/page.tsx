// client/app/(dashboard)/page.tsx
import Topbar from "@/components/dashboard/Topbar";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Dashboard" />
      <DashboardContent />
    </div>
  );
}
