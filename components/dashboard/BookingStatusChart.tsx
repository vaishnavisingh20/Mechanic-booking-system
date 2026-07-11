"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface Props {
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
}

const COLORS = [
    "#EAB308",
    "#3B82F6",
    "#22C55E",
    "#EF4444",
];

export default function BookingStatusChart({
    pending,
    inProgress,
    completed,
    cancelled,
}: Props) {
    const data = [
        { name: "Pending", value: pending },
        {
            name: "In Progress",
            value: inProgress,
        },
        {
            name: "Completed",
            value: completed,
        },
        {
            name: "Cancelled",
            value: cancelled,
        },
    ];

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                Booking Status Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={110}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                    index %
                                    COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>

                    <Tooltip />

                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}