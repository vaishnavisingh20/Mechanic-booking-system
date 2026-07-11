"use client";

interface Props {
    search: string;
    status: string;
    vehicleType: string;
    service: string;
    bookingDate: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onVehicleTypeChange: (value: string) => void;
    onServiceChange: (value: string) => void;
    onDateChange: (value: string) => void;
    onReset: () => void;
}

export default function FilterBar({
    search,
    status,
    vehicleType,
    service,
    bookingDate,
    onSearchChange,
    onStatusChange,
    onVehicleTypeChange,
    onServiceChange,
    onDateChange,
    onReset,
}: Props) {
    return (
        <div className="space-y-4 rounded-lg border bg-white p-4">
            <div className="flex flex-col gap-4 lg:flex-row">
                <input
                    type="text"
                    placeholder="Search customer, phone, vehicle..."
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    className="flex-1 rounded-lg border px-4 py-2"
                />

                <button
                    onClick={onReset}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Reset Filters
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">
                        In Progress
                    </option>
                    <option value="Completed">
                        Completed
                    </option>
                    <option value="Cancelled">
                        Cancelled
                    </option>
                </select>

                <select
                    value={vehicleType}
                    onChange={(e) =>
                        onVehicleTypeChange(
                            e.target.value
                        )
                    }
                    className="rounded-lg border px-4 py-2"
                >
                    <option value="">All Vehicles</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Truck">Truck</option>
                    <option value="Bus">Bus</option>
                </select>

                <select
                    value={service}
                    onChange={(e) =>
                        onServiceChange(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2"
                >
                    <option value="">All Services</option>
                    <option value="Oil Change">
                        Oil Change
                    </option>
                    <option value="Brake Service">
                        Brake Service
                    </option>
                    <option value="Wheel Alignment">
                        Wheel Alignment
                    </option>
                    <option value="Engine Repair">
                        Engine Repair
                    </option>
                    <option value="Battery Replacement">
                        Battery Replacement
                    </option>
                </select>

                <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) =>
                        onDateChange(e.target.value)
                    }
                    className="rounded-lg border px-4 py-2"
                />
            </div>
        </div>
    );
}