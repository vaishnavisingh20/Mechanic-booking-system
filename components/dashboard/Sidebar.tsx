"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import {
    LayoutDashboard,
    Wrench,
    Users,
    Settings,
    LogOut,
    UserCircle2,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const menu = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Bookings",
        href: "/dashboard/bookings",
        icon: Wrench,
    },
    {
        name: "Users",
        href: "/dashboard/users",
        icon: Users,
        adminOnly: true,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        adminOnly: true,
    },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();

    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                toast.error(data.message || "Logout failed");
                return;
            }

            toast.success("Logged out successfully");

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {/* Logo */}
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                <h1 className="text-2xl font-extrabold text-blue-600">
                    Mechanic Booking
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Garage Management
                </p>
            </div>

            {/* User */}
            <div className="border-b border-gray-200 p-5 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                        <UserCircle2
                            size={34}
                            className="text-blue-600"
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {user?.name}
                        </h3>

                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold uppercase text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                            {user?.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
                {menu.map((item) => {
                    if (item.adminOnly && user?.role !== "admin") {
                        return null;
                    }

                    const Icon = item.icon;

                    const active =
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${active
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                }`}
                        >
                            <Icon size={20} />

                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <div className="mb-4 flex justify-center">
                    <ThemeToggle />
                </div>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}