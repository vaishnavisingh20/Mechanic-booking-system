import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum(["admin", "mechanic", "guest"])
    .default("guest"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const bookingSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Customer name is required"),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  vehicleNumber: z
    .string()
    .trim()
    .min(3, "Vehicle number is required")
    .transform((value) => value.toUpperCase()),

  vehicleType: z
    .string()
    .trim()
    .min(2, "Vehicle type is required"),

  service: z
    .string()
    .trim()
    .min(2, "Service is required"),

  bookingDate: z.string(),

  status: z.enum([
    "Pending",
    "In Progress",
    "Completed",
    "Cancelled",
  ]),

  notes: z
    .string()
    .optional()
    .default(""),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;