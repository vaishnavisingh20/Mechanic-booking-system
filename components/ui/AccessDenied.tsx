import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function AccessDenied() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShieldX
                size={80}
                className="text-red-600"
            />

            <h2 className="mt-6 text-3xl font-bold">
                Access Denied
            </h2>

            <p className="mt-3 text-gray-500">
                You don't have permission to access this page.
            </p>

            <Link
                href="/dashboard"
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white"
            >
                Return Dashboard
            </Link>
        </div>
    );
}