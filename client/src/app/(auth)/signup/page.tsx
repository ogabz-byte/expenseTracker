// client/app/(auth)/signup/page.tsx
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import SignupLeftBottom from "@/components/auth/SignupLeftBottom";

export default function SignupPage() {
  return (
    <AuthLayout
      leftTitle="Start tracking"
      leftTitleAccent="in minutes."
      leftSubtitle="No bank connection required. Just you, your numbers, and full clarity over where your money goes."
      leftBottom={<SignupLeftBottom />}
    >
      <SignupForm />
    </AuthLayout>
  );
}
