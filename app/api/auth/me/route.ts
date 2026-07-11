import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { getTokenCookie } from "@/utils/cookies";
import { success, failure } from "@/utils/response";

export async function GET() {
  try {
    const token = await getTokenCookie();

    if (!token) {
      return failure("Unauthorized", 401);
    }

    const decoded = verifyToken(token);

    await connectDB();

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return failure("User not found", 404);
    }

    return success("User fetched successfully", user);
  } catch {
    return failure("Unauthorized", 401);
  }
}