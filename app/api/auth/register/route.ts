import { NextRequest } from "next/server";
import { registerSchema } from "@/lib/validators";
import { registerUser } from "@/services/auth.service";
import { setTokenCookie } from "@/utils/cookies";
import { success, failure } from "@/utils/response";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return failure("Invalid input", 400);
    }

    const { user, token } = await registerUser(validated.data);

    await setTokenCookie(token);

    return success("User registered successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return failure(
      error instanceof Error ? error.message : "Registration failed",
      400
    );
  }
}