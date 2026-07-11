"use client";

import { AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
    open: boolean;
    title?: string;
    message?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteDialog({
    open,
    title = "Delete Booking",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    loading = false,
    onConfirm,
    onCancel,
}: DeleteDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                    <AlertTriangle
                        size={32}
                        className="text-red-600"
                    />
                </div>

                <h2 className="mt-5 text-center text-2xl font-bold">
                    {title}
                </h2>

                <p className="mt-3 text-center text-gray-500 dark:text-gray-400">
                    {message}
                </p>

                <div className="mt-8 flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}