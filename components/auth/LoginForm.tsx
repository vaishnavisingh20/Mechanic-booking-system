"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      toast.success(
        res.data.message ||
        "Logged in successfully 🎉"
      );

      setUser(res.data.data);

      await router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Login to continue to your dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={setEmail}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        <SubmitButton
          loading={loading}
          text="Login"
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}