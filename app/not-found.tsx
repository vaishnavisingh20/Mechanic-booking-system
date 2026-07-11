import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <SearchX
                size={80}
                className="text-blue-600"
            />

            <h1 className="mt-6 text-5xl font-bold">
                404
            </h1>

            <p className="mt-3 text-lg text-gray-600">
                The page you're looking for doesn't exist.
            </p>

            <Link
                href="/dashboard"
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}