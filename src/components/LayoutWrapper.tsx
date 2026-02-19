"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={`flex-grow min-h-screen ${!isAdmin ? "pt-[49px] md:pt-28" : ""}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
