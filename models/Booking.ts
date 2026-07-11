import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookingDocument extends Document {
  customerName: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: string;
  service: string;
  bookingDate: Date;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ vehicleNumber: 1 });

const Booking: Model<IBookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<IBookingDocument>("Booking", BookingSchema);

export default Booking;