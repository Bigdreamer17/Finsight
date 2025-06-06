import type { Metadata } from "next";

import Sidebar from "../ui/dashboard/common/Sidebar";
import Topbar from "../ui/dashboard/common/topbar";
import { Suspense } from "react";
import TopbarSkeleton from "../ui/dashboard/common/topbar/TopbarSkeleton";
import { ErrorBoundary } from "react-error-boundary";
import TopbarErrorFallback from "../ui/dashboard/common/topbar/TopbarErrorFallback";

export const metadata: Metadata = {
  title: "FinSight | Dashboard",
  description: "Dashboard for FinSight",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-[#1C1C21] flex h-screen shrink-0 text-white">
      <Sidebar className="hidden lg:flex" />

      <section className="relative grow overflow-y-auto flex flex-col">
        <Suspense fallback={<TopbarSkeleton />}>
          <ErrorBoundary FallbackComponent={TopbarErrorFallback}>
            <Topbar />
          </ErrorBoundary>
        </Suspense>

        {children}
      </section>
    </main>
  );
}
