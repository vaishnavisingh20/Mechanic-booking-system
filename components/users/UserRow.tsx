"use client";

import toast from "react-hot-toast";
import RoleSelect from "./RoleSelect";
import { User } from "@/types/user";
import { useAuth } from "@/context/AuthContext";
interface Props {
    user: User;
    onRoleChange: (
        id: string,
        role: "admin" | "mechanic" | "guest"
    ) => void;
    onDelete: (id: string) => void;
}

export default function UserRow({
    user,
    onRoleChange,
    onDelete,
}: Props) {
    const { user: currentUser } = useAuth();
    async function updateRole(role: string) {
        try {
            const res = await fetch(`/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }),
            });

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            onRoleChange(user._id, role as User["role"]);
            toast.success("Role updated");
        } catch {
            toast.error("Failed to update role");
        }
    }

    async function removeUser() {
        if (!confirm("Delete this user?")) return;

        try {
            const res = await fetch(`/api/users/${user._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            onDelete(user._id);
            toast.success("User deleted");
        } catch {
            toast.error("Failed to delete user");
        }
    }

    return (
        <tr className="border-b">
            <td className="p-3">{user.name}</td>

            <td className="p-3">{user.email}</td>

            <td className="p-3">
                {currentUser?.id === user._id ? (
                    <span className="font-medium">
                        {user.role}
                    </span>
                ) : (
                    <RoleSelect
                        value={user.role}
                        onChange={updateRole}
                    />
                )}
            </td>

            <td className="p-3">
                {currentUser?.id !== user._id && (
                    <button
                        onClick={removeUser}
                        className="rounded bg-red-600 px-3 py-2 text-white"
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
}