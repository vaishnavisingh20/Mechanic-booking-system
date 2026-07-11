"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import {
    Pencil,
    Trash2,
    Calendar,
    Car,
    Phone,
    User,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import DeleteDialog from "@/components/bookings/DeleteDialog";

import { Booking } from "@/types/booking";
import { useAuth } from "@/context/AuthContext";
import {
    canDelete,
    canEdit,
} from "@/lib/permissions";

interface Props {
    booking: Booking;
    onDelete: (id: string) => void;
}

export default function BookingRow({
    booking,
    onDelete,
}: Props) {
    const { user } = useAuth();
    console.log("USER FROM AUTH:", user);
    console.log("ROLE:", user?.role);
    console.log("CAN EDIT:", canEdit(user?.role));
    console.log("CAN DELETE:", canDelete(user?.role));
    const [showDelete, setShowDelete] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    async function handleDelete() {
        setLoading(true);

        try {
            const response = await fetch(
                `/api/bookings/${booking._id}`,
                {
                    method: "DELETE",
                }
            );

            const data =
                await response.json();

            if (!response.ok || !data.success) {
                toast.error(
                    data.message ??
                    "Failed to delete booking"
                );

                return;
            }

            toast.success(
                "Booking deleted successfully"
            );

            onDelete(booking._id);

            setShowDelete(false);
        } catch (error) {
            console.error(error);

            toast.error(
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <tr className="border-b transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <User
                            size={16}
                            className="text-blue-600"
                        />

                        {booking.customerName}
                    </div>
                </td>

                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <Phone
                            size={16}
                            className="text-green-600"
                        />

                        {booking.phone}
                    </div>
                </td>

                <td className="p-4 font-medium">
                    {booking.vehicleNumber}
                </td>

                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <Car
                            size={16}
                            className="text-orange-600"
                        />

                        {booking.vehicleType}
                    </div>
                </td>

                <td className="p-4">
                    {booking.service}
                </td>

                <td className="p-4">
                    <StatusBadge
                        status={booking.status}
                    />
                </td>

                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <Calendar
                            size={16}
                            className="text-purple-600"
                        />

                        {new Date(
                            booking.bookingDate
                        ).toLocaleDateString()}
                    </div>
                </td>

                <td className="p-4">
                    <div className="flex gap-2">
                        {canEdit(user?.role) && (
                            <Link
                                href={`/dashboard/bookings/${booking._id}`}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition hover:bg-blue-700"
                            >
                                <Pencil size={15} />
                                Edit
                            </Link>
                        )}

                        {canDelete(user?.role) && (
                            <button
                                onClick={() =>
                                    setShowDelete(
                                        true
                                    )
                                }
                                className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
                            >
                                <Trash2 size={15} />
                                Delete
                            </button>
                        )}
                    </div>
                </td>
            </tr>

            <DeleteDialog
                open={showDelete}
                loading={loading}
                title="Delete Booking"
                message="Are you sure you want to delete this booking? This action cannot be undone."
                onCancel={() =>
                    setShowDelete(false)
                }
                onConfirm={handleDelete}
            />
        </>
    );
}