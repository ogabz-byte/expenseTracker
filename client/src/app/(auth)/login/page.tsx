// client/app/(auth)/login/page.tsx
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import LoginLeftBottom from "@/components/auth/LoginLeftBottom";

export default function LoginPage() {
  return (
    <AuthLayout
      leftTitle="Your money,"
      leftTitleAccent="fully in view."
      leftSubtitle="Track spending, set budgets, and fund your wallet — all in one place built for the Nigerian experience."
      leftBottom={<LoginLeftBottom />}
    >
      <LoginForm />
    </AuthLayout>
  );
}
