"use client";

import { ReactNode } from "react";
import CountUp from "react-countup";

interface Props {
    title: string;
    value: number;
    icon?: ReactNode;
}

export default function StatCard({
    title,
    value,
    icon,
}: Props) {
    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                dark:border-gray-700
                dark:bg-gray-900
            "
        >
            {/* Decorative Gradient */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500" />

            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {title}
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
                        <CountUp
                            end={value}
                            duration={1.2}
                            separator=","
                        />
                    </h2>
                </div>

                {icon && (
                    <div
                        className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-100
                            text-blue-600
                            transition-all
                            duration-300
                            group-hover:scale-110
                            group-hover:rotate-6
                            dark:bg-blue-900/30
                        "
                    >
                        {icon}
                    </div>
                )}
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                    className="
                        h-full
                        w-full
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        to-cyan-500
                    "
                />
            </div>
        </div>
    );
}