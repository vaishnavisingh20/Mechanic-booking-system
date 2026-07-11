"use client";

import { useEffect, useState } from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import BookingRow from "./BookingRow";
import FilterBar from "./FilterBar";
import ExportButtons from "./ExportButtons";
import { Booking } from "@/types/booking";
import EmptyState from "@/components/ui/EmptyState";
export default function BookingTable() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [service, setService] = useState("");
    const [bookingDate, setBookingDate] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const BOOKINGS_PER_PAGE = 5;

    async function fetchBookings() {
        try {
            setLoading(true);

            const response = await fetch("/api/bookings");
            const data = await response.json();

            if (data.success) {
                setBookings(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        status,
        vehicleType,
        service,
        bookingDate,
    ]);

    // Filtering
    const filteredBookings = bookings.filter((booking) => {
        const query = search.toLowerCase();

        const matchesSearch =
            booking.customerName
                .toLowerCase()
                .includes(query) ||
            booking.phone
                .toLowerCase()
                .includes(query) ||
            booking.vehicleNumber
                .toLowerCase()
                .includes(query);

        const matchesStatus =
            status === "" ||
            booking.status === status;

        const matchesVehicle =
            vehicleType === "" ||
            booking.vehicleType === vehicleType;

        const matchesService =
            service === "" ||
            booking.service === service;

        const matchesDate =
            bookingDate === "" ||
            booking.bookingDate.slice(0, 10) ===
            bookingDate;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesVehicle &&
            matchesService &&
            matchesDate
        );
    });

    const totalPages = Math.ceil(
        filteredBookings.length / BOOKINGS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * BOOKINGS_PER_PAGE;

    const paginatedBookings = filteredBookings.slice(
        startIndex,
        startIndex + BOOKINGS_PER_PAGE
    );

    if (loading) {
        return <TableSkeleton />;
    }

    return (
        <div className="space-y-6">
            <FilterBar
                search={search}
                status={status}
                vehicleType={vehicleType}
                service={service}
                bookingDate={bookingDate}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onVehicleTypeChange={setVehicleType}
                onServiceChange={setService}
                onDateChange={setBookingDate}
                onReset={() => {
                    setSearch("");
                    setStatus("");
                    setVehicleType("");
                    setService("");
                    setBookingDate("");
                }}
            />
            <div className="flex justify-end">
                <ExportButtons
                    bookings={filteredBookings}
                />
            </div>
            <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-900">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="p-3 text-left">
                                Customer
                            </th>

                            <th className="p-3 text-left">
                                Phone
                            </th>

                            <th className="p-3 text-left">
                                Vehicle No.
                            </th>

                            <th className="p-3 text-left">
                                Vehicle Type
                            </th>

                            <th className="p-3 text-left">
                                Service
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-left">
                                Booking Date
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedBookings.length > 0 ? (
                            paginatedBookings.map(
                                (booking) => (
                                    <BookingRow
                                        key={booking._id}
                                        booking={booking}
                                        onDelete={(id) =>
                                            setBookings(
                                                (prev) =>
                                                    prev.filter(
                                                        (
                                                            booking
                                                        ) =>
                                                            booking._id !==
                                                            id
                                                    )
                                            )
                                        }
                                    />
                                )
                            )
                        ) : (
                            <tr>
                                <td colSpan={8}>
                                    <EmptyState
                                        title="No Bookings Found"
                                        description="Try changing your filters or create a new booking."
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={() =>
                        setCurrentPage((page) =>
                            Math.max(page - 1, 1)
                        )
                    }
                    disabled={currentPage === 1}
                    className="rounded-lg bg-gray-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="font-medium">
                    Page {currentPage} of{" "}
                    {totalPages === 0
                        ? 1
                        : totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((page) =>
                            Math.min(
                                page + 1,
                                totalPages
                            )
                        )
                    }
                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }
                    className="rounded-lg bg-gray-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}