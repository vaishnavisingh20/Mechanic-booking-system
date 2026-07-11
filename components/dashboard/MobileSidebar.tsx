"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-white p-4 md:hidden">
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-md p-2 hover:bg-gray-100"
                >
                    <Menu size={24} />
                </button>

                <h1 className="font-bold text-lg">
                    Mechanic Booking
                </h1>
            </header>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 h-screen transform transition-transform duration-300 md:hidden ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <div className="relative h-full">
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute right-3 top-3 rounded p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                    <Sidebar />
                </div>
            </div>
        </>
    );
}