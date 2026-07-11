"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/bookings/StatusBadge";
import { Booking } from "@/types/booking";

export default function RecentBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        async function fetchBookings() {
            const res = await fetch("/api/bookings");
            const data = await res.json();

            if (data.success) {
                setBookings(data.data.slice(0, 5));
            }
        }

        fetchBookings();
    }, []);

    return (
        < div className="rounded-xl border bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl" >
            <h2 className="mb-5 text-xl font-semibold">
                Recent Bookings
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 text-left">Customer</th>
                            <th className="py-3 text-left">Vehicle</th>
                            <th className="py-3 text-left">Status</th>
                            <th className="py-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b">
                                <td className="py-3">
                                    {booking.customerName}
                                </td>

                                <td className="py-3">
                                    {booking.vehicleNumber}
                                </td>

                                <td className="py-3">
                                    <StatusBadge status={booking.status} />
                                </td>

                                <td className="py-3">
                                    {new Date(
                                        booking.bookingDate
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}

                        {bookings.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No bookings available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
}