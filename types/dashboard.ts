import { Booking } from "./booking";

export interface DashboardData {
    totalBookings: number;
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    totalUsers: number;
    recentBookings: Booking[];
    monthlyBookings: {
        month: string;
        bookings: number;
    }[];
}