import { NextRequest } from "next/server";
import { failure, success } from "@/utils/response";
import { getCurrentUser } from "@/lib/currentUser";
import {
    updateUserRole,
    deleteUser,
} from "@/services/user.service";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function PUT(
    request: NextRequest,
    context: RouteContext
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return failure("Unauthorized", 401);
    }

    if (currentUser.role !== "admin") {
        return failure("Forbidden", 403);
    }

    const { id } = await context.params;

    const body = await request.json();

    const user = await updateUserRole(
        id,
        body.role
    );

    return success("Role updated", user);
}

export async function DELETE(
    request: NextRequest,
    context: RouteContext
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return failure("Unauthorized", 401);
    }

    if (currentUser.role !== "admin") {
        return failure("Forbidden", 403);
    }

    const { id } = await context.params;

    await deleteUser(id);

    return success("User deleted");
}