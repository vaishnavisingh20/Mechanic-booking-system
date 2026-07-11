import TableSkeleton from "@/components/ui/TableSkeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="h-10 w-72 animate-pulse rounded bg-gray-200" />

            <TableSkeleton />
        </div>
    );
}