import { Booking } from "@/types/booking";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function formatBookings(bookings: Booking[]) {
    return bookings.map((booking) => ({
        Customer: booking.customerName,
        Phone: booking.phone,
        "Vehicle Number": booking.vehicleNumber,
        "Vehicle Type": booking.vehicleType,
        Service: booking.service,
        Status: booking.status,
        "Booking Date": new Date(
            booking.bookingDate
        ).toLocaleDateString(),
    }));
}

export function exportCSV(bookings: Booking[]) {
    const rows = formatBookings(bookings);

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Bookings"
    );

    XLSX.writeFile(workbook, "bookings.csv");
}

export function exportExcel(bookings: Booking[]) {
    const rows = formatBookings(bookings);

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Bookings"
    );

    XLSX.writeFile(workbook, "bookings.xlsx");
}

export function exportPDF(bookings: Booking[]) {
    const rows = formatBookings(bookings);

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Mechanic Booking Report", 14, 18);

    autoTable(doc, {
        startY: 30,

        head: [[
            "Customer",
            "Phone",
            "Vehicle Number",
            "Vehicle Type",
            "Service",
            "Status",
            "Booking Date",
        ]],

        body: rows.map((row) => [
            row.Customer,
            row.Phone,
            row["Vehicle Number"],
            row["Vehicle Type"],
            row.Service,
            row.Status,
            row["Booking Date"],
        ]),

        styles: {
            fontSize: 10,
            cellPadding: 3,
        },

        headStyles: {
            fillColor: [37, 99, 235], // Blue
            textColor: [255, 255, 255],
        },

        alternateRowStyles: {
            fillColor: [245, 245, 245],
        },
    });

    doc.save("bookings.pdf");
}