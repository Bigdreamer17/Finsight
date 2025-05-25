import CompanyDetail from "@/app/ui/dashboard/company/common/CompanyDetail";
import CompanyDetailErrorFallback from "@/app/ui/dashboard/company/common/CompanyDetailErrorFallback";
import CompanyDetailSkeleton from "@/app/ui/dashboard/company/common/CompanyDetailSkeleton";
import CompanyNavigation from "@/app/ui/dashboard/company/common/CompanyNavigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata: Metadata = {
  title: "FinSight | Analysis",
  description: "Dashboard for FinSight",
};

export default async function AnalyticsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}>) {
  const { companyId } = await params;

  return (
    <div className="bg-[#1C1C21] text-white flex flex-col grow">
      <Suspense fallback={<CompanyDetailSkeleton />}>
        <ErrorBoundary FallbackComponent={CompanyDetailErrorFallback}>
          <CompanyDetail companyId={companyId} />
        </ErrorBoundary>
      </Suspense>

      <CompanyNavigation companyId={companyId} />

      {children}
    </div>
  );
}
