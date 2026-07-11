import jwt from "jsonwebtoken";

export type UserRole = "admin" | "mechanic" | "guest";

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

// Tell TypeScript that after the check above, this is definitely a string.
const SECRET: string = JWT_SECRET;

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}