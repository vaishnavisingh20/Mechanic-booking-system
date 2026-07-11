import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthCard title="Login">
        <LoginForm />
      </AuthCard>
    </main>
  );
}