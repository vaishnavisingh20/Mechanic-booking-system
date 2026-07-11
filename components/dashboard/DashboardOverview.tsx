"use client";

import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Users,
    Wrench,
    RefreshCw,
} from "lucide-react";

import BookingStatusChart from "./BookingStatusChart";
import MonthlyBookingsChart from "./MonthlyBookingsCharts";
import StatCard from "./StatCard";
import StatusChip from "./StatusChip";

import { DashboardData } from "@/types/dashboard";

export default function DashboardOverview() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchDashboard() {
        try {
            setLoading(true);

            const response = await fetch("/api/dashboard", {
                cache: "no-store",
            });

            const result = await response.json();

            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-36 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
                        />
                    ))}
                </div>

                <div className="h-96 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-800 dark:bg-red-900/20">
                <h2 className="text-2xl font-bold text-red-600">
                    Failed to load dashboard
                </h2>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Please try refreshing the page.
                </p>

                <button
                    onClick={fetchDashboard}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                    <RefreshCw size={18} />
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Dashboard Summary */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold">
                    Workshop Overview
                </h2>

                <p className="mt-2 text-blue-100">
                    Monitor bookings, mechanics and customers from one
                    dashboard.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    title="Total Bookings"
                    value={data.totalBookings}
                    icon={<Calendar size={28} />}
                />

                <StatCard
                    title="Pending"
                    value={data.pending}
                    icon={<Clock size={28} />}
                />

                <StatCard
                    title="In Progress"
                    value={data.inProgress}
                    icon={<Wrench size={28} />}
                />

                <StatCard
                    title="Completed"
                    value={data.completed}
                    icon={<CheckCircle size={28} />}
                />

                <StatCard
                    title="Cancelled"
                    value={data.cancelled}
                    icon={<XCircle size={28} />}
                />

                <StatCard
                    title="Users"
                    value={data.totalUsers}
                    icon={<Users size={28} />}
                />
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-bold">
                        Booking Status
                    </h2>

                    <BookingStatusChart
                        pending={data.pending}
                        inProgress={data.inProgress}
                        completed={data.completed}
                        cancelled={data.cancelled}
                    />
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="mb-6 text-xl font-bold">
                        Monthly Bookings
                    </h2>

                    <MonthlyBookingsChart
                        data={data.monthlyBookings}
                    />
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b p-6 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Recent Bookings
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Latest customer appointments
                        </p>
                    </div>

                    <button
                        onClick={fetchDashboard}
                        className="rounded-lg border px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Refresh
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Customer
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Vehicle No.
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Type
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Service
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.recentBookings.length > 0 ? (
                                data.recentBookings.map((booking) => (
                                    <tr
                                        key={booking._id}
                                        className="border-t transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                                    >
                                        <td className="px-6 py-4 font-medium">
                                            {booking.customerName}
                                        </td>

                                        <td className="px-6 py-4">
                                            {booking.vehicleNumber}
                                        </td>

                                        <td className="px-6 py-4">
                                            {booking.vehicleType}
                                        </td>

                                        <td className="px-6 py-4">
                                            {booking.service}
                                        </td>

                                        <td className="px-6 py-4">
                                            {new Date(
                                                booking.bookingDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <StatusChip
                                                status={booking.status}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-12 text-center text-gray-500"
                                    >
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}