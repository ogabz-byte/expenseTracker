// client/app/(dashboard)/settings/page.tsx
import Topbar from "@/components/dashboard/Topbar";
import ProfileSettings from "@/components/dashboard/settings/ProfileSettings";
import PasswordSettings from "@/components/dashboard/settings/PasswordSettings";
import DangerZone from "@/components/dashboard/settings/DangerZone";

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Settings" />

      <div className="p-8 flex flex-col gap-6 max-w-2xl">
        <ProfileSettings />
        <PasswordSettings />
        <DangerZone />
      </div>
    </div>
  );
}
