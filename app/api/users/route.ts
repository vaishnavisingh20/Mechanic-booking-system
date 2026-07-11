import { failure, success } from "@/utils/response";
import { getCurrentUser } from "@/lib/currentUser";
import { getUsers } from "@/services/user.service";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return failure("Unauthorized", 401);
    }

    if (currentUser.role !== "admin") {
        return failure("Forbidden", 403);
    }

    const users = await getUsers();

    return success("Users fetched successfully", users);
}