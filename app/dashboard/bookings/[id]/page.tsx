import BookingForm from "@/components/bookings/BookingForm";
import { getBookingById } from "@/services/booking.service";
import { notFound } from "next/navigation";

export default async function EditBookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const booking = await getBookingById(id);

    if (!booking) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto">
            <BookingForm
                initialData={{
                    _id: booking._id.toString(),
                    customerName: booking.customerName,
                    phone: booking.phone,
                    vehicleNumber: booking.vehicleNumber,
                    vehicleType: booking.vehicleType,
                    service: booking.service,
                    bookingDate: booking.bookingDate.toISOString(),
                    status: booking.status,
                    notes: booking.notes ?? "",
                }}
            />
        </div>
    );
}