import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { hashPassword, comparePassword } from "@/utils/password";
import { generateToken } from "@/lib/auth";
import { sanitizeInput } from "@/lib/sanitize";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "mechanic" | "guest";
}) {
  await connectDB();

  const name = sanitizeInput(data.name);
  const email = sanitizeInput(data.email.toLowerCase());

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: data.role,
  });

  const token = generateToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  console.log("[Analytics] User registered");

  return { user, token };
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  await connectDB();

  const email = sanitizeInput(data.email.toLowerCase());

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await comparePassword(
    data.password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });

  console.log("[Analytics] User logged in");

  return { user, token };
}