"use client";

interface Props {
    value: string;
    onChange: (role: string) => void;
}

export default function RoleSelect({
    value,
    onChange,
}: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-lg border px-3 py-2"
        >
            <option value="admin">Admin</option>
            <option value="mechanic">Mechanic</option>
            <option value="guest">Guest</option>
        </select>
    );
}