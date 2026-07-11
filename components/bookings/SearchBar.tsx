"use client";

import { Search, X } from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({
    value,
    onChange,
}: Props) {
    return (
        <div className="relative w-full">
            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search customer, phone, vehicle..."
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-11 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}