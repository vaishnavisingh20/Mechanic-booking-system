"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface BookingFormProps {
    initialData?: {
        _id?: string;
        customerName: string;
        phone: string;
        vehicleNumber: string;
        vehicleType: string;
        service: string;
        bookingDate: string;
        status:
        | "Pending"
        | "In Progress"
        | "Completed"
        | "Cancelled";
        notes: string;
    };
}

export default function BookingForm({
    initialData,
}: BookingFormProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    const [formData, setFormData] = useState({
        customerName:
            initialData?.customerName ?? "",

        phone:
            initialData?.phone ?? "",

        vehicleNumber:
            initialData?.vehicleNumber ?? "",

        vehicleType:
            initialData?.vehicleType ?? "",

        service:
            initialData?.service ?? "",

        bookingDate:
            initialData?.bookingDate?.split("T")[0] ??
            "",

        status:
            initialData?.status ?? "Pending",

        notes:
            initialData?.notes ?? "",
    });

    function handleChange(
        e: React.ChangeEvent<
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement
        >
    ) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors((prev) => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    }

    function validateForm() {
        const newErrors: Record<string, string> = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName =
                "Customer name is required.";
        }

        if (!formData.phone.trim()) {
            newErrors.phone =
                "Phone number is required.";
        } else if (
            !/^[0-9]{10}$/.test(formData.phone)
        ) {
            newErrors.phone =
                "Enter a valid 10-digit phone number.";
        }

        if (!formData.vehicleNumber.trim()) {
            newErrors.vehicleNumber =
                "Vehicle number is required.";
        }

        if (!formData.vehicleType.trim()) {
            newErrors.vehicleType =
                "Vehicle type is required.";
        }

        if (!formData.service.trim()) {
            newErrors.service =
                "Service is required.";
        }

        if (!formData.bookingDate) {
            newErrors.bookingDate =
                "Booking date is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                initialData?._id
                    ? `/api/bookings/${initialData._id}`
                    : "/api/bookings",
                {
                    method: initialData
                        ? "PUT"
                        : "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result =
                await response.json();

            if (!response.ok || !result.success) {
                toast.error(
                    result.message ??
                    "Operation failed."
                );
                return;
            }

            toast.success(
                initialData
                    ? "Booking updated successfully."
                    : "Booking created successfully."
            );

            router.push(
                "/dashboard/bookings"
            );

            router.refresh();
        } catch (error) {
            console.error(error);

            toast.error(
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-8 text-3xl font-bold">
                {initialData
                    ? "Edit Booking"
                    : "Create Booking"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 md:grid-cols-2"
            >
                {/* Customer Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Customer Name
                    </label>

                    <input
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    />

                    {errors.customerName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.customerName}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Phone Number
                    </label>

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    />

                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* Vehicle Number */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Vehicle Number
                    </label>

                    <input
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 uppercase outline-none transition focus:border-blue-500"
                    />

                    {errors.vehicleNumber && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.vehicleNumber}
                        </p>
                    )}
                </div>

                {/* Vehicle Type */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Vehicle Type
                    </label>

                    <input
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    />

                    {errors.vehicleType && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.vehicleType}
                        </p>
                    )}
                </div>

                {/* Service */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Service Required
                    </label>

                    <input
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    />

                    {errors.service && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.service}
                        </p>
                    )}
                </div>

                {/* Date */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Booking Date
                    </label>

                    <input
                        type="date"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    />

                    {errors.bookingDate && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.bookingDate}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    >
                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>
                    </select>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                        Notes
                    </label>

                    <textarea
                        rows={5}
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full rounded-lg border p-3 outline-none transition focus:border-blue-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >
                        {loading
                            ? initialData
                                ? "Updating..."
                                : "Creating..."
                            : initialData
                                ? "Update Booking"
                                : "Create Booking"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-lg border px-6 py-3 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}