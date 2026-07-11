interface Props {
    status:
    | "Pending"
    | "In Progress"
    | "Completed"
    | "Cancelled";
}

export default function StatusBadge({
    status,
}: Props) {
    const colors = {
        Pending:
            "bg-yellow-100 text-yellow-700",

        "In Progress":
            "bg-blue-100 text-blue-700",

        Completed:
            "bg-green-100 text-green-700",

        Cancelled:
            "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${colors[status]}`}
        >
            {status}
        </span>
    );
}