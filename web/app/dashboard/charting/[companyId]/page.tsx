import Charting from "@/app/ui/dashboard/charting";
import ChartingSkeleton from "@/app/ui/dashboard/charting/ChartingSkeleton";
import ErrorFallback from "@/app/ui/dashboard/company/overview/CompanyOverviewErrorFallback";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ChartingPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <Suspense fallback={<ChartingSkeleton />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Charting companyId={companyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default ChartingPage;
