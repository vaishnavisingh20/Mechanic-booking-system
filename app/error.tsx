"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <AlertTriangle
                size={80}
                className="text-red-600"
            />

            <h1 className="mt-6 text-4xl font-bold">
                Something went wrong
            </h1>

            <p className="mt-3 text-gray-500">
                An unexpected error occurred.
            </p>

            <button
                onClick={reset}
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white"
            >
                Try Again
            </button>
        </div>
    );
}