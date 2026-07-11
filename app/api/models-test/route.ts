import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";

export async function GET() {
  await connectDB();

  return NextResponse.json({
    success: true,
    userModel: User.modelName,
    bookingModel: Booking.modelName,
  });
}