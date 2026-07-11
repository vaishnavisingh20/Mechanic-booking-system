"use client";

import Link from "next/link";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    buttonText?: string;
    href?: string;
}

export default function EmptyState({
    title,
    description = "No data available.",
    buttonText,
    href,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-white px-8 py-20 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="mb-6 rounded-full bg-blue-100 p-5 dark:bg-blue-900">
                <Inbox
                    size={48}
                    className="text-blue-600"
                />
            </div>

            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
                {description}
            </p>

            {buttonText && href && (
                <Link
                    href={href}
                    className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    {buttonText}
                </Link>
            )}
        </div>
    );
}