"use client";

import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock,
    Wrench,
    CheckCircle,
    XCircle,
} from "lucide-react";

import StatCard from "./StatCard";

interface Stats {
    totalBookings: number;
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
}

export default function DashboardStats() {
    const [stats, setStats] = useState<Stats>({
        totalBookings: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/dashboard");
                const data = await res.json();

                if (data.success) {
                    setStats(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="py-8 text-center text-gray-500">
                Loading statistics...
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
                title="Total Bookings"
                value={stats.totalBookings}
                icon={<CalendarDays className="text-blue-600" />}
            />

            <StatCard
                title="Pending"
                value={stats.pending}
                icon={<Clock className="text-yellow-500" />}
            />

            <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={<Wrench className="text-orange-500" />}
            />

            <StatCard
                title="Completed"
                value={stats.completed}
                icon={<CheckCircle className="text-green-600" />}
            />

            <StatCard
                title="Cancelled"
                value={stats.cancelled}
                icon={<XCircle className="text-red-600" />}
            />
        </div>
    );
}