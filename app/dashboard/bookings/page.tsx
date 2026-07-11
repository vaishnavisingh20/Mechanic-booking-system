import Link from "next/link";
import BookingTable from "@/components/bookings/BookingTable";
import { getCurrentUser } from "@/lib/currentUser";

export default async function BookingsPage() {
    const user = await getCurrentUser();

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Bookings
                </h1>

                {user?.role !== "guest" && (
                    <Link
                        href="/dashboard/bookings/new"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                    >
                        New Booking
                    </Link>
                )}
            </div>

            <BookingTable />
        </div>
    );
}