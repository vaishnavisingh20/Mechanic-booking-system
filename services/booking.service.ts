
import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongodb";
import { sanitizeInput } from "@/lib/sanitize";

export async function getBookings() {
    await connectDB();

    return Booking.find().sort({
        createdAt: -1,
    });
}
export async function getBookingById(id: string) {
    await connectDB();

    return Booking.findById(id);
}
export async function createBooking(
    data: {
        customerName: string;
        phone: string;
        vehicleNumber: string;
        vehicleType: string;
        service: string;
        bookingDate: string;
        status?: "Pending" | "In Progress" | "Completed" | "Cancelled";
        notes?: string;
    },
    userId: string
) {
    await connectDB();

    const booking = await Booking.create({
        customerName: sanitizeInput(data.customerName),
        phone: sanitizeInput(data.phone),
        vehicleNumber: sanitizeInput(data.vehicleNumber).toUpperCase(),
        vehicleType: sanitizeInput(data.vehicleType),
        service: sanitizeInput(data.service),
        bookingDate: new Date(data.bookingDate),
        status: data.status ?? "Pending",
        notes: sanitizeInput(data.notes ?? ""),
        createdBy: userId,
    });

    console.log(
        "[Analytics] User interacted with Feature Complete CRUD"
    );

    return booking;
}

export async function updateBooking(
    id: string,
    data: {
        customerName: string;
        phone: string;
        vehicleNumber: string;
        vehicleType: string;
        service: string;
        bookingDate: string;
        status: "Pending" | "In Progress" | "Completed" | "Cancelled";
        notes?: string;
    }
) {
    await connectDB();

    return Booking.findByIdAndUpdate(
        id,
        {
            customerName: sanitizeInput(data.customerName),
            phone: sanitizeInput(data.phone),
            vehicleNumber: sanitizeInput(data.vehicleNumber).toUpperCase(),
            vehicleType: sanitizeInput(data.vehicleType),
            service: sanitizeInput(data.service),
            bookingDate: new Date(data.bookingDate),
            status: data.status,
            notes: sanitizeInput(data.notes ?? ""),
        },
        {
            new: true,
            runValidators: true,
        }
    );
}

export async function deleteBooking(id: string) {
    await connectDB();

    return Booking.findByIdAndDelete(id);
}