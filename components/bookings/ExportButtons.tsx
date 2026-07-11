"use client";

import { Booking } from "@/types/booking";
import {
    exportCSV,
    exportExcel,
    exportPDF,
} from "@/utils/exportBookings";
import { useAuth } from "@/context/AuthContext";
import { canExport } from "@/lib/permissions";
interface Props {
    bookings: Booking[];
}

export default function ExportButtons({
    bookings,
}: Props) {
    const { user } = useAuth();

    if (!canExport(user?.role)) {
        return null;
    }
    return (
        <div className="flex gap-3">
            <button
                onClick={() => exportCSV(bookings)}
                className="rounded bg-green-600 px-4 py-2 text-white"
            >
                Export CSV
            </button>

            <button
                onClick={() => exportExcel(bookings)}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                Export Excel
            </button>

            <button
                onClick={() => exportPDF(bookings)}
                className="rounded bg-red-600 px-4 py-2 text-white"
            >
                Export PDF
            </button>
        </div>
    );
}