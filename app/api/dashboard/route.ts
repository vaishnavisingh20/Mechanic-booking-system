import { success, failure } from "@/utils/response";
import { getCurrentUser } from "@/lib/currentUser";
import { connectDB } from "@/lib/mongodb";

import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return failure("Unauthorized", 401);
        }

        await connectDB();

        const [
            totalBookings,
            pending,
            inProgress,
            completed,
            cancelled,
            totalUsers,
            recentBookings,
        ] = await Promise.all([
            Booking.countDocuments(),

            Booking.countDocuments({
                status: "Pending",
            }),

            Booking.countDocuments({
                status: "In Progress",
            }),

            Booking.countDocuments({
                status: "Completed",
            }),

            Booking.countDocuments({
                status: "Cancelled",
            }),

            User.countDocuments(),

            Booking.find()
                .sort({ createdAt: -1 })
                .limit(5),
        ]);

        // Dummy monthly data for charts
        // Later we'll calculate this dynamically from MongoDB
        const monthlyBookings = [
            {
                month: "Jan",
                bookings: 5,
            },
            {
                month: "Feb",
                bookings: 8,
            },
            {
                month: "Mar",
                bookings: 6,
            },
            {
                month: "Apr",
                bookings: 10,
            },
            {
                month: "May",
                bookings: 7,
            },
            {
                month: "Jun",
                bookings: 12,
            },
            {
                month: "Jul",
                bookings: 15,
            },
            {
                month: "Aug",
                bookings: 11,
            },
            {
                month: "Sep",
                bookings: 9,
            },
            {
                month: "Oct",
                bookings: 13,
            },
            {
                month: "Nov",
                bookings: 17,
            },
            {
                month: "Dec",
                bookings: 20,
            },
        ];

        return success("Dashboard fetched successfully", {
            totalBookings,
            pending,
            inProgress,
            completed,
            cancelled,
            totalUsers,
            recentBookings,
            monthlyBookings,
        });
    } catch (error) {
        console.error("Dashboard Error:", error);

        return failure(
            error instanceof Error
                ? error.message
                : "Failed to load dashboard",
            500
        );
    }
}