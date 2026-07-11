export default function LoadingSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="h-14 animate-pulse rounded bg-gray-200"
                />
            ))}
        </div>
    );
}