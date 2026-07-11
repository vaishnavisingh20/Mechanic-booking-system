import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";

export async function getDashboardStats() {
    await connectDB();

    const [
        total,
        pending,
        inProgress,
        completed,
        cancelled,
    ] = await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: "Pending" }),
        Booking.countDocuments({ status: "In Progress" }),
        Booking.countDocuments({ status: "Completed" }),
        Booking.countDocuments({ status: "Cancelled" }),
    ]);

    return {
        total,
        pending,
        inProgress,
        completed,
        cancelled,
    };
}