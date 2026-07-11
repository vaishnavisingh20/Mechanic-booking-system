"use client";

export default function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
            <h2 className="text-xl font-semibold">
                Dashboard
            </h2>

            <div className="text-sm text-gray-500">
                Mechanic Booking System
            </div>
        </header>
    );
}