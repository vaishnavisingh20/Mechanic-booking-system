import Link from "next/link";
import { getCurrentUser } from "@/lib/currentUser";
import AccessDenied from "@/components/ui/AccessDenied";
import EmptyState from "@/components/ui/EmptyState";

export default async function UsersPage() {
    const user = await getCurrentUser();

    if (!user) {
        return <AccessDenied />;
    }

    if (user.role !== "admin") {
        return <AccessDenied />;
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Users Management
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        View and manage registered users in the system.
                    </p>
                </div>

                <Link
                    href="/register"
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                    Add User
                </Link>

            </div>

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500">
                        Total Users
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                        --
                    </h2>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500">
                        Admins
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-blue-600">
                        --
                    </h2>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500">
                        Mechanic
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-green-600">
                        --
                    </h2>
                </div>

            </div>

            {/* Table */}

            <div className="rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <div className="border-b p-5">
                    <h2 className="text-xl font-semibold">
                        Registered Users
                    </h2>
                </div>

                <div className="p-8">

                    <EmptyState
                        title="No users to display"
                        description="When users register, they will appear here. This page is ready for API integration."
                        buttonText="Register User"
                        href="/register"
                    />

                </div>

            </div>

        </div>
    );
}