import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Wrench,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import { getCurrentUser } from "@/lib/currentUser";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navbar */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-3">
              <Wrench
                className="text-white"
                size={24}
              />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Mechanic Booking
              </h1>

              <p className="text-xs text-gray-500">
                Garage Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">
        <div className="mb-8 rounded-full bg-blue-100 p-6">
          <Wrench
            className="text-blue-700"
            size={70}
          />
        </div>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
          Smart Garage Management
          <br />
          Made Simple
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-gray-600">
          A modern booking platform for garages to
          manage customers, vehicle servicing,
          mechanics and daily operations with a
          secure dashboard.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<CalendarCheck size={42} />}
            title="Booking Management"
            description="Create, update and manage customer bookings with ease."
          />

          <FeatureCard
            icon={<ShieldCheck size={42} />}
            title="Secure Authentication"
            description="JWT based authentication with role-based access control."
          />

          <FeatureCard
            icon={<BarChart3 size={42} />}
            title="Dashboard Analytics"
            description="Monitor bookings, services and business insights in real time."
          />

          <FeatureCard
            icon={<Wrench size={42} />}
            title="Mechanic Workflow"
            description="Track repair jobs and manage servicing efficiently."
          />
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold">
              Why Choose This System?
            </h2>

            <p className="mb-8 text-gray-600">
              Built using modern web technologies
              with scalability, security and user
              experience in mind.
            </p>

            <div className="space-y-5">
              <FeaturePoint text="JWT Authentication" />
              <FeaturePoint text="Role Based Access Control" />
              <FeaturePoint text="MongoDB Database" />
              <FeaturePoint text="Responsive Dashboard" />
              <FeaturePoint text="Booking CRUD Operations" />
              <FeaturePoint text="CSV / Excel / PDF Export" />
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white shadow-xl">
            <h3 className="mb-5 text-3xl font-bold">
              Ready to Start?
            </h3>

            <p className="mb-8 text-blue-100">
              Register a new account and start
              managing your workshop in minutes.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-blue-700 transition hover:bg-gray-100"
            >
              Create Account
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div>
            <h3 className="font-bold">
              Mechanic Booking System
            </h3>

            <p className="text-sm text-gray-500">
              Built with Next.js 15, TypeScript,
              MongoDB and Tailwind CSS.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} All Rights
            Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 text-blue-600">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

function FeaturePoint({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        className="text-green-600"
        size={22}
      />

      <span className="text-gray-700">
        {text}
      </span>
    </div>
  );
}