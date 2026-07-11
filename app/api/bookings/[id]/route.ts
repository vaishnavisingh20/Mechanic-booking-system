import { NextRequest } from "next/server";
import { bookingSchema } from "@/lib/validators";
import {
    getBookingById,
    updateBooking,
    deleteBooking,
} from "@/services/booking.service";
import { success, failure } from "@/utils/response";
import { getCurrentUser } from "@/lib/currentUser";
interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const booking = await getBookingById(id);

        if (!booking) {
            return failure("Booking not found", 404);
        }

        return success("Booking fetched successfully", booking);
    } catch {
        return failure("Failed to fetch booking", 500);
    }
}

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const body = await request.json();
        const user = await getCurrentUser();

        if (!user) {
            return failure("Unauthorized", 401);
        }

        if (user.role === "guest") {
            return failure(
                "Guests cannot update bookings.",
                403
            );
        }

        const validated = bookingSchema.safeParse(body);

        if (!validated.success) {
            return failure("Invalid booking data", 400);
        }

        const booking = await updateBooking(
            id,
            validated.data
        );

        if (!booking) {
            return failure("Booking not found", 404);
        }

        return success("Booking updated successfully", booking);
    } catch {
        return failure("Failed to update booking", 500);
    }
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const user = await getCurrentUser();

        if (!user) {
            return failure("Unauthorized", 401);
        }

        if (user.role !== "admin") {
            return failure(
                "Only administrators can delete bookings.",
                403
            );
        }

        const booking = await deleteBooking(id);

        if (!booking) {
            return failure("Booking not found", 404);
        }

        return success("Booking deleted successfully");
    } catch {
        return failure("Failed to delete booking", 500);
    }
}