"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "@/components/dashboard/ThemeToggle";

export default function SettingsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleSave() {
        toast.success("Settings saved successfully.");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your account preferences.
                </p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <h2 className="mb-6 text-xl font-semibold">
                    Profile
                </h2>

                <div className="space-y-5">

                    <div>
                        <label className="mb-2 block font-medium">
                            Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Your name"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Your email"
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                    >
                        Save Changes
                    </button>

                </div>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">

                <h2 className="mb-6 text-xl font-semibold">
                    Appearance
                </h2>

                <ThemeToggle />

            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950">

                <h2 className="text-xl font-semibold text-red-600">
                    Danger Zone
                </h2>

                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    These actions are permanent.
                </p>

                <button
                    className="mt-5 rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                >
                    Delete My Account
                </button>

            </div>
        </div>
    );
}