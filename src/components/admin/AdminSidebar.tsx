"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaChartLine, FaCogs, FaHome, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: FaHome },
    { 
      name: "Booking System", 
      icon: FaCalendarAlt,
      children: [
        { name: "Bookings List", href: "/admin/booking/list" },
        { name: "Products", href: "/admin/booking/products" },
        { name: "Categories", href: "/admin/booking/categories" },
      ]
    },
    { name: "Queries", href: "/admin/queries", icon: FaEnvelope }, 
    { name: "SEO Manager", href: "/admin/seo", icon: FaChartLine },
    { name: "Mail Configuration", href: "/admin/mail", icon: FaCogs },
  ];

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200 shadow-xl z-20">
      <div className="flex items-center justify-center h-20 border-b border-gray-100">
        <Link href="/">
          <Image
            src="https://i.postimg.cc/XYxqHyR2/logo-brentlinen.webp"
            alt="Brent Linen"
            width={200}
            height={70}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = item.href 
                ? (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href))
                : item.children?.some(child => pathname.startsWith(child.href));
            
            if (item.children) {
                return (
                    <div key={item.name} className="space-y-1">
                        <div className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                            isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-50"
                        }`}>
                            <item.icon
                                className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                                    isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-600"
                                }`}
                            />
                            {item.name}
                        </div>
                        <div className="pl-12 space-y-1">
                            {item.children.map(child => (
                                <Link
                                    key={child.name}
                                    href={child.href}
                                    className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                                        pathname === child.href
                                        ? "bg-purple-100 text-purple-700"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                    }`}
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }

            return (
              <Link
                key={item.name}
                href={item.href!}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-purple-600"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
              &copy; {new Date().getFullYear()} Brent Linen Admin
          </p>
      </div>
    </div>
  );
}
