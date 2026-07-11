import { NextRequest } from "next/server";
import { bookingSchema } from "@/lib/validators";
import { getCurrentUser } from "@/lib/currentUser";
import {
    getBookings,
    createBooking,
} from "@/services/booking.service";
import { success, failure } from "@/utils/response";

export async function GET() {
    try {
        const bookings = await getBookings();

        if (bookings.length === 0) {
            return success("No data found", []);
        }

        return success(
            "Bookings fetched successfully",
            bookings
        );
    } catch (error) {
        console.error("GET BOOKINGS ERROR:", error);

        return failure(
            error instanceof Error ? error.message : "Unknown error",
            500
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validated = bookingSchema.safeParse(body);

        if (!validated.success) {
            return failure("Invalid booking data", 400);
        }

        const user = await getCurrentUser();

        if (!user) {
            return failure("Unauthorized", 401);
        }

        if (user.role === "guest") {
            return failure(
                "Guests are not allowed to create bookings.",
                403
            );
        }

        const booking = await createBooking(
            validated.data,
            user.id
        );

        return success(
            "Booking created successfully",
            booking
        );
    } catch (error) {
        return failure(
            error instanceof Error
                ? error.message
                : "Failed to create booking",
            500
        );
    }
}