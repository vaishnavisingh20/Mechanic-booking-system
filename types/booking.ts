export interface Booking {
  _id: string;

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

  createdBy: string;

  createdAt: string;

  updatedAt: string;
}