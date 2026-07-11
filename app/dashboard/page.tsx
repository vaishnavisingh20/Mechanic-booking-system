import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { getCurrentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {user.name} 👋
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Here's what's happening in your workshop today.
                    </p>
                </div>

                <div className="rounded-xl border bg-white px-5 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500">
                        Logged in as
                    </p>

                    <p className="font-semibold capitalize text-blue-600">
                        {user.role}
                    </p>
                </div>
            </div>

            <DashboardOverview />
        </div>
    );
}