"use client";

import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { User } from "@/types/user";

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchUsers() {
        try {
            const res = await fetch("/api/users");
            const data = await res.json();

            if (data.success) {
                setUsers(data.data);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function updateRole(
        id: string,
        role: User["role"]
    ) {
        setUsers((prev) =>
            prev.map((user) =>
                user._id === id
                    ? { ...user, role }
                    : user
            )
        );
    }

    function removeUser(id: string) {
        setUsers((prev) =>
            prev.filter((user) => user._id !== id)
        );
    }

    if (loading) {
        return (
            <div className="py-10 text-center">
                Loading users...
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">
                            Name
                        </th>

                        <th className="p-3 text-left">
                            Email
                        </th>

                        <th className="p-3 text-left">
                            Role
                        </th>

                        <th className="p-3 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <UserRow
                                key={user._id}
                                user={user}
                                onRoleChange={updateRole}
                                onDelete={removeUser}
                            />
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={4}
                                className="py-10 text-center text-gray-500"
                            >
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}