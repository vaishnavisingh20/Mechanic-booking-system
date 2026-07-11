interface Props {
    title: string;
}

export default function EmptyState({
    title,
}: Props) {
    return (
        <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            {title}
        </div>

    );
}