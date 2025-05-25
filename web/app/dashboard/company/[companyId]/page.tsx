import CompanyOverview from "@/app/ui/dashboard/company/overview";
import ErrorFallback from "@/app/ui/dashboard/company/overview/CompanyOverviewErrorFallback";
import CompanyOverviewSkeleton from "@/app/ui/dashboard/company/overview/CompanyOverviewSkeleton";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const OverviewPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<CompanyOverviewSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CompanyOverview companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default OverviewPage;
