import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Sidebar */}
            <MobileSidebar />

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6 md:ml-64">
                    {children}
                </main>
            </div>
        </div>
    );
}