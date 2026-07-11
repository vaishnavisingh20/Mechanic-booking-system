import { removeTokenCookie } from "@/utils/cookies";
import { success } from "@/utils/response";

export async function POST() {
  await removeTokenCookie();

  console.log("[Analytics] User logged out");

  return success("Logout successful");
}