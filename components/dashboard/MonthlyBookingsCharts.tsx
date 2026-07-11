"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

interface Props {
    data: {
        month: string;
        bookings: number;
    }[];
}

export default function MonthlyBookingsChart({
    data,
}: Props) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                Monthly Bookings
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="bookings"
                        fill="#2563EB"
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}