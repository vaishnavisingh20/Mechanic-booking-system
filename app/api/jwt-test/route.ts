import { NextResponse } from "next/server";
import { generateToken, verifyToken } from "@/lib/auth";

export async function GET() {
  const token = generateToken({
    id: "123",
    name: "Admin",
    email: "admin@test.com",
    role: "admin",
  });

  const decoded = verifyToken(token);

  return NextResponse.json({
    token,
    decoded,
  });
}