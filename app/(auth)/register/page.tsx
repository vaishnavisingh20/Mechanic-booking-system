import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <AuthCard title="Register">
        <RegisterForm />
      </AuthCard>
    </main>
  );
}