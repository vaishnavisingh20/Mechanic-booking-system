import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function getUsers() {
    await connectDB();

    return User.find()
        .select("-password")
        .sort({ createdAt: -1 });
}

export async function updateUserRole(
    id: string,
    role: "admin" | "mechanic" | "guest"
) {
    await connectDB();

    return User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
    ).select("-password");
}

export async function deleteUser(id: string) {
    await connectDB();

    return User.findByIdAndDelete(id);
}