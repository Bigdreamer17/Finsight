import type { Metadata } from "next";

import Sidebar from "../ui/dashboard/common/Sidebar";
import Topbar from "../ui/dashboard/common/topbar";

export const metadata: Metadata = {
  title: "FinSight | Dashboard",
  description: "Dashboard for FinSight",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#1C1C21] flex h-screen shrink-0 text-white">
      <Sidebar className="hidden md:flex" />

      <section className="relative grow overflow-y-auto">
        <Topbar />

        {children}
      </section>
    </main>
  );
}
