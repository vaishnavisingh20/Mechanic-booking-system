"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved =
            localStorage.getItem("theme") === "dark";

        setDark(saved);

        if (saved) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    function toggleTheme() {
        const next = !dark;

        setDark(next);

        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <button
            onClick={toggleTheme}
            className="rounded-lg border p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
            {dark ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
}