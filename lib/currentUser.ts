import { getTokenCookie } from "@/utils/cookies";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
export async function getCurrentUser() {
    await cookies();
    const token = await getTokenCookie();

    if (!token) {
        return null;
    }

    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}