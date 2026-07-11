"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/api";

import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [role, setRole] = useState<
    "admin" | "mechanic" | "guest"
  >("guest");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password =
        "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!navigator.onLine) {
      toast.error(
        "No internet connection."
      );
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      toast.success(
        res.data.message ??
        "Account created successfully 🎉"
      );

      router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Create Account 🚗
        </h1>

        <p className="mt-2 text-gray-500">
          Register to access the
          Mechanic Booking System.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <InputField
          label="Full Name"
          required
          value={name}
          onChange={setName}
          error={errors.name}
          autoComplete="name"
        />

        <InputField
          label="Email"
          type="email"
          required
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
        />

        <InputField
          label="Password"
          type="password"
          required
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="new-password"
        />

        <InputField
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={
            setConfirmPassword
          }
          error={
            errors.confirmPassword
          }
          autoComplete="new-password"
        />

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Role
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target
                  .value as
                | "admin"
                | "mechanic"
                | "guest"
              )
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="guest">
              Guest
            </option>

            <option value="mechanic">
              Mechanic
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <p className="text-xs text-gray-500">
            Select a role for demo
            purposes. In production,
            only an administrator
            should assign roles.
          </p>
        </div>

        <SubmitButton
          loading={loading}
          text="Create Account"
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}