import { NextRequest } from "next/server";
import { loginSchema } from "@/lib/validators";
import { loginUser } from "@/services/auth.service";
import { setTokenCookie } from "@/utils/cookies";
import { success, failure } from "@/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      return failure("Invalid email or password", 400);
    }

    const { user, token } = await loginUser(validated.data);

    await setTokenCookie(token);

    return success("Login successful", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return failure(
      error instanceof Error ? error.message : "Login failed",
      401
    );
  }
}