import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: Props) {
    const styles = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",
        secondary:
            "bg-gray-200 hover:bg-gray-300 text-black",
        danger:
            "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            {...props}
            className={`rounded-lg px-4 py-2 font-medium transition ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    );
}