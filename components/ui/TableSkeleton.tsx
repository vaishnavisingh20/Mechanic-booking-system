export default function TableSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="h-14 rounded-lg bg-gray-200"
                />
            ))}
        </div>
    );
}