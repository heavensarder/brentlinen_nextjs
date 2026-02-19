import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Image from "next/image";
import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export const metadata = {
  title: "Dashboard | Brent Linen Admin",
  description: "Admin dashboard for Brent Linen.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
             <div className="flex items-center gap-4 md:hidden">
                 {/* Mobile Logo for when Sidebar is hidden (TODO: detailed mobile menu) */}
                 <Link href="/">
                    <Image
                        src="https://i.postimg.cc/XYxqHyR2/logo-brentlinen.webp"
                        alt="Brent Linen"
                        width={120}
                        height={40}
                        className="h-8 w-auto object-contain"
                    />
                 </Link>
             </div>
             
             <div className="flex ml-auto items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, <span className="font-bold text-gray-900">{session.user?.name}</span></span>
                <AdminLogoutButton />
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
